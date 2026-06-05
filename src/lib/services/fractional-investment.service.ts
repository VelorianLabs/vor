/**
 * VOR Phase 3 - Fractional Investment Service
 * 
 * Service layer for fractional property investment operations.
 * Handles investment units, ownership tracking, and transfers.
 */

// @ts-ignore - Prisma client will be generated during setup
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ============================================
// TYPES
// ============================================

export interface CreateInvestmentUnitInput {
  unitNumber: string;
  propertyId?: string;
  investmentPoolId?: string;
  totalUnits: number;
  unitPrice: number;
  minPurchase?: number;
  maxPurchase?: number;
  expiresAt?: Date;
}

export interface PurchaseUnitsInput {
  userId: string;
  unitId: string;
  units: number;
}

export interface InitiateTransferInput {
  fromUserId: string;
  toUserId: string;
  unitId: string;
  units: number;
  pricePerUnit: number;
}

export interface TransferApprovalInput {
  transferId: string;
  approved: boolean;
  approvedBy: string;
  rejectionReason?: string;
}

// ============================================
// INVESTMENT UNIT SERVICE
// ============================================

export class InvestmentUnitService {
  /**
   * Create new investment units for a property or investment pool
   */
  async createInvestmentUnits(input: CreateInvestmentUnitInput) {
    const investmentUnit = await prisma.investmentUnit.create({
      data: {
        unitNumber: input.unitNumber,
        propertyId: input.propertyId,
        investmentPoolId: input.investmentPoolId,
        totalUnits: input.totalUnits,
        availableUnits: input.totalUnits,
        unitPrice: input.unitPrice,
        minPurchase: input.minPurchase || 1,
        maxPurchase: input.maxPurchase,
        status: 'AVAILABLE',
        expiresAt: input.expiresAt,
      },
    });

    return investmentUnit;
  }

  /**
   * Get investment units by property
   */
  async getUnitsByProperty(propertyId: string) {
    return prisma.investmentUnit.findMany({
      where: { propertyId },
      include: {
        property: true,
        ownerships: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  /**
   * Get investment units by investment pool
   */
  async getUnitsByPool(poolId: string) {
    return prisma.investmentUnit.findMany({
      where: { investmentPoolId: poolId },
      include: {
        investmentPool: true,
        ownerships: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  /**
   * Get available investment units
   */
  async getAvailableUnits() {
    return prisma.investmentUnit.findMany({
      where: {
        status: 'AVAILABLE',
        availableUnits: { gt: 0 },
      },
      include: {
        property: true,
        investmentPool: true,
      },
    });
  }

  /**
   * Update investment unit status
   */
  async updateUnitStatus(unitId: string, status: 'AVAILABLE' | 'RESERVED' | 'SOLD' | 'LOCKED' | 'TRANSFER_PENDING') {
    return prisma.investmentUnit.update({
      where: { id: unitId },
      data: { status },
    });
  }

  /**
   * Update available units count
   */
  async updateAvailableUnits(unitId: string, unitsSold: number) {
    return prisma.investmentUnit.update({
      where: { id: unitId },
      data: {
        availableUnits: { decrement: unitsSold },
      },
    });
  }
}

// ============================================
// OWNERSHIP SERVICE
// ============================================

export class OwnershipService {
  /**
   * Purchase investment units
   */
  async purchaseUnits(input: PurchaseUnitsInput) {
    // Get investment unit
    const unit = await prisma.investmentUnit.findUnique({
      where: { id: input.unitId },
    });

    if (!unit) {
      throw new Error('Investment unit not found');
    }

    // Validate availability
    if (unit.availableUnits < input.units) {
      throw new Error('Insufficient units available');
    }

    if (input.units < unit.minPurchase) {
      throw new Error(`Minimum purchase is ${unit.minPurchase} units`);
    }

    if (unit.maxPurchase && input.units > unit.maxPurchase) {
      throw new Error(`Maximum purchase is ${unit.maxPurchase} units`);
    }

    // Calculate ownership percentage
    const ownershipPercentage = (input.units / unit.totalUnits) * 100;
    const investmentValue = input.units * Number(unit.unitPrice);

    // Create ownership record
    const ownership = await prisma.assetOwnership.create({
      data: {
        userId: input.userId,
        unitId: input.unitId,
        unitsOwned: input.units,
        ownershipPercentage,
        investmentValue,
        purchasePrice: unit.unitPrice,
        currentValue: unit.unitPrice,
        status: 'ACTIVE',
      },
    });

    // Update available units
    await prisma.investmentUnit.update({
      where: { id: input.unitId },
      data: {
        availableUnits: { decrement: input.units },
      },
    });

    return ownership;
  }

  /**
   * Get user's ownership portfolio
   */
  async getUserOwnership(userId: string) {
    return prisma.assetOwnership.findMany({
      where: { userId },
      include: {
        unit: {
          include: {
            property: true,
            investmentPool: true,
          },
        },
        returns: true,
      },
    });
  }

  /**
   * Get ownership by unit
   */
  async getOwnershipByUnit(unitId: string) {
    return prisma.assetOwnership.findMany({
      where: { unitId },
      include: {
        user: true,
        returns: true,
      },
    });
  }

  /**
   * Calculate portfolio value
   */
  async calculatePortfolioValue(userId: string) {
    const ownerships = await prisma.assetOwnership.findMany({
      where: { userId, status: 'ACTIVE' },
    });

    const totalValue = ownerships.reduce((sum: number, ownership: any) => {
      return sum + Number(ownership.currentValue);
    }, 0);

    const totalUnits = ownerships.reduce((sum: number, ownership: any) => {
      return sum + ownership.unitsOwned;
    }, 0);

    return {
      totalValue,
      totalUnits,
      ownershipCount: ownerships.length,
    };
  }

  /**
   * Update current value of ownership
   */
  async updateCurrentValue(ownershipId: string, currentValue: number) {
    return prisma.assetOwnership.update({
      where: { id: ownershipId },
      data: { currentValue },
    });
  }

  /**
   * Record return payment
   */
  async recordReturn(ownershipId: string, type: string, amount: number, period: string) {
    const ownership = await prisma.assetOwnership.findUnique({
      where: { id: ownershipId },
    });

    if (!ownership) {
      throw new Error('Ownership not found');
    }

    const percentage = (amount / Number(ownership.investmentValue)) * 100;

    return prisma.ownershipReturn.create({
      data: {
        ownershipId,
        type,
        amount,
        percentage,
        period,
        paidAt: new Date(),
      },
    });
  }
}

// ============================================
// TRANSFER SERVICE
// ============================================

export class TransferService {
  /**
   * Initiate unit transfer
   */
  async initiateTransfer(input: InitiateTransferInput) {
    // Validate ownership
    const ownership = await prisma.assetOwnership.findFirst({
      where: {
        userId: input.fromUserId,
        unitId: input.unitId,
        status: 'ACTIVE',
      },
    });

    if (!ownership) {
      throw new Error('No active ownership found');
    }

    if (ownership.unitsOwned < input.units) {
      throw new Error('Insufficient units to transfer');
    }

    // Generate transfer number
    const transferNumber = `TRF-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const totalValue = input.units * input.pricePerUnit;

    // Create transfer request
    const transfer = await prisma.unitTransfer.create({
      data: {
        transferNumber,
        unitId: input.unitId,
        fromUserId: input.fromUserId,
        toUserId: input.toUserId,
        units: input.units,
        pricePerUnit: input.pricePerUnit,
        totalValue,
        status: 'PENDING',
      },
    });

    // Lock units
    await prisma.investmentUnit.update({
      where: { id: input.unitId },
      data: { status: 'TRANSFER_PENDING' },
    });

    return transfer;
  }

  /**
   * Get pending transfers
   */
  async getPendingTransfers(userId?: string) {
    const where = userId
      ? {
          OR: [
            { fromUserId: userId },
            { toUserId: userId },
          ],
          status: 'PENDING',
        }
      : { status: 'PENDING' };

    return prisma.unitTransfer.findMany({
      where,
      include: {
        unit: {
          include: {
            property: true,
            investmentPool: true,
          },
        },
        fromUser: true,
        toUser: true,
        documents: true,
      },
    });
  }

  /**
   * Get transfer history
   */
  async getTransferHistory(userId: string) {
    return prisma.unitTransfer.findMany({
      where: {
        OR: [
          { fromUserId: userId },
          { toUserId: userId },
        ],
      },
      include: {
        unit: {
          include: {
            property: true,
            investmentPool: true,
          },
        },
        fromUser: true,
        toUser: true,
      },
      orderBy: { initiatedAt: 'desc' },
    });
  }

  /**
   * Approve or reject transfer
   */
  async processTransferApproval(input: TransferApprovalInput) {
    const transfer = await prisma.unitTransfer.findUnique({
      where: { id: input.transferId },
      include: {
        unit: true,
      },
    });

    if (!transfer) {
      throw new Error('Transfer not found');
    }

    if (transfer.status !== 'PENDING') {
      throw new Error('Transfer is not in pending status');
    }

    if (input.approved) {
      // Update from ownership
      const fromOwnership = await prisma.assetOwnership.findFirst({
        where: {
          userId: transfer.fromUserId,
          unitId: transfer.unitId,
          status: 'ACTIVE',
        },
      });

      if (fromOwnership) {
        const newUnitsOwned = fromOwnership.unitsOwned - transfer.units;
        
        if (newUnitsOwned === 0) {
          await prisma.assetOwnership.update({
            where: { id: fromOwnership.id },
            data: { status: 'TRANSFERRED' },
          });
        } else {
          await prisma.assetOwnership.update({
            where: { id: fromOwnership.id },
            data: {
              unitsOwned: newUnitsOwned,
              ownershipPercentage: (newUnitsOwned / transfer.unit.totalUnits) * 100,
              investmentValue: newUnitsOwned * Number(transfer.unit.unitPrice),
            },
          });
        }
      }

      // Create or update to ownership
      const toOwnership = await prisma.assetOwnership.findFirst({
        where: {
          userId: transfer.toUserId,
          unitId: transfer.unitId,
          status: 'ACTIVE',
        },
      });

      if (toOwnership) {
        const newUnitsOwned = toOwnership.unitsOwned + transfer.units;
        await prisma.assetOwnership.update({
          where: { id: toOwnership.id },
          data: {
            unitsOwned: newUnitsOwned,
            ownershipPercentage: (newUnitsOwned / transfer.unit.totalUnits) * 100,
            investmentValue: newUnitsOwned * Number(transfer.unit.unitPrice),
            currentValue: newUnitsOwned * Number(transfer.unit.unitPrice),
          },
        });
      } else {
        const ownershipPercentage = (transfer.units / transfer.unit.totalUnits) * 100;
        await prisma.assetOwnership.create({
          data: {
            userId: transfer.toUserId,
            unitId: transfer.unitId,
            unitsOwned: transfer.units,
            ownershipPercentage,
            investmentValue: transfer.totalValue,
            purchasePrice: transfer.pricePerUnit,
            currentValue: transfer.pricePerUnit,
            status: 'ACTIVE',
          },
        });
      }

      // Update transfer status
      await prisma.unitTransfer.update({
        where: { id: input.transferId },
        data: {
          status: 'COMPLETED',
          approvedBy: input.approvedBy,
          approvedAt: new Date(),
          completedAt: new Date(),
        },
      });

      // Unlock unit
      await prisma.investmentUnit.update({
        where: { id: transfer.unitId },
        data: { status: 'AVAILABLE' },
      });
    } else {
      // Reject transfer
      await prisma.unitTransfer.update({
        where: { id: input.transferId },
        data: {
          status: 'REJECTED',
          approvedBy: input.approvedBy,
          approvedAt: new Date(),
          rejectionReason: input.rejectionReason,
        },
      });

      // Unlock unit
      await prisma.investmentUnit.update({
        where: { id: transfer.unitId },
        data: { status: 'AVAILABLE' },
      });
    }

    return transfer;
  }

  /**
   * Cancel transfer
   */
  async cancelTransfer(transferId: string, userId: string) {
    const transfer = await prisma.unitTransfer.findUnique({
      where: { id: transferId },
    });

    if (!transfer) {
      throw new Error('Transfer not found');
    }

    if (transfer.fromUserId !== userId) {
      throw new Error('Only the sender can cancel the transfer');
    }

    if (transfer.status !== 'PENDING') {
      throw new Error('Cannot cancel non-pending transfer');
    }

    await prisma.unitTransfer.update({
      where: { id: transferId },
      data: {
        status: 'CANCELLED',
      },
    });

    // Unlock unit
    await prisma.investmentUnit.update({
      where: { id: transfer.unitId },
      data: { status: 'AVAILABLE' },
    });

    return transfer;
  }
}

// ============================================
// EXPORT SERVICE INSTANCES
// ============================================

export const investmentUnitService = new InvestmentUnitService();
export const ownershipService = new OwnershipService();
export const transferService = new TransferService();
