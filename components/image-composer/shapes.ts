export type ImageShape = {
	value: string;
	label: string;
	/** Width over height; draws the outline and tells the app what to render. */
	ratio: number;
};

export const IMAGE_SHAPES: ImageShape[] = [
	{ value: "square", label: "Square", ratio: 1 },
	{ value: "portrait", label: "Portrait", ratio: 2 / 3 },
	{ value: "landscape", label: "Landscape", ratio: 3 / 2 },
];
