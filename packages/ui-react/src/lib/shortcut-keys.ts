/** Glyphs people know from native menus, keyed by the tokens a `shortcut` string uses. */
const GLYPHS: Record<string, string> = {
	cmd: "⌘",
	command: "⌘",
	meta: "⌘",
	ctrl: "⌃",
	control: "⌃",
	shift: "⇧",
	alt: "⌥",
	option: "⌥",
	enter: "↵",
	return: "↵",
	esc: "⎋",
	escape: "⎋",
	tab: "⇥",
	space: "␣",
	up: "↑",
	down: "↓",
	left: "←",
	right: "→",
	backspace: "⌫",
	delete: "⌦",
};

const SPOKEN: Record<string, string> = {
	cmd: "Command",
	command: "Command",
	meta: "Command",
	ctrl: "Control",
	control: "Control",
	shift: "Shift",
	alt: "Option",
	option: "Option",
	esc: "Escape",
	return: "Enter",
	up: "Up",
	down: "Down",
	left: "Left",
	right: "Right",
};

const MODIFIERS: Record<string, "meta" | "ctrl" | "shift" | "alt"> = {
	cmd: "meta",
	command: "meta",
	meta: "meta",
	ctrl: "ctrl",
	control: "ctrl",
	shift: "shift",
	alt: "alt",
	option: "alt",
};

const NAMED: Record<string, string> = {
	enter: "enter",
	return: "enter",
	esc: "escape",
	escape: "escape",
	tab: "tab",
	space: " ",
	up: "arrowup",
	down: "arrowdown",
	left: "arrowleft",
	right: "arrowright",
	backspace: "backspace",
	delete: "delete",
};

export type ParsedShortcut = {
	meta: boolean;
	ctrl: boolean;
	shift: boolean;
	alt: boolean;
	key: string;
	caps: string[];
	spoken: string;
};

/** Parses `"cmd+shift+k"` into modifier flags, the key to match and the caps to render. */
export function parseShortcut(value: string): ParsedShortcut | undefined {
	const tokens = value
		.split("+")
		.map((t) => t.trim().toLowerCase())
		.filter(Boolean);
	if (!tokens.length) return undefined;
	const out: ParsedShortcut = {
		meta: false,
		ctrl: false,
		shift: false,
		alt: false,
		key: "",
		caps: [],
		spoken: "",
	};
	const words: string[] = [];
	for (const token of tokens) {
		const modifier = MODIFIERS[token];
		if (modifier) {
			out[modifier] = true;
			out.caps.push(GLYPHS[token] ?? token);
			words.push(SPOKEN[token] ?? token);
			continue;
		}
		const key = NAMED[token] ?? (token.length === 1 ? token : undefined);
		if (!key || out.key) return undefined;
		out.key = key;
		out.caps.push(GLYPHS[token] ?? token.toUpperCase());
		words.push(SPOKEN[token] ?? token.toUpperCase());
	}
	out.spoken = words.join(" ");
	return out.key ? out : undefined;
}

export function matchesShortcut(event: KeyboardEvent, parsed: ParsedShortcut): boolean {
	return (
		event.key.toLowerCase() === parsed.key &&
		event.metaKey === parsed.meta &&
		event.ctrlKey === parsed.ctrl &&
		event.shiftKey === parsed.shift &&
		event.altKey === parsed.alt
	);
}

/** Typing targets swallow single keys; only Enter and Escape are allowed through from inputs. */
export function shortcutBlocked(event: KeyboardEvent, parsed: ParsedShortcut): boolean {
	const target = event.target;
	if (!(target instanceof HTMLElement)) return false;
	const editable =
		target.matches("input, textarea, select") ||
		target.isContentEditable ||
		target.closest('[contenteditable]:not([contenteditable="false"])') !== null;
	if (!editable) return false;
	return !(
		target instanceof HTMLInputElement && ["enter", "escape"].includes(parsed.key)
	);
}

/** The button or link a shortcut hint sits inside, unless it is disabled. */
export function shortcutOwner(el: HTMLElement): HTMLElement | undefined {
	const owner = el.closest<HTMLElement>('button, a[href], [role="button"]');
	if (!owner) return undefined;
	const disabled =
		(owner instanceof HTMLButtonElement && owner.disabled) ||
		owner.hasAttribute("disabled") ||
		owner.getAttribute("aria-disabled") === "true";
	return disabled ? undefined : owner;
}
