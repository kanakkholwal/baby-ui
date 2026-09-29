"use client";

import { type ComponentProps, useState } from "react";
import { ColorPicker } from "../color-picker/color-picker";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../input-group/input-group";
import { cn } from "../lib/cn";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/popover";
import { keyStep, parseHex, stepHex } from "./core";
import { type ColorFieldSize, colorField } from "./variants";

export interface ColorFieldProps
	extends Omit<ComponentProps<"input">, "size" | "value" | "defaultValue" | "onChange"> {
	/** Hex colour. Controlled with `onValueChange`; `defaultValue` when uncontrolled. */
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
	size?: ColorFieldSize;
	invalid?: boolean;
	/** Accessible name for the hex input and the swatch's picker. */
	label?: string;
	/** The swatch opens the full ColorPicker; off, it is only a preview. */
	picker?: boolean;
}

export function ColorField({
	value,
	defaultValue = "#000000",
	onValueChange,
	size = "md",
	invalid = false,
	label = "Colour",
	picker = true,
	disabled,
	className,
	onBlur,
	onKeyDown,
	...rest
}: ColorFieldProps) {
	const s = colorField({ size });
	const [inner, setInner] = useState(defaultValue);
	const committed = parseHex(value ?? inner) ?? "#000000";
	// What the user is typing; null shows the committed value.
	const [draft, setDraft] = useState<string | null>(null);
	const parsed = draft === null ? committed : parseHex(draft);

	function commit(next: string) {
		setDraft(null);
		if (next === committed) return;
		if (value === undefined) setInner(next);
		onValueChange?.(next);
	}

	const swatch = (
		<span
			aria-hidden
			className={s.swatch()}
			style={{ backgroundColor: parsed ?? committed }}
		/>
	);

	return (
		<InputGroup size={size} data-slot="color-field" className={cn(s.root(), className)}>
			<InputGroupAddon>
				{picker ? (
					<Popover>
						<PopoverTrigger
							disabled={disabled}
							aria-label={`Pick ${label.toLowerCase()}`}
							className={s.trigger()}
						>
							{swatch}
						</PopoverTrigger>
						<PopoverContent className={s.content()}>
							<ColorPicker value={committed} onValueChange={commit} label={label} />
						</PopoverContent>
					</Popover>
				) : (
					swatch
				)}
			</InputGroupAddon>
			<InputGroupInput
				{...rest}
				disabled={disabled}
				aria-label={label}
				invalid={invalid || parsed === null}
				spellCheck={false}
				autoComplete="off"
				value={draft ?? committed.toUpperCase()}
				onChange={(e) => setDraft(e.currentTarget.value)}
				onBlur={(e) => {
					if (parsed) commit(parsed);
					else setDraft(null);
					onBlur?.(e);
				}}
				onKeyDown={(e) => {
					const step = keyStep(e.key);
					if (e.key === "Enter" && parsed) commit(parsed);
					else if (e.key === "Escape") setDraft(null);
					else if (step !== null) {
						e.preventDefault();
						commit(stepHex(parsed ?? committed, step));
					}
					onKeyDown?.(e);
				}}
				className={s.input()}
			/>
		</InputGroup>
	);
}
