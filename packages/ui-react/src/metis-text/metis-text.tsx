import {
	type CSSProperties,
	createElement,
	type ElementType,
	type ReactNode,
} from "react";
import { cn } from "../lib/cn";
import { type MetisTextDirection, metisText } from "./variants";

export type { MetisTextDirection };

export interface MetisTextProps {
	children: ReactNode;
	as?: ElementType;
	/** Which edge the underline grows from on hover/focus. */
	direction?: MetisTextDirection;
	/** How long the underline grows for, in ms. */
	durationMs?: number;
	className?: string;
}

export function MetisText({
	children,
	as = "span",
	direction = "left",
	durationMs = 300,
	className,
}: MetisTextProps) {
	const { root, underline } = metisText({ direction });
	return createElement(
		as,
		{
			tabIndex: 0,
			"data-slot": "metis-text",
			className: cn(root(), className),
			style: { "--mtx-duration": `${durationMs}ms` } as CSSProperties,
		},
		children,
		createElement("span", {
			key: "underline",
			"aria-hidden": true,
			className: underline(),
		}),
	);
}
