import { z } from "zod";
import { CategorySchema } from "./spec";

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/** Layered over docvia's base schema. Optional because one schema covers every
 * collection; registry-build holds component docs to ComponentDocRequiredSchema. */
export const ComponentDocExtrasSchema = z.object({
	component: z.string().regex(SLUG, "component must be a kebab-case slug").optional(),
	category: CategorySchema.optional(),
});

/** What a file under docs/components/ must have. Enforced by registry-build. */
export const ComponentDocRequiredSchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1),
	component: z.string().regex(SLUG, "component must be a kebab-case slug"),
	category: CategorySchema,
});

/**
 * Deliberately only stable identity: docvia's content hash includes frontmatter, so
 * embedding the full spec would bust every doc's cache on any registry rebuild.
 */
export const ComponentDocFrontmatterSchema = ComponentDocRequiredSchema.extend({
	tags: z.array(z.string()).default([]),
	draft: z.boolean().default(false),
	order: z.number().optional(),
});

export type ComponentDocExtras = z.infer<typeof ComponentDocExtrasSchema>;
export type ComponentDocFrontmatter = z.infer<typeof ComponentDocFrontmatterSchema>;
