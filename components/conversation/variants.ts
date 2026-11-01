import { tv } from "tailwind-variants";

export const conversationRail = tv({
	slots: {
		root: "pointer-events-none absolute inset-y-0 end-1 z-10 flex flex-col items-end justify-center",
		tick: "group/tick pointer-events-auto flex h-6 w-6 items-center justify-end rounded-md pe-0.5 outline-none transition-[background-color,scale] duration-(--duration-fast) hover:bg-foreground/[0.05] focus-visible:ring-2 focus-visible:ring-ring active:scale-(--press-scale) motion-reduce:transition-none",
		bar: "h-0.5 w-2.5 rounded-full bg-foreground/20 transition-[width,background-color] duration-(--duration-fast) ease-(--ease-ui-out) group-hover/tick:w-4 group-hover/tick:bg-foreground/50 group-data-[active]/tick:w-5 group-data-[active]/tick:bg-foreground/80 motion-reduce:transition-none",
	},
});
