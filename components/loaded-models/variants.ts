import { tv, type VariantProps } from "tailwind-variants";

export const loadedModels = tv({
	slots: {
		trigger: "max-w-56 gap-2",
		dot: "size-2 shrink-0 rounded-full transition-colors duration-(--duration-base) motion-reduce:transition-none",
		content: "w-[min(30rem,calc(100vw-2rem))] p-2",
		header: "flex items-center justify-between px-2 pt-1 pb-1.5",
		title: "font-medium text-sm",
		count: "text-muted-foreground text-sm tabular-nums",
		list: "flex flex-col gap-1",
		row: "rounded-xl p-2 transition-colors duration-(--duration-fast) hover:bg-muted/50 motion-reduce:transition-none",
		line: "flex items-center gap-3",
		tile: "relative grid size-9 shrink-0 place-items-center rounded-xl bg-muted text-muted-foreground [&_svg]:size-[1.125rem]",
		tileDot:
			"absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full ring-2 ring-popover transition-colors duration-(--duration-base) motion-reduce:transition-none",
		text: "min-w-24 flex-1",
		name: "truncate font-medium text-sm",
		meta: "text-muted-foreground text-sm",
		memory: "flex flex-col gap-2 px-2 pb-2",
		memoryBar: "flex h-2 w-full gap-px overflow-hidden rounded-full bg-muted",
		memorySegment:
			"h-full min-w-1 transition-[width] duration-(--duration-overlay) ease-(--ease-ui-out) first:rounded-s-full last:rounded-e-full motion-reduce:transition-none",
		memoryText:
			"flex items-center justify-between gap-3 text-muted-foreground text-xs tabular-nums",
		measure: "mt-2 pl-12",
		measureText: "mt-1.5 flex items-center gap-2 text-sm tabular-nums",
		empty:
			"flex flex-col items-center gap-2 rounded-xl bg-muted/50 px-4 py-6 text-center text-pretty text-sm",
	},
	variants: {
		variant: {
			ghost: { trigger: "text-muted-foreground" },
			secondary: {},
		},
		// What the model is doing right now: loading is work in progress, ready is resident, idle is not in memory.
		state: {
			loading: { dot: "animate-pulse bg-warning", tileDot: "animate-pulse bg-warning" },
			ready: { dot: "bg-success", tileDot: "bg-success" },
			idle: { dot: "bg-muted-foreground/40", tileDot: "bg-muted-foreground/40" },
		},
	},
	defaultVariants: { variant: "ghost", state: "idle" },
});

export type LoadedModelsVariant = NonNullable<
	VariantProps<typeof loadedModels>["variant"]
>;
export type LoadedModelState = NonNullable<VariantProps<typeof loadedModels>["state"]>;
