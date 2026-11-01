import { tv, type VariantProps } from "tailwind-variants";

// The textarea shares a grid cell with an invisible copy of its text, so it grows and wraps
// exactly like the preview it replaces, without measuring.
export const inlineEdit = tv({
	slots: {
		root: "inline-flex max-w-full flex-col gap-1 align-top",
		area: "inline-flex max-w-full items-start gap-1.5",
		preview: [
			"max-w-full cursor-text rounded-md px-1.5 text-left outline-none",
			"transition-colors duration-(--duration-fast) ease-(--ease-ui-out) motion-reduce:transition-none",
			"hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring",
			"data-[phase=saving]:cursor-progress data-[phase=saving]:opacity-70",
		],
		text: "inline-block whitespace-pre-wrap break-words transition-[opacity,translate,filter] duration-(--duration-base) ease-(--ease-ui-out) starting:translate-y-[0.3em] starting:opacity-0 starting:blur-[2px] motion-reduce:transition-none",
		placeholder: "text-muted-foreground",
		field: [
			"-mx-1.5 grid min-w-[4ch] max-w-full rounded-md bg-(--field) px-1.5 ring-1 ring-ring *:col-start-1 *:row-start-1",
			"has-[[aria-invalid=true]]:ring-destructive",
		],
		sizer: "invisible whitespace-pre-wrap break-words",
		input:
			"w-full resize-none overflow-hidden bg-transparent p-0 font-[inherit] text-[length:inherit] leading-[inherit] tracking-[inherit] outline-none placeholder:text-muted-foreground",
		status:
			"mt-[calc((1lh-1rem)/2)] grid size-4 shrink-0 place-items-center text-muted-foreground *:col-start-1 *:row-start-1",
		tick: "menu-check size-4 text-success",
		message:
			"text-xs data-[tone=error]:text-destructive data-[tone=failed]:text-destructive",
		retry:
			"ml-1 rounded-sm font-medium underline underline-offset-2 outline-none focus-visible:ring-2 focus-visible:ring-ring",
	},
	variants: {
		variant: {
			title: { root: "font-semibold text-lg tracking-tight" },
			body: { root: "text-muted-foreground text-sm" },
		},
		size: {
			sm: { root: "text-sm" },
			default: {},
			lg: { root: "text-2xl" },
		},
	},
	compoundVariants: [{ variant: "body", size: "lg", class: { root: "text-base" } }],
	defaultVariants: { variant: "title", size: "default" },
});

export type InlineEditVariant = NonNullable<VariantProps<typeof inlineEdit>["variant"]>;
export type InlineEditSize = NonNullable<VariantProps<typeof inlineEdit>["size"]>;
