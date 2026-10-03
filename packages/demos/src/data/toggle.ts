/** A 16px glyph stroked at 1.4, with the accessible name an icon-only toggle needs. */
export type ToggleGlyph = { value: string; label: string; path: string };

export const TOGGLE_BOOKMARK: ToggleGlyph = {
	value: "bookmark",
	label: "Bookmark",
	path: "M4.5 2.5h7a.5.5 0 0 1 .5.5v10.5L8 11l-4 2.5V3a.5.5 0 0 1 .5-.5Z",
};

export const TEXT_MARKS: ToggleGlyph[] = [
	{
		value: "bold",
		label: "Bold",
		path: "M5 3h4.5a2.5 2.5 0 0 1 0 5H5zm0 5h5a2.5 2.5 0 0 1 0 5H5z",
	},
	{ value: "italic", label: "Italic", path: "M10 3H6.5m3 10H6m4-10L8 13" },
	{
		value: "underline",
		label: "Underline",
		path: "M4.5 2.5v5a3.5 3.5 0 0 0 7 0v-5M4 13.5h8",
	},
	{
		value: "strikethrough",
		label: "Strikethrough",
		path: "M3 8h10M10.5 4.5C10 3.5 9 3 7.8 3 6.2 3 5 3.9 5 5.2c0 .9.6 1.5 1.5 1.9M5.5 11c.5 1.2 1.6 2 3 2 1.6 0 2.8-.9 2.8-2.3",
	},
];

export const ALIGNMENTS: ToggleGlyph[] = [
	{ value: "left", label: "Align left", path: "M2.5 4h11M2.5 8h7M2.5 12h9" },
	{ value: "center", label: "Align center", path: "M2.5 4h11M4.5 8h7M3.5 12h9" },
	{ value: "right", label: "Align right", path: "M2.5 4h11M6.5 8h7M4.5 12h9" },
	{ value: "justify", label: "Justify", path: "M2.5 4h11M2.5 8h11M2.5 12h11" },
];
