import type { MacKeyKind } from "./variants";

const SPEAKER =
	"M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5";

/** Tabler glyph paths (24px grid, stroke 2). */
export const MAC_KEY_ICONS = {
	"brightness-down": [
		"M9 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0",
		"M12 5l0 .01",
		"M17 7l0 .01",
		"M19 12l0 .01",
		"M17 17l0 .01",
		"M12 19l0 .01",
		"M7 17l0 .01",
		"M5 12l0 .01",
		"M7 7l0 .01",
	],
	"brightness-up": [
		"M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0",
		"M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7",
	],
	grid: [
		"M4 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z",
		"M14 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z",
		"M4 15a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z",
		"M14 15a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z",
	],
	search: ["M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0", "M21 21l-6 -6"],
	microphone: [
		"M9 5a3 3 0 0 1 6 0v5a3 3 0 0 1 -6 0z",
		"M5 10a7 7 0 0 0 14 0",
		"M8 21l8 0",
		"M12 17l0 4",
	],
	moon: [
		"M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z",
	],
	"skip-back": ["M20 5v14l-12 -7z", "M4 5l0 14"],
	play: ["M7 4v16l13 -8z"],
	"skip-forward": ["M4 5v14l12 -7z", "M20 5l0 14"],
	mute: [SPEAKER, "M16 10l4 4m0 -4l-4 4"],
	"volume-low": [SPEAKER, "M15 8a5 5 0 0 1 0 8"],
	"volume-high": [SPEAKER, "M15 8a5 5 0 0 1 0 8", "M17.7 5a9 9 0 0 1 0 14"],
	lock: [
		"M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z",
		"M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0",
		"M8 11v-4a4 4 0 1 1 8 0v4",
	],
	globe: [
		"M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0",
		"M3.6 9h16.8",
		"M3.6 15h16.8",
		"M11.5 3a17 17 0 0 0 0 18",
		"M12.5 3a17 17 0 0 1 0 18",
	],
	control: ["M6 15l6 -6l6 6"],
	option: ["M4 6h5l6 12h5", "M14 6h6"],
	command: [
		"M7 9a2 2 0 1 1 2 -2v10a2 2 0 1 1 -2 -2h10a2 2 0 1 1 -2 2v-10a2 2 0 1 1 2 2h-10",
	],
	"arrow-left": ["M5 12l14 0", "M5 12l6 6", "M5 12l6 -6"],
	"arrow-right": ["M5 12l14 0", "M13 18l6 -6", "M13 6l6 6"],
	"arrow-up": ["M12 5l0 14", "M18 11l-6 -6", "M6 11l6 -6"],
	"arrow-down": ["M12 5l0 14", "M18 13l-6 6", "M6 13l6 6"],
} as const;

export type MacKeyIcon = keyof typeof MAC_KEY_ICONS;

/** Media glyphs drawn solid rather than outlined. */
export const FILLED_ICONS: ReadonlySet<MacKeyIcon> = new Set([
	"skip-back",
	"play",
	"skip-forward",
]);

export type MacKeyboardLabels = {
	keyboard: string;
	esc: string;
	delete: string;
	tab: string;
	capsLock: string;
	return: string;
	shift: string;
	fn: string;
	control: string;
	option: string;
	command: string;
};

export const MAC_KEYBOARD_LABELS: MacKeyboardLabels = {
	keyboard: "Keyboard",
	esc: "esc",
	delete: "delete",
	tab: "tab",
	capsLock: "caps lock",
	return: "return",
	shift: "shift",
	fn: "fn",
	control: "control",
	option: "option",
	command: "command",
};

export type MacKey = {
	/** `KeyboardEvent.code` the key lights up for. */
	code: string;
	kind: MacKeyKind;
	width?: number;
	label?: string;
	/** Named legend, overridable through `labels`. */
	name?: keyof MacKeyboardLabels;
	/** Upper legend on symbol keys. */
	shift?: string;
	icon?: MacKeyIcon;
	/** Text sits at the right edge (right-hand modifiers). */
	end?: boolean;
};

const letters = (codes: string) =>
	Array.from(codes, (c): MacKey => ({ code: `Key${c}`, kind: "letter", label: c }));

const dual = (code: string, label: string, shift: string): MacKey => ({
	code,
	kind: "dual",
	label,
	shift,
});

const fnKey = (n: number, icon: MacKeyIcon): MacKey => ({
	code: `F${n}`,
	kind: "fn",
	label: `F${n}`,
	icon,
});

/** US ANSI MacBook layout; the arrow cluster is rendered separately after the last row. */
export const MAC_KEYBOARD_ROWS: MacKey[][] = [
	[
		{ code: "Escape", kind: "text", name: "esc", width: 1.5 },
		fnKey(1, "brightness-down"),
		fnKey(2, "brightness-up"),
		fnKey(3, "grid"),
		fnKey(4, "search"),
		fnKey(5, "microphone"),
		fnKey(6, "moon"),
		fnKey(7, "skip-back"),
		fnKey(8, "play"),
		fnKey(9, "skip-forward"),
		fnKey(10, "mute"),
		fnKey(11, "volume-low"),
		fnKey(12, "volume-high"),
		{ code: "TouchID", kind: "icon", icon: "lock" },
	],
	[
		dual("Backquote", "`", "~"),
		dual("Digit1", "1", "!"),
		dual("Digit2", "2", "@"),
		dual("Digit3", "3", "#"),
		dual("Digit4", "4", "$"),
		dual("Digit5", "5", "%"),
		dual("Digit6", "6", "^"),
		dual("Digit7", "7", "&"),
		dual("Digit8", "8", "*"),
		dual("Digit9", "9", "("),
		dual("Digit0", "0", ")"),
		dual("Minus", "-", "_"),
		dual("Equal", "=", "+"),
		{ code: "Backspace", kind: "text", name: "delete", width: 1.5, end: true },
	],
	[
		{ code: "Tab", kind: "text", name: "tab", width: 1.5 },
		...letters("QWERTYUIOP"),
		dual("BracketLeft", "[", "{"),
		dual("BracketRight", "]", "}"),
		dual("Backslash", "\\", "|"),
	],
	[
		{ code: "CapsLock", kind: "caps", name: "capsLock", width: 1.75 },
		...letters("ASDFGHJKL"),
		dual("Semicolon", ";", ":"),
		dual("Quote", "'", '"'),
		{ code: "Enter", kind: "text", name: "return", width: 1.75, end: true },
	],
	[
		{ code: "ShiftLeft", kind: "text", name: "shift", width: 2.25 },
		...letters("ZXCVBNM"),
		dual("Comma", ",", "<"),
		dual("Period", ".", ">"),
		dual("Slash", "/", "?"),
		{ code: "ShiftRight", kind: "text", name: "shift", width: 2.25, end: true },
	],
	[
		{ code: "Fn", kind: "modifier", name: "fn", icon: "globe" },
		{ code: "ControlLeft", kind: "modifier", name: "control", icon: "control" },
		{ code: "AltLeft", kind: "modifier", name: "option", icon: "option", width: 1.25 },
		{ code: "MetaLeft", kind: "modifier", name: "command", icon: "command", width: 1.5 },
		{ code: "Space", kind: "text", width: 4 },
		{
			code: "MetaRight",
			kind: "modifier",
			name: "command",
			icon: "command",
			width: 1.5,
			end: true,
		},
		{
			code: "AltRight",
			kind: "modifier",
			name: "option",
			icon: "option",
			width: 1.25,
			end: true,
		},
	],
];

export const MAC_ARROW_KEYS = {
	up: { code: "ArrowUp", kind: "icon", icon: "arrow-up" },
	left: { code: "ArrowLeft", kind: "icon", icon: "arrow-left" },
	down: { code: "ArrowDown", kind: "icon", icon: "arrow-down" },
	right: { code: "ArrowRight", kind: "icon", icon: "arrow-right" },
} satisfies Record<string, MacKey>;

/** Arrow cluster width, in key units. */
export const MAC_ARROW_WIDTH = 3;

/** Pressed codes after `code` goes down or up, or null when nothing changes. */
export function togglePressed(
	pressed: readonly string[],
	code: string,
	down: boolean,
): string[] | null {
	if (down === pressed.includes(code)) return null;
	return down ? [...pressed, code] : pressed.filter((c) => c !== code);
}
