import type { LoadedModel } from "@baby-ui/react";

export const LOADED_MODEL_SAMPLES: LoadedModel[] = [
	{
		id: "chat",
		name: "Llama 3.2 3B Instruct",
		kind: "Chat",
		state: "ready",
		size: 2.4 * 1024 ** 3,
		measurement: {
			value: 62,
			tone: "success",
			label: "93 tokens per second",
			badge: "Fast",
		},
	},
	{
		id: "dictation",
		name: "Whisper Small",
		kind: "Dictation",
		state: "ready",
		size: 0.6 * 1024 ** 3,
		measurement: {
			value: 34,
			tone: "info",
			label: "14x faster than speaking",
			badge: "Decent",
		},
	},
	{
		id: "images",
		name: "SDXL Turbo",
		kind: "Images",
		state: "idle",
		size: 3.1 * 1024 ** 3,
	},
];

export const DEVICE_MEMORY = 16 * 1024 ** 3;
