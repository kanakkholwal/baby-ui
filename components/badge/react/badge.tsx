import type { ComponentProps } from "react";
import { cn } from "../../lib/cn";
import {
	type BadgeFill,
	type BadgePlacement,
	type BadgeSize,
	type BadgeVariant,
	badge,
	badgeAnchor,
} from "../variants";

export interface BadgeProps extends ComponentProps<"span"> {
	variant?: BadgeVariant;
	size?: BadgeSize;
	fill?: BadgeFill;
	/** Pins the badge to a corner of a `BadgeAnchor`. An empty badge is a dot. */
	placement?: BadgePlacement;
	dot?: boolean;
}

export function Badge({
	children,
	className,
	variant = "default",
	size = "default",
	fill = "soft",
	placement = "none",
	dot = false,
	...props
}: BadgeProps) {
	return (
		<span
			data-slot="badge"
			data-variant={variant}
			className={cn(badge({ variant, size, fill, placement }), className)}
			{...props}
		>
			{dot ? (
				<span data-slot="badge-dot" className="shrink-0 rounded-full bg-current" />
			) : null}
			{children}
		</span>
	);
}

/** Wraps the element a corner badge sits on, such as an avatar or an icon button. */
export function BadgeAnchor({ className, ...props }: ComponentProps<"span">) {
	return (
		<span data-slot="badge-anchor" className={cn(badgeAnchor(), className)} {...props} />
	);
}
