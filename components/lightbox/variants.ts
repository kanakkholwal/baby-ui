import { tv, type VariantProps } from "tailwind-variants";

export const lightbox = tv({
	slots: {
		// Fills the window; the primitive owns the top layer, focus trap and inertness.
		popup: [
			"fixed inset-0 z-50 flex flex-col outline-none backdrop-blur-xl",
			"transition-opacity duration-(--duration-overlay) ease-(--ease-out-quad)",
			"data-[closed]:opacity-0 data-[closed]:duration-(--duration-base)",
			"data-[state=closed]:opacity-0 data-[state=closed]:duration-(--duration-base)",
			"starting:data-[open]:opacity-0 starting:data-[state=open]:opacity-0",
			"motion-reduce:transition-none",
		],
		toolbar: "flex h-14 shrink-0 items-center gap-1 px-3",
		control: "",
		counter: "min-w-16 text-center text-sm tabular-nums",
		zoomValue:
			"min-w-14 rounded-lg px-2 py-1.5 text-center text-sm tabular-nums outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
		body: "relative flex min-h-0 flex-1",
		// A small map of the picture while zoomed in; the lit rectangle is what the stage shows.
		minimap:
			"absolute bottom-4 left-4 z-1 overflow-hidden rounded-lg bg-black/40 shadow-(--overlay-shadow) outline-none backdrop-blur-sm transition-[opacity,translate] duration-(--duration-base) ease-(--ease-ui-out) data-[hidden]:pointer-events-none data-[hidden]:translate-y-1 data-[hidden]:opacity-0 motion-reduce:transition-none",
		minimapRect:
			"absolute cursor-grab rounded-[3px] shadow-[0_0_0_1px_rgb(255_255_255/0.9),0_0_0_999px_rgb(0_0_0/0.5)] active:cursor-grabbing",
		stage:
			"relative min-h-0 min-w-0 flex-1 touch-none overflow-hidden select-none outline-none",
		image: [
			"absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 select-none rounded-sm opacity-0",
			"transition-[opacity,transform] duration-(--duration-base) ease-(--ease-out-quad) data-[loaded]:opacity-100 data-[dragging]:transition-[opacity]",
			"motion-reduce:transition-none",
		],
		// The wrapper animates its width; the panel inside keeps its own, so text never reflows.
		detailsWrap:
			"hidden shrink-0 overflow-hidden transition-[width,opacity] duration-(--duration-overlay) ease-(--ease-out-quad) motion-reduce:transition-none md:block",
		details: "flex h-full w-80 flex-col gap-4 overflow-y-auto p-5",
		filmstrip: "flex shrink-0 gap-2 overflow-x-auto p-3 [scrollbar-width:none]",
		thumb:
			"relative h-14 shrink-0 overflow-hidden rounded-md outline-none transition-[opacity,scale,box-shadow] duration-(--duration-base) ease-(--ease-ui-out) focus-visible:ring-2 focus-visible:ring-ring active:scale-(--press-scale) motion-reduce:transition-none",
	},
	variants: {
		// `immersive` is a dark room for the picture in either theme; `themed` follows the page.
		variant: {
			immersive: {
				popup: "bg-black/90 text-white",
				control: "text-white/75 hover:bg-white/10 hover:text-white",
				counter: "text-white/70",
				zoomValue: "text-white/75 hover:bg-white/10 hover:text-white",
				stage: "cursor-zoom-in",
				details: "bg-white/[0.06] text-white/90",
			},
			themed: {
				popup: "bg-background/90 text-foreground",
				control: "text-muted-foreground hover:bg-foreground/[0.06] hover:text-foreground",
				counter: "text-muted-foreground",
				zoomValue:
					"text-muted-foreground hover:bg-foreground/[0.06] hover:text-foreground",
				stage: "cursor-zoom-in",
				details: "bg-card text-card-foreground",
			},
		},
		active: {
			true: { thumb: "opacity-100 shadow-[0_0_0_2px_currentColor]" },
			false: { thumb: "opacity-50 hover:opacity-90" },
		},
		panel: {
			open: { detailsWrap: "w-80 opacity-100" },
			closed: { detailsWrap: "w-0 opacity-0" },
		},
	},
	defaultVariants: { variant: "immersive", active: false, panel: "open" },
});

export type LightboxVariant = NonNullable<VariantProps<typeof lightbox>["variant"]>;
