import { createContext } from "svelte";
import type { LoadedModel } from "../model";
import type { LoadedModelsVariant } from "../variants";

export type LoadedModelsContext = {
	readonly models: LoadedModel[];
	readonly loaded: LoadedModel[];
	readonly variant: LoadedModelsVariant;
	readonly onLoad?: (id: string) => void;
	readonly onUnload?: (id: string) => void;
};

export const [getLoadedModels, setLoadedModels] = createContext<LoadedModelsContext>();
