import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a new property
export const createProperty = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    price: v.number(),
    state: v.string(),
    lga: v.string(),
    city: v.optional(v.string()),
    size: v.string(),
    propertyType: v.string(),
    titleType: v.string(),
    bedrooms: v.optional(v.number()),
    bathrooms: v.optional(v.number()),
    investmentGrade: v.optional(v.string()),
    mapLink: v.optional(v.string()),
    images: v.array(v.string()),
    documents: v.array(v.string()),
    featured: v.boolean(),
    createdBy: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const propertyId = await ctx.db.insert("properties", {
      ...args,
      verificationStatus: "pending",
      createdAt: now,
      updatedAt: now,
    });
    return propertyId;
  },
});

// Get all properties
export const getAllProperties = query({
  handler: async (ctx) => {
    const properties = await ctx.db.query("properties").collect();
    return properties.sort((a, b) => b.createdAt - a.createdAt);
  },
});

// Get properties by type
export const getPropertiesByType = query({
  args: { propertyType: v.string() },
  handler: async (ctx, args) => {
    const properties = await ctx.db
      .query("properties")
      .withIndex("by_type", (q) => q.eq("propertyType", args.propertyType))
      .collect();
    return properties.sort((a, b) => b.createdAt - a.createdAt);
  },
});

// Get property by ID
export const getPropertyById = query({
  args: { id: v.id("properties") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Update property
export const updateProperty = mutation({
  args: {
    id: v.id("properties"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    price: v.optional(v.number()),
    state: v.optional(v.string()),
    lga: v.optional(v.string()),
    city: v.optional(v.string()),
    size: v.optional(v.string()),
    propertyType: v.optional(v.string()),
    titleType: v.optional(v.string()),
    bedrooms: v.optional(v.number()),
    bathrooms: v.optional(v.number()),
    investmentGrade: v.optional(v.string()),
    mapLink: v.optional(v.string()),
    images: v.optional(v.array(v.string())),
    documents: v.optional(v.array(v.string())),
    featured: v.optional(v.boolean()),
    verificationStatus: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
    return id;
  },
});

// Delete property
export const deleteProperty = mutation({
  args: { id: v.id("properties") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Update property verification status
export const updateVerificationStatus = mutation({
  args: {
    id: v.id("properties"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      verificationStatus: args.status,
      updatedAt: Date.now(),
    });
  },
});

// Get properties by creator
export const getPropertiesByCreator = query({
  args: { createdBy: v.string() },
  handler: async (ctx, args) => {
    const properties = await ctx.db
      .query("properties")
      .withIndex("by_created_by", (q) => q.eq("createdBy", args.createdBy))
      .collect();
    return properties.sort((a, b) => b.createdAt - a.createdAt);
  },
});

// Get featured properties
export const getFeaturedProperties = query({
  handler: async (ctx) => {
    const properties = await ctx.db
      .query("properties")
      .filter((q) => q.eq(q.field("featured"), true))
      .collect();
    return properties.sort((a, b) => b.createdAt - a.createdAt);
  },
});

// Get properties by verification status
export const getPropertiesByStatus = query({
  args: { status: v.string() },
  handler: async (ctx, args) => {
    const properties = await ctx.db
      .query("properties")
      .withIndex("by_status", (q) => q.eq("verificationStatus", args.status))
      .collect();
    return properties.sort((a, b) => b.createdAt - a.createdAt);
  },
});
