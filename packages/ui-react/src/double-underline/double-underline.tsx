import {
	type CSSProperties,
	createElement,
	type ElementType,
	type ReactNode,
} from "react";
import { cn } from "../lib/cn";
import { type DoubleUnderlineTrigger, doubleUnderline } from "./variants";

export type { DoubleUnderlineTrigger };

export interface DoubleUnderlineProps {
	children: ReactNode;
	as?: ElementType;
	/** `hover` reveals the second stroke on hover/focus; `always` keeps both on. */
	trigger?: DoubleUnderlineTrigger;
	/** How long the stroke reveal and letter-spacing shift take, in ms. */
	durationMs?: number;
	className?: string;
}

export function DoubleUnderline({
	children,
	as = "span",
	trigger = "hover",
	durationMs = 500,
	className,
}: DoubleUnderlineProps) {
	const { root, bottom, top } = doubleUnderline({ trigger });
	return createElement(
		as,
		{
			"data-slot": "double-underline",
			className: cn(root(), className),
			style: { "--du-duration": `${durationMs}ms` } as CSSProperties,
		},
		children,
		createElement("span", { key: "bottom", "aria-hidden": true, className: bottom() }),
		createElement("span", { key: "top", "aria-hidden": true, className: top() }),
	);
}
