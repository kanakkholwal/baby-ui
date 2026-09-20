import { z } from "zod";
import { FileTypeSchema } from "./spec";

/** shadcn and shadcn-svelte share this shape; only the $schema URL and paths differ. */
export const RegistryItemSchema = z.object({
	$schema: z.string().url(),
	name: z.string(),
	type: FileTypeSchema,
	title: z.string(),
	description: z.string(),
	author: z.string().optional(),
	dependencies: z.array(z.string()).optional(),
	registryDependencies: z.array(z.string()).optional(),
	files: z.array(
		z.object({
			path: z.string(),
			content: z.string(),
			type: FileTypeSchema,
			target: z.string().optional(),
		}),
	),
	cssVars: z
		.object({
			theme: z.record(z.string(), z.string()).optional(),
			light: z.record(z.string(), z.string()).optional(),
			dark: z.record(z.string(), z.string()).optional(),
		})
		.optional(),
	css: z.record(z.string(), z.unknown()).optional(),
	categories: z.array(z.string()).optional(),
	meta: z.record(z.string(), z.unknown()).optional(),
});

export type RegistryItem = z.infer<typeof RegistryItemSchema>;

export const REGISTRY_ITEM_SCHEMA_URL = {
	react: "https://ui.shadcn.com/schema/registry-item.json",
	svelte: "https://shadcn-svelte.com/schema/registry-item.json",
} as const;

export const REGISTRY_SCHEMA_URL = {
	react: "https://ui.shadcn.com/schema/registry.json",
	svelte: "https://shadcn-svelte.com/schema/registry.json",
} as const;
