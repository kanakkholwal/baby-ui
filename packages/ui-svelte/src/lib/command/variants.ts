import { tv } from "tailwind-variants";

export type { DialogVariant } from "../dialog/variants";

/** Command's flat mode is edge-to-edge (matches shadcn-svelte's bits-ui cmdk convention),
 * unlike Dialog's padded flat surface, so it keeps its own panel/body padding. */
export const commandFrame = tv({
	slots: {
		panel: "rounded-2xl border border-border bg-background shadow-2xl",
		header: "flex items-center justify-between gap-3 px-3.5",
		body: "",
	},
	variants: {
		variant: {
			framed: { panel: "p-1", header: "pt-1.5 pb-2", body: "rounded-[11px] bg-card" },
			default: {
				panel: "p-0",
				header: "border-border border-b py-2.5",
				body: "bg-popover",
			},
		},
	},
	defaultVariants: { variant: "default" },
});
