import { tv, type VariantProps } from "tailwind-variants";

export const composer = tv({
	slots: {
		root: "relative w-full rounded-2xl p-2 transition-[border-color,background-color] duration-(--duration-fast) ease-(--ease-ui-out) data-[disabled]:pointer-events-none data-[disabled]:opacity-60 motion-reduce:transition-none",
		input: "relative",
		textarea:
			"scrollbar-none block w-full resize-none overflow-y-auto bg-transparent text-foreground outline-none placeholder:text-muted-foreground",
		mirror:
			"pointer-events-none invisible absolute inset-x-0 top-0 whitespace-pre-wrap [overflow-wrap:break-word]",
		toolbar: "mt-1 flex min-h-8 items-center gap-1",
		actionsTrigger:
			"size-8 rounded-full data-[popup-open]:bg-accent data-[state=open]:bg-accent [&>svg]:transition-[rotate] [&>svg]:duration-(--duration-fast) [&>svg]:ease-(--ease-spring-snappy) data-[popup-open]:[&>svg]:rotate-45 data-[state=open]:[&>svg]:rotate-45 motion-reduce:[&>svg]:transition-none",
		actionIcon:
			"mt-0.5 grid size-5 shrink-0 place-items-center text-muted-foreground [&_svg]:size-4",
		modelTrigger:
			"h-8 w-auto max-w-52 gap-1.5 rounded-xl border-0 bg-transparent px-2 py-0 text-xs hover:bg-muted",
		modelIcon:
			"grid size-4 shrink-0 place-items-center text-muted-foreground [&_svg]:size-3.5",
		submit: "ms-auto size-8 rounded-full",
		submitIcon:
			"grid place-items-center transition-[opacity,translate,scale] duration-(--duration-fast) ease-(--ease-spring-snappy) starting:translate-y-[3px] starting:scale-80 starting:opacity-0 motion-reduce:transition-none",
	},
	variants: {
		/** `outline` is the bordered field; `filled` sits on a muted surface with no edge. */
		variant: {
			outline: {
				root: "border border-border bg-background focus-within:border-foreground/25",
			},
			filled: { root: "border border-transparent bg-muted focus-within:border-border" },
		},
		size: {
			sm: {
				textarea: "px-1.5 pt-1 text-xs leading-5",
				mirror: "px-1.5 pt-1 text-xs leading-5",
			},
			default: {
				textarea: "px-2 pt-1.5 text-sm leading-6",
				mirror: "px-2 pt-1.5 text-sm leading-6",
			},
			lg: {
				textarea: "px-2.5 pt-2 text-base leading-7",
				mirror: "px-2.5 pt-2 text-base leading-7",
			},
		},
	},
	defaultVariants: { variant: "outline", size: "default" },
});

export type ComposerVariant = NonNullable<VariantProps<typeof composer>["variant"]>;
export type ComposerSize = NonNullable<VariantProps<typeof composer>["size"]>;

export const COMPOSER_LINE_HEIGHT: Record<ComposerSize, number> = {
	sm: 20,
	default: 24,
	lg: 28,
};
