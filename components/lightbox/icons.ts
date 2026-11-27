export const LIGHTBOX_ICONS = {
	previous: "m15 5-7 7 7 7",
	next: "m9 5 7 7-7 7",
	zoomIn: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM20 20l-4-4M11 8v6M8 11h6",
	zoomOut: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM20 20l-4-4M8 11h6",
	fit: "M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5",
	details: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM12 11v5M12 8v.01",
	close: "m6 6 12 12M18 6 6 18",
} as const;

export type LightboxIcon = keyof typeof LIGHTBOX_ICONS;
