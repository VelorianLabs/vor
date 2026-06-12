import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create inspection request
export const createInspectionRequest = mutation({
  args: {
    propertyId: v.id("properties"),
    propertyTitle: v.string(),
    fullName: v.string(),
    email: v.string(),
    phone: v.string(),
    inspectionDate: v.number(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const requestId = await ctx.db.insert("inspectionRequests", {
      ...args,
      status: "pending",
      createdAt: now,
      updatedAt: now,
    });
    return requestId;
  },
});

// Get all inspection requests
export const getAllInspectionRequests = query({
  handler: async (ctx) => {
    const requests = await ctx.db.query("inspectionRequests").collect();
    return requests.sort((a, b) => b.createdAt - a.createdAt);
  },
});

// Get inspection requests by property
export const getInspectionRequestsByProperty = query({
  args: { propertyId: v.id("properties") },
  handler: async (ctx, args) => {
    const requests = await ctx.db
      .query("inspectionRequests")
      .withIndex("by_property", (q) => q.eq("propertyId", args.propertyId))
      .collect();
    return requests.sort((a, b) => b.createdAt - a.createdAt);
  },
});

// Get inspection requests by status
export const getInspectionRequestsByStatus = query({
  args: { status: v.string() },
  handler: async (ctx, args) => {
    const requests = await ctx.db
      .query("inspectionRequests")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .collect();
    return requests.sort((a, b) => b.createdAt - a.createdAt);
  },
});

// Update inspection request status
export const updateInspectionRequestStatus = mutation({
  args: {
    id: v.id("inspectionRequests"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
      updatedAt: Date.now(),
    });
  },
});

// Delete inspection request
export const deleteInspectionRequest = mutation({
  args: { id: v.id("inspectionRequests") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
