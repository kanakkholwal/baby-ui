import {
	type ComponentProps,
	createContext,
	type ReactNode,
	useContext,
	useId,
} from "react";
import { Button } from "../../button/react/button";
import type { ButtonVariant } from "../../button/variants";
import { cn } from "../../lib/cn";
import {
	type HeroSectionMediaVariant,
	type HeroSectionVariant,
	heroSection,
	heroSectionMedia,
} from "../variants";

export type { HeroSectionMediaVariant, HeroSectionVariant };

type HeroSectionState = {
	variant: HeroSectionVariant;
	titleId: string;
	styles: ReturnType<typeof heroSection>;
};

const HeroSectionContext = createContext<HeroSectionState | null>(null);

function useHeroSection() {
	const state = useContext(HeroSectionContext);
	if (!state) throw new Error("HeroSection parts must be rendered inside a HeroSection.");
	return state;
}

export interface HeroSectionProps extends ComponentProps<"section"> {
	/** `centered` stacks copy over the media; `split` sets them side by side. */
	variant?: HeroSectionVariant;
}

/**
 * A landing hero from parts: HeroSectionContent (announcement, title, description, actions,
 * logos) and an optional HeroSectionMedia below it, or beside it in `split`.
 */
export function HeroSection({
	variant = "centered",
	className,
	children,
	...props
}: HeroSectionProps) {
	const titleId = useId();
	const styles = heroSection({ variant });
	return (
		<HeroSectionContext.Provider value={{ variant, titleId, styles }}>
			<section
				data-slot="hero-section"
				data-variant={variant}
				aria-labelledby={titleId}
				className={cn(styles.root(), className)}
				{...props}
			>
				<div className={styles.inner()}>{children}</div>
			</section>
		</HeroSectionContext.Provider>
	);
}

export function HeroSectionContent({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="hero-section-content"
			className={cn(useHeroSection().styles.content(), className)}
			{...props}
		/>
	);
}

function Arrow() {
	return (
		<svg aria-hidden="true" viewBox="0 0 12 12" fill="none">
			<path
				d="M2 6h8m-3-3 3 3-3 3"
				stroke="currentColor"
				strokeWidth="1.4"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export interface HeroSectionAnnouncementProps extends ComponentProps<"a"> {
	href: string;
	/** A short lead before the text, e.g. "New". */
	label?: ReactNode;
}

/** A pill link above the title; its arrow slides on hover. */
export function HeroSectionAnnouncement({
	label,
	className,
	children,
	...props
}: HeroSectionAnnouncementProps) {
	const { styles } = useHeroSection();
	return (
		<a
			data-slot="hero-section-announcement"
			className={cn(styles.announcement(), className)}
			{...props}
		>
			{label ? <span className={styles.announcementLabel()}>{label}</span> : null}
			<span className={styles.announcementText()}>{children}</span>
			<span aria-hidden="true" className={styles.announcementRule()} />
			<span aria-hidden="true" className={styles.announcementArrow()}>
				<span className={styles.announcementTrack()}>
					<span className={styles.announcementCell()}>
						<Arrow />
					</span>
					<span className={styles.announcementCell()}>
						<Arrow />
					</span>
				</span>
			</span>
		</a>
	);
}

export function HeroSectionTitle({ className, ...props }: ComponentProps<"h1">) {
	const { titleId, styles } = useHeroSection();
	return (
		<h1
			data-slot="hero-section-title"
			id={titleId}
			className={cn(styles.title(), className)}
			{...props}
		/>
	);
}

export function HeroSectionDescription({ className, ...props }: ComponentProps<"p">) {
	return (
		<p
			data-slot="hero-section-description"
			className={cn(useHeroSection().styles.description(), className)}
			{...props}
		/>
	);
}

export function HeroSectionActions({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="hero-section-actions"
			className={cn(useHeroSection().styles.actions(), className)}
			{...props}
		/>
	);
}

export interface HeroSectionActionProps {
	/** Renders a link; otherwise a button calling `onClick`. */
	href?: string;
	onClick?: () => void;
	/** `default` for the primary action, `outline` or `ghost` for the rest. */
	variant?: ButtonVariant;
	className?: string;
	children?: ReactNode;
}

export function HeroSectionAction({
	href,
	onClick,
	variant = "default",
	className,
	children,
}: HeroSectionActionProps) {
	return (
		<Button
			data-slot="hero-section-action"
			href={href}
			onClick={onClick}
			variant={variant}
			size="lg"
			className={cn(useHeroSection().styles.action(), className)}
		>
			{children}
		</Button>
	);
}

export interface HeroSectionLogosProps extends ComponentProps<"div"> {
	/** A line above the logos, e.g. "Trusted by teams at". */
	label?: ReactNode;
}

/** A row of customer logos; hovering one dims the rest. */
export function HeroSectionLogos({
	label,
	className,
	children,
	...props
}: HeroSectionLogosProps) {
	const { styles } = useHeroSection();
	return (
		<div
			data-slot="hero-section-logos"
			className={cn(styles.logos(), className)}
			{...props}
		>
			{label ? <p className={styles.logosLabel()}>{label}</p> : null}
			<div className={styles.logosList()}>{children}</div>
		</div>
	);
}

export interface HeroSectionMediaProps extends ComponentProps<"div"> {
	/** `plain` as is, `framed` in a rim that fades out, `tilted` skewed over a plate. */
	variant?: HeroSectionMediaVariant;
}

/** The product shot; put an `<img>` or any visual inside. */
export function HeroSectionMedia({
	variant = "framed",
	className,
	children,
	...props
}: HeroSectionMediaProps) {
	const layout = useHeroSection().variant;
	const styles = heroSectionMedia({ variant, layout });
	return (
		<div
			data-slot="hero-section-media"
			data-variant={variant}
			className={cn(styles.root(), className)}
			{...props}
		>
			<div aria-hidden="true" className={styles.plate()} />
			<div className={styles.frame()}>{children}</div>
		</div>
	);
}
