/** Sample copy for the Empty demo: one entry per scene, with the tone its icon tile wears. */

export const EMPTY_SCENES = {
	search: {
		tone: "neutral",
		title: "No results for “invoice”",
		description: "Try a shorter search, or check the spelling.",
		action: "Clear search",
		icon: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM20 20l-4-4",
	},
	inbox: {
		tone: "success",
		title: "You're all caught up",
		description: "New messages land here as soon as they arrive.",
		action: "Open archive",
		icon: "M4 13h4l2 3h4l2-3h4M4 13l2-8h12l2 8v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z",
	},
	error: {
		tone: "destructive",
		title: "Couldn't load projects",
		description: "The server took too long to answer. Your work is safe.",
		action: "Try again",
		icon: "M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z",
	},
	upload: {
		tone: "primary",
		title: "Upload your first file",
		description: "Drop files here, or browse. PDFs and images up to 20 MB.",
		action: "Browse files",
		icon: "M12 16V4M7 9l5-5 5 5M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3",
	},
} as const;

export type EmptyScene = keyof typeof EMPTY_SCENES;

export const isEmptyScene = (value: unknown): value is EmptyScene =>
	typeof value === "string" && value in EMPTY_SCENES;
