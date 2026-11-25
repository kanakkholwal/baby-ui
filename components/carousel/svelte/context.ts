import { createContext } from "svelte";
import type { CarouselLabels, carousel } from "../variants";

export type CarouselContext = {
	readonly s: ReturnType<typeof carousel>;
	readonly id: string;
	readonly index: number;
	readonly startIndex: number;
	readonly count: number;
	readonly loop: boolean;
	readonly dragging: boolean;
	readonly labels: CarouselLabels;
	/** Called once by each CarouselItem during init; returns its position. */
	register: () => number;
	/** Hands the viewport and track to the root, which owns the engine. */
	attach: (viewport: HTMLElement, track: HTMLElement) => void;
	go: (index: number) => void;
	step: (delta: number) => void;
	setHovered: (hovered: boolean) => void;
	slideLabel: (index: number) => string;
	slideId: (index: number) => string;
};

export const [getCarousel, setCarousel] = createContext<CarouselContext>();

/** Thumbnails take their slide position in order, like the slides. */
export const [getThumbs, setThumbs] = createContext<{ register: () => number }>();
