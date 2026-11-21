import { createContext } from "svelte";
import type { ImageViewerVariant } from "../variants";
import {
	actualPixelsScale,
	clampView,
	containSize,
	FIT,
	type Size,
	type View,
	zoomAt,
} from "../zoom";

export type ImageViewerImage = {
	src: string;
	alt: string;
	/** Smaller file for the filmstrip; falls back to `src`. */
	thumbnail?: string;
	/** Known size, so the picture lays out before it has loaded. */
	width?: number;
	height?: number;
};

const PADDING = 24;

type Options = {
	images: () => ImageViewerImage[];
	index: () => number;
	setIndex: (index: number) => void;
	loop: () => boolean;
	variant: () => ImageViewerVariant;
	detailsOpen: () => boolean;
	setDetailsOpen: (open: boolean) => void;
};

export class ImageViewerState {
	view = $state<View>(FIT);
	stage = $state<Size>({ w: 0, h: 0 });
	loaded = $state<Size | null>(null);
	#options: Options;

	constructor(options: Options) {
		this.#options = options;
	}

	get images() {
		return this.#options.images();
	}
	get count() {
		return this.images.length;
	}
	get index() {
		return Math.min(Math.max(this.#options.index(), 0), Math.max(this.count - 1, 0));
	}
	get image(): ImageViewerImage | undefined {
		return this.images[this.index];
	}
	get loop() {
		return this.#options.loop();
	}
	get variant() {
		return this.#options.variant();
	}
	get detailsOpen() {
		return this.#options.detailsOpen();
	}
	set detailsOpen(open: boolean) {
		this.#options.setDetailsOpen(open);
	}
	get natural(): Size {
		return this.loaded ?? { w: this.image?.width ?? 0, h: this.image?.height ?? 0 };
	}
	get base(): Size {
		return containSize(this.natural, this.stage, PADDING);
	}
	get percent() {
		const { base, natural } = this;
		return base.w > 0 && natural.w > 0
			? Math.round(((base.w * this.view.scale) / natural.w) * 100)
			: 100;
	}
	get actual() {
		return actualPixelsScale(this.natural, this.base);
	}

	/** A new picture, or reopening, starts fitted and is measured again once it loads. */
	reset = () => {
		this.view = FIT;
		this.loaded = null;
	};
	setIndex = (next: number) => {
		if (this.count > 0)
			this.#options.setIndex(Math.min(Math.max(next, 0), this.count - 1));
	};
	step = (delta: number) => {
		const { count, index, loop } = this;
		if (count === 0) return;
		const next = index + delta;
		if (next >= 0 && next < count) this.#options.setIndex(next);
		else if (loop) this.#options.setIndex((next + count) % count);
	};
	setView = (next: View) => {
		this.view = clampView(next, this.base, this.stage);
	};
	zoomBy = (factor: number, point = { x: 0, y: 0 }) => {
		this.setView(zoomAt(this.view, factor, point, this.base, this.stage));
	};
	fit = () => {
		this.view = FIT;
	};
	showActual = () => {
		if (this.actual) this.setView({ scale: this.actual, x: 0, y: 0 });
	};
}

export const [getImageViewer, setImageViewer] = createContext<ImageViewerState>();

/** The live viewer state, for details panels and actions that need the current picture. */
export function useImageViewer(): ImageViewerState {
	return getImageViewer();
}
