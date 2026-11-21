import { createContext } from "svelte";
import type { ImageGalleryVariant } from "../variants";

export type ImageGalleryImage = {
	src: string;
	alt: string;
	/** Known size, so a masonry column reserves the right height before the picture loads. */
	width?: number;
	height?: number;
	/** A line under the alt text in the hover info. */
	caption?: string;
};

export type ImageGalleryContext = {
	readonly images: ImageGalleryImage[];
	readonly variant: ImageGalleryVariant;
	readonly selectable: boolean;
	readonly selected: number[];
	toggle: (index: number) => void;
	open: (index: number) => void;
};

export const [getImageGallery, setImageGallery] = createContext<ImageGalleryContext>();
export const [getImageGalleryItem, setImageGalleryItem] = createContext<{
	readonly index: number;
}>();

/** The live gallery state, for custom items and info. */
export function useImageGallery(): ImageGalleryContext {
	return getImageGallery();
}
