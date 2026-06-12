import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    role: v.string(), // 'admin', 'client', 'investor', 'contractor', 'finance', 'legal'
    isOnline: v.boolean(),
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_clerk_id", ["clerkId"])
    .index("by_role", ["role"]),

  properties: defineTable({
    title: v.string(),
    description: v.string(),
    price: v.number(),
    state: v.string(),
    lga: v.string(),
    city: v.optional(v.string()),
    size: v.string(),
    propertyType: v.string(), // 'terrain', 'home'
    titleType: v.string(), // 'buy', 'rent', 'lease'
    bedrooms: v.optional(v.number()),
    bathrooms: v.optional(v.number()),
    investmentGrade: v.optional(v.string()), // 'A', 'B', 'C', 'D'
    mapLink: v.optional(v.string()),
    images: v.array(v.string()),
    documents: v.array(v.string()),
    featured: v.boolean(),
    verificationStatus: v.string(), // 'pending', 'verified', 'sold'
    createdBy: v.string(), // clerkId
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_type", ["propertyType"])
    .index("by_status", ["verificationStatus"])
    .index("by_created_by", ["createdBy"]),

  inspectionRequests: defineTable({
    propertyId: v.id("properties"),
    propertyTitle: v.string(),
    fullName: v.string(),
    email: v.string(),
    phone: v.string(),
    inspectionDate: v.number(),
    status: v.string(), // 'pending', 'approved', 'rejected'
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_property", ["propertyId"])
    .index("by_status", ["status"]),
});
