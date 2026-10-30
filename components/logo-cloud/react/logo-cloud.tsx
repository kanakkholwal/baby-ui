import { type ComponentProps, createContext, useContext } from "react";
import { cn } from "../../lib/cn";
import { type LogoCloudVariant, logoCloud } from "../variants";

export type { LogoCloudVariant };

const LogoCloudContext = createContext<ReturnType<typeof logoCloud> | null>(null);

function useLogoCloud() {
	const styles = useContext(LogoCloudContext);
	if (!styles) throw new Error("LogoCloud parts must be rendered inside a LogoCloud.");
	return styles;
}

export interface LogoCloudProps extends ComponentProps<"section"> {
	/** A centred `grid`, or a ruled `row` with the title beside the logos. */
	variant?: LogoCloudVariant;
}

/**
 * Customer logos from parts: LogoCloudTitle, then LogoCloudContent holding a LogoCloudList of
 * LogoCloudItems and an optional LogoCloudLink that surfaces on hover.
 */
export function LogoCloud({
	variant = "grid",
	className,
	children,
	...props
}: LogoCloudProps) {
	const styles = logoCloud({ variant });
	return (
		<LogoCloudContext.Provider value={styles}>
			<section
				data-slot="logo-cloud"
				data-variant={variant}
				className={cn(styles.root(), className)}
				{...props}
			>
				<div className={styles.inner()}>{children}</div>
			</section>
		</LogoCloudContext.Provider>
	);
}

/** A short line naming the logos, e.g. "Trusted by teams at". */
export function LogoCloudTitle({ className, ...props }: ComponentProps<"h2">) {
	return (
		<h2
			data-slot="logo-cloud-title"
			className={cn(useLogoCloud().title(), className)}
			{...props}
		/>
	);
}

/** Holds the list and the link, so hovering anywhere over the logos reveals it. */
export function LogoCloudContent({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="logo-cloud-content"
			className={cn(useLogoCloud().stage(), className)}
			{...props}
		/>
	);
}

export function LogoCloudList({ className, ...props }: ComponentProps<"ul">) {
	return (
		<ul
			data-slot="logo-cloud-list"
			className={cn(useLogoCloud().list(), className)}
			{...props}
		/>
	);
}

/** One logo; give its image the company name as alt text. */
export function LogoCloudItem({ className, ...props }: ComponentProps<"li">) {
	return (
		<li
			data-slot="logo-cloud-item"
			className={cn(useLogoCloud().item(), className)}
			{...props}
		/>
	);
}

export interface LogoCloudLinkProps extends ComponentProps<"a"> {
	href: string;
}

/** "See all customers": over the logos on hover with a mouse, under them on touch. */
export function LogoCloudLink({ className, children, ...props }: LogoCloudLinkProps) {
	const styles = useLogoCloud();
	return (
		<a data-slot="logo-cloud-link" className={cn(styles.link(), className)} {...props}>
			{children}
			<svg
				aria-hidden="true"
				viewBox="0 0 16 16"
				fill="none"
				className={styles.linkArrow()}
			>
				<path
					d="m6 4 4 4-4 4"
					stroke="currentColor"
					strokeWidth="1.6"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</a>
	);
}
