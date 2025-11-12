import { z } from "zod";

/**
 * Zod schema for creating a category
 * - id, postCount, createdAt are generated automatically, so not required
 */
export const createCategorySchema = z.object({
    name: z.string().min(1, "Category name is required").max(100),
    description: z.string().max(500).optional(),
    icon: z.string().url().optional(),
    color: z
        .string()
        .regex(/^#([0-9A-F]{3}){1,2}$/i, "Color must be a valid hex code")
        .optional()
        .default("#6366f1"),
    parentId: z.string().optional().nullable(),
    isActive: z.boolean().optional().default(true),
});

/**
 * Zod schema for updating a category
 * - All fields optional
 */
export const updateCategorySchema = z.object({
    name: z.string().min(1).max(100).optional(),
    description: z.string().max(500).optional(),
    icon: z.string().url().optional(),
    color: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i).optional(),
    parentId: z.string().optional().nullable(),
    isActive: z.boolean().optional(),
});

/**
 * Zod schema for query params or filtering categories
 */
export const queryCategorySchema = z.object({
    name: z.string().optional(),
    slug: z.string().optional(),
    parentId: z.string().optional(),
    isActive: z.boolean().optional(),
});
