"use client";

import { type ComponentProps, useState } from "react";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "../input-group/input-group";
import { cn } from "../lib/cn";
import {
	PASSWORD_ICONS,
	PASSWORD_LABELS,
	type PasswordLabels,
	type PasswordRule,
	passwordStrength,
} from "./core";
import {
	type PasswordInputFeedback,
	type PasswordInputSize,
	passwordInput,
	STRENGTH_TONES,
} from "./variants";

export type { PasswordLabels, PasswordRule, PasswordStrength } from "./core";
export type { PasswordInputFeedback, PasswordInputSize };

function Icon({ paths, className }: { paths: readonly string[]; className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={1.8}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			className={className}
		>
			{paths.map((d) => (
				<path key={d} d={d} />
			))}
		</svg>
	);
}

export interface PasswordInputProps
	extends Omit<
		ComponentProps<"input">,
		"size" | "type" | "value" | "onChange" | "defaultValue"
	> {
	value: string;
	onValueChange: (value: string) => void;
	/** Checklist and meter source. Omit for a plain sign-in field. */
	rules?: PasswordRule[];
	feedback?: PasswordInputFeedback;
	size?: PasswordInputSize;
	labels?: Partial<PasswordLabels>;
	/** Applied to the wrapper; everything else lands on the `<input>`. */
	className?: string;
}

export function PasswordInput({
	value,
	onValueChange,
	rules,
	feedback = "both",
	size = "md",
	labels: labelsProp,
	className,
	autoComplete,
	onKeyDown,
	onKeyUp,
	onBlur,
	...props
}: PasswordInputProps) {
	const labels = { ...PASSWORD_LABELS, ...labelsProp };
	const s = passwordInput({ size, feedback });
	const [visible, setVisible] = useState(false);
	const [capsLock, setCapsLock] = useState(false);
	const strength = rules ? passwordStrength(value, rules) : null;
	const readCaps = (e: React.KeyboardEvent<HTMLInputElement>) =>
		setCapsLock(e.getModifierState("CapsLock"));

	return (
		<div data-slot="password-input" className={cn(s.root(), className)}>
			<InputGroup size={size}>
				<InputGroupInput
					type={visible ? "text" : "password"}
					value={value}
					autoComplete={autoComplete ?? (rules ? "new-password" : "current-password")}
					spellCheck={false}
					autoCapitalize="none"
					className={s.control()}
					onChange={(e) => onValueChange(e.currentTarget.value)}
					onKeyDown={(e) => {
						readCaps(e);
						onKeyDown?.(e);
					}}
					onKeyUp={(e) => {
						readCaps(e);
						onKeyUp?.(e);
					}}
					onBlur={(e) => {
						setCapsLock(false);
						onBlur?.(e);
					}}
					{...props}
				/>
				<InputGroupAddon align="inline-end">
					<InputGroupButton
						size="icon-xs"
						aria-label={visible ? labels.hide : labels.show}
						aria-pressed={visible}
						onClick={() => setVisible((v) => !v)}
					>
						<Icon paths={visible ? PASSWORD_ICONS.eyeOff : PASSWORD_ICONS.eye} />
					</InputGroupButton>
				</InputGroupAddon>
			</InputGroup>
			{capsLock ? (
				<p className={s.caps()}>
					<Icon paths={PASSWORD_ICONS.caps} className="size-3.5" />
					{labels.capsLock}
				</p>
			) : null}
			{strength && rules ? (
				<>
					<div className="flex items-center gap-3">
						<div className={cn(s.meter(), "flex-1")} aria-hidden="true">
							{[1, 2, 3, 4].map((step) => (
								<span
									key={step}
									className={cn(
										s.segment(),
										strength.score >= step && STRENGTH_TONES[strength.score],
									)}
								/>
							))}
						</div>
						<span className={s.level()} aria-hidden="true">
							{labels.levels[strength.score]}
						</span>
					</div>
					<span className="sr-only" aria-live="polite">
						{strength.score ? `${labels.strength}: ${labels.levels[strength.score]}` : ""}
					</span>
					<ul className={s.rules()} aria-label={labels.strength}>
						{rules.map((rule) => {
							const met = strength.met.includes(rule.id);
							return (
								<li key={rule.id} data-met={met} className={s.rule()}>
									<Icon
										paths={met ? PASSWORD_ICONS.check : PASSWORD_ICONS.dot}
										className={s.ruleIcon()}
									/>
									{rule.label}
									<span className="sr-only">{met ? "(met)" : "(not met)"}</span>
								</li>
							);
						})}
					</ul>
				</>
			) : null}
		</div>
	);
}
