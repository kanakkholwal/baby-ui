export const LOADED_MODELS_ICONS = {
	chip: "M9 3v2M15 3v2M9 19v2M15 19v2M3 9h2M3 15h2M19 9h2M19 15h2M7 5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2ZM10 10h4v4h-4Z",
	power: "M12 3v8M7.5 6.5a7 7 0 1 0 9 0",
	play: "M8 5.5v13l10-6.5-10-6.5Z",
} as const;

export type LoadedModelsIcon = keyof typeof LOADED_MODELS_ICONS;
