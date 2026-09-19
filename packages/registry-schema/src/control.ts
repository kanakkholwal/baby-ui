import { z } from "zod";

/** Drives the live controls rail on a component page. `none` = documented, not tweakable. */
export const ControlSchema = z.discriminatedUnion("kind", [
	z.object({ kind: z.literal("boolean") }),
	z.object({ kind: z.literal("text"), placeholder: z.string().optional() }),
	z.object({
		kind: z.literal("number"),
		min: z.number().optional(),
		max: z.number().optional(),
		step: z.number().default(1),
	}),
	z.object({ kind: z.literal("select"), options: z.array(z.string()).min(1) }),
	z.object({ kind: z.literal("color") }),
	z.object({ kind: z.literal("none") }),
]);

export type Control = z.infer<typeof ControlSchema>;

export const PropSpecSchema = z.object({
	name: z.string().min(1),
	/** TypeScript type as written, e.g. `"sm" | "md" | "lg"`. Rendered in the props table. */
	type: z.string().min(1),
	description: z.string().min(1),
	required: z.boolean().default(false),
	/** Serialised default, shown in the table and used as the control's initial value. */
	default: z.union([z.string(), z.number(), z.boolean(), z.null()]).optional(),
	control: ControlSchema.default({ kind: "none" }),
});

export type PropSpec = z.infer<typeof PropSpecSchema>;
