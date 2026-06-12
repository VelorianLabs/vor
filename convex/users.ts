import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create or update user from Clerk
export const upsertUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    role: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    const now = Date.now();

    if (existingUser) {
      await ctx.db.patch(existingUser._id, {
        email: args.email,
        name: args.name || existingUser.name,
        role: args.role || existingUser.role,
        updatedAt: now,
      });
      return existingUser._id;
    } else {
      const userId = await ctx.db.insert("users", {
        clerkId: args.clerkId,
        email: args.email,
        name: args.name,
        role: args.role || "client",
        isOnline: false,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      });
      return userId;
    }
  },
});

// Get user by Clerk ID
export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();
    return user;
  },
});

// Get all users
export const getAllUsers = query({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    return users.sort((a, b) => b.createdAt - a.createdAt);
  },
});

// Get users by role
export const getUsersByRole = query({
  args: { role: v.string() },
  handler: async (ctx, args) => {
    const users = await ctx.db
      .query("users")
      .withIndex("by_role", (q) => q.eq("role", args.role))
      .collect();
    return users.sort((a, b) => b.createdAt - a.createdAt);
  },
});

// Update user
export const updateUser = mutation({
  args: {
    clerkId: v.string(),
    name: v.optional(v.string()),
    role: v.optional(v.string()),
    isOnline: v.optional(v.boolean()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    const { clerkId, ...updates } = args;
    await ctx.db.patch(user._id, {
      ...updates,
      updatedAt: Date.now(),
    });
    return user._id;
  },
});

// Delete user
export const deleteUser = mutation({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.delete(user._id);
  },
});

// Toggle user online status
export const toggleUserOnline = mutation({
  args: { clerkId: v.string(), isOnline: v.boolean() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.patch(user._id, {
      isOnline: args.isOnline,
      updatedAt: Date.now(),
    });
  },
});

// Toggle user active status
export const toggleUserActive = mutation({
  args: { clerkId: v.string(), isActive: v.boolean() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.patch(user._id, {
      isActive: args.isActive,
      updatedAt: Date.now(),
    });
  },
});
