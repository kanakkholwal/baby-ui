"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import { cn } from "../lib/cn";
import {
	FILLED_ICONS,
	MAC_ARROW_KEYS,
	MAC_ARROW_WIDTH,
	MAC_KEY_ICONS,
	MAC_KEYBOARD_LABELS,
	MAC_KEYBOARD_ROWS,
	type MacKey,
	type MacKeyboardLabels,
	type MacKeyIcon,
	togglePressed,
} from "./layout";
import { type MacKeyboardSize, type MacKeyboardVariant, macKeyboard } from "./variants";

export type { MacKeyboardLabels, MacKeyboardSize, MacKeyboardVariant };

export interface MacKeyboardProps {
	/** Controlled: `KeyboardEvent.code` values currently held down. */
	pressed?: string[];
	defaultPressed?: string[];
	onPressedChange?: (pressed: string[]) => void;
	/** Mirror the physical keyboard while the page has focus. */
	listen?: boolean;
	variant?: MacKeyboardVariant;
	size?: MacKeyboardSize;
	labels?: Partial<MacKeyboardLabels>;
	className?: string;
}

function Icon({ name, className }: { name: MacKeyIcon; className: string }) {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 24 24"
			fill={FILLED_ICONS.has(name) ? "currentColor" : "none"}
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
		>
			{MAC_KEY_ICONS[name].map((d) => (
				<path key={d} d={d} />
			))}
		</svg>
	);
}

export function MacKeyboard({
	pressed: pressedProp,
	defaultPressed = [],
	onPressedChange,
	listen = true,
	variant = "default",
	size = "md",
	labels: labelsProp,
	className,
}: MacKeyboardProps) {
	const [internal, setInternal] = useState<string[]>(defaultPressed);
	const pressed = pressedProp ?? internal;
	const labels = { ...MAC_KEYBOARD_LABELS, ...labelsProp };
	const styles = macKeyboard({ variant, size });

	const latest = useRef({ pressed, onPressedChange });
	latest.current = { pressed, onPressedChange };

	const press = (code: string, down: boolean) => {
		const next = togglePressed(latest.current.pressed, code, down);
		if (!next) return;
		latest.current.pressed = next;
		setInternal(next);
		latest.current.onPressedChange?.(next);
	};
	const pressRef = useRef(press);
	pressRef.current = press;

	useEffect(() => {
		if (!listen) return;
		const down = (event: KeyboardEvent) => {
			if (!event.repeat) pressRef.current(event.code, true);
		};
		const up = (event: KeyboardEvent) => pressRef.current(event.code, false);
		const clear = () => {
			for (const code of [...latest.current.pressed]) pressRef.current(code, false);
		};
		window.addEventListener("keydown", down);
		window.addEventListener("keyup", up);
		window.addEventListener("blur", clear);
		return () => {
			window.removeEventListener("keydown", down);
			window.removeEventListener("keyup", up);
			window.removeEventListener("blur", clear);
		};
	}, [listen]);

	const renderKey = (key: MacKey, extra?: string) => {
		const s = macKeyboard({ variant, size, kind: key.kind, end: key.end ?? false });
		const legend = key.name ? labels[key.name] : key.label;
		return (
			<div
				data-slot="mac-keyboard-key"
				data-code={key.code}
				data-pressed={pressed.includes(key.code) ? "" : undefined}
				className={cn(s.key(), extra)}
				onPointerDown={(event) => {
					event.currentTarget.setPointerCapture(event.pointerId);
					press(key.code, true);
				}}
				onPointerUp={() => press(key.code, false)}
				onPointerCancel={() => press(key.code, false)}
			>
				{key.kind === "caps" && <span className={s.led()} />}
				{key.kind === "dual" && <span className={s.sub()}>{key.shift}</span>}
				{key.icon && <Icon name={key.icon} className={s.icon()} />}
				{key.kind === "fn" ? (
					<span className={s.sub()}>{legend}</span>
				) : (
					legend && <span className={s.legend()}>{legend}</span>
				)}
			</div>
		);
	};

	return (
		<div
			data-slot="mac-keyboard"
			role="img"
			aria-label={labels.keyboard}
			className={cn(styles.root(), className)}
		>
			{MAC_KEYBOARD_ROWS.map((row, r) => (
				<div key={r} className={styles.row()}>
					{row.map((key) => (
						<div
							key={key.code}
							className={styles.slot()}
							style={{ "--w": key.width ?? 1 } as CSSProperties}
						>
							{renderKey(key)}
						</div>
					))}
					{r === MAC_KEYBOARD_ROWS.length - 1 && (
						<div
							className={styles.arrows()}
							style={{ "--w": MAC_ARROW_WIDTH } as CSSProperties}
						>
							{renderKey(MAC_ARROW_KEYS.up, "col-start-2 row-start-1 rounded-[4px]")}
							{renderKey(MAC_ARROW_KEYS.left, "col-start-1 row-start-2 rounded-[4px]")}
							{renderKey(MAC_ARROW_KEYS.down, "col-start-2 row-start-2 rounded-[4px]")}
							{renderKey(MAC_ARROW_KEYS.right, "col-start-3 row-start-2 rounded-[4px]")}
						</div>
					)}
				</div>
			))}
		</div>
	);
}
