import { tv, type VariantProps } from "tailwind-variants";

/** Status lives on `data-status`, so each part styles its own response to it. */
export const imageGeneration = tv({
	slots: {
		root: "w-full",
		frame: "relative isolate w-full overflow-hidden rounded-xl bg-muted",
		media: [
			"absolute inset-0 *:size-full *:object-cover",
			"transition-[filter,opacity,scale] duration-(--duration-overlay) ease-(--ease-ui-out) motion-reduce:transition-[opacity]",
			"data-[status=queued]:scale-[1.02] data-[status=queued]:opacity-0 data-[status=queued]:blur-[4px] data-[status=queued]:saturate-75",
			"data-[status=generating]:scale-[1.015] data-[status=generating]:opacity-0 data-[status=generating]:blur-[3px]",
			"data-[status=refining]:scale-[1.005] data-[status=refining]:opacity-60 data-[status=refining]:blur-[1.5px]",
			"data-[status=error]:opacity-30 data-[status=error]:blur-[2px] data-[status=error]:saturate-50",
		],
		field: [
			"absolute inset-0 size-full bg-muted text-foreground",
			"transition-opacity duration-(--duration-overlay) ease-(--ease-ui-out) motion-reduce:transition-none",
			"data-[status=refining]:opacity-50 data-[status=complete]:opacity-0 data-[status=error]:opacity-0",
		],
		badge:
			"absolute top-2 right-2 z-10 rounded-full bg-background/75 px-2 py-0.5 font-mono text-muted-foreground text-xs tabular-nums backdrop-blur-sm",
		caption: "mt-3 flex min-w-0 flex-col gap-0.5 text-left",
		status:
			"flex min-h-5 items-center gap-2 font-medium text-foreground text-sm data-[status=error]:text-destructive",
		mark: "grid size-3.5 shrink-0 place-items-center *:col-start-1 *:row-start-1",
		spinner:
			"image-generation-mark grid size-3.5 grid-cols-2 place-items-center gap-0.5 *:size-1 *:rounded-[1px] *:bg-current",
		statusText:
			"transition-[opacity,translate] duration-(--duration-fast) ease-(--ease-ui-out) starting:translate-y-1 starting:opacity-0 motion-reduce:transition-none",
		prompt: "m-0 truncate text-muted-foreground text-xs",
		retry: "mt-3",
		icon: "size-3.5 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2]",
	},
	variants: {
		/** `compact` is a 13rem tile for a chat turn; `fluid` fills its container. */
		variant: {
			compact: { root: "mx-auto max-w-52" },
			fluid: {},
		},
	},
	defaultVariants: { variant: "compact" },
});

export type ImageGenerationVariant = NonNullable<
	VariantProps<typeof imageGeneration>["variant"]
>;

export type ImageGenerationPhase =
	| "queued"
	| "generating"
	| "refining"
	| "complete"
	| "error";

export const IMAGE_GENERATION_STATUS_TEXT: Record<ImageGenerationPhase, string> = {
	queued: "Waiting to generate",
	generating: "Generating image",
	refining: "Refining details",
	complete: "Image ready",
	error: "Generation failed",
};

export const isGenerating = (status: ImageGenerationPhase) =>
	status === "queued" || status === "generating" || status === "refining";

/** Stroke paths on a 24px grid. */
export const IMAGE_GENERATION_ICONS = {
	check: "m5 12.5 4.5 4.5L19 7.5",
	alert: "M12 7.5v5.5M12 16.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
	retry: "M3.5 12a8.5 8.5 0 1 0 2.5-6M3.5 4v4.5H8",
} as const;
