import { createContext } from "svelte";
import type { ImageShape } from "../shapes";

export type ImageComposerContext = {
	shape: string;
	readonly shapes: ImageShape[];
	readonly loading: boolean;
	readonly ratio: number;
};

export const [getImageComposer, setImageComposer] = createContext<ImageComposerContext>();

/** The chosen shape and its ratio, for apps that size the result themselves. */
export function useImageComposer(): ImageComposerContext {
	return getImageComposer();
}
