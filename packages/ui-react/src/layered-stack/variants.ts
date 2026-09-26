import { tv, type VariantProps } from "tailwind-variants";

export const layeredStack = tv({
	slots: {
		root: "relative grid w-full gap-4 p-4 @container",
		card: "relative m-0 overflow-hidden rounded-md border border-border bg-muted shadow-xl outline-none transition-[translate,rotate,scale,box-shadow] duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none",
		image: "block size-full object-cover",
	},
	variants: {
		columns: {
			"2": { root: "grid-cols-2" },
			"3": { root: "grid-cols-2 @md:grid-cols-3" },
			"4": { root: "grid-cols-2 @md:grid-cols-4" },
		},
		aspect: {
			portrait: { card: "aspect-[25/32]" },
			square: { card: "aspect-square" },
			landscape: { card: "aspect-[4/3]" },
		},
		state: {
			stacked: {
				card: "translate-x-[var(--layered-x,0px)] translate-y-[var(--layered-y,0px)] rotate-[var(--layered-r,0deg)]",
			},
			spread: { card: "focus-visible:scale-105" },
		},
	},
	defaultVariants: { columns: "4", aspect: "portrait", state: "stacked" },
});

export type LayeredStackColumns = NonNullable<
	VariantProps<typeof layeredStack>["columns"]
>;
export type LayeredStackAspect = NonNullable<VariantProps<typeof layeredStack>["aspect"]>;

export interface LayeredStackItem {
	src: string;
	alt: string;
}

/** A stable pseudo-random tilt in [-max, max] degrees for the card at `index`. */
export function stackRotation(index: number, max: number): number {
	const hash = Math.sin(index * 12.9898 + 78.233) * 43758.5453;
	return (hash - Math.floor(hash) - 0.5) * 2 * max;
}

/** Each card's offset from its grid cell to the container's centre, in px. */
export function stackOffsets(root: HTMLElement): { x: number; y: number }[] {
	return Array.from(root.children as HTMLCollectionOf<HTMLElement>, (card) => ({
		x: root.clientWidth / 2 - card.offsetWidth / 2 - card.offsetLeft,
		y: root.clientHeight / 2 - card.offsetHeight / 2 - card.offsetTop,
	}));
}

/** Transition delay (ms) that fans cards out in order over 100 ms, like the source stagger. */
export function spreadDelay(index: number, total: number): number {
	return total > 1 ? Math.round((index * 100) / (total - 1)) : 0;
}

/** The roving index after `key`, or undefined when the key does not move focus. */
export function nextIndex(key: string, index: number, total: number): number | undefined {
	if (key === "ArrowRight" || key === "ArrowDown") return (index + 1) % total;
	if (key === "ArrowLeft" || key === "ArrowUp") return (index - 1 + total) % total;
	if (key === "Home") return 0;
	if (key === "End") return total - 1;
	return undefined;
}
