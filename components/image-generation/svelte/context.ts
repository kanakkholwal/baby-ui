import { getContext, hasContext, setContext } from "svelte";
import type { ImageGenerationPhase, imageGeneration } from "../variants";

export interface ImageGenerationState {
	readonly status: ImageGenerationPhase;
	readonly styles: ReturnType<typeof imageGeneration>;
}

const KEY = Symbol("image-generation");

/** The root's state behind getters, so every part reads the latest value. */
export const setImageGeneration = (state: ImageGenerationState) => setContext(KEY, state);
export function imageGenerationState(part: string): ImageGenerationState {
	if (!hasContext(KEY)) throw new Error(`${part} must be used inside <ImageGeneration>`);
	return getContext<ImageGenerationState>(KEY);
}
