import { type ComponentProps, createContext, useContext, useId } from "react";
import { cn } from "../../lib/cn";
import { type FeatureSectionVariant, featureSection } from "../variants";

export type { FeatureSectionVariant };

type FeatureSectionState = { titleId: string; styles: ReturnType<typeof featureSection> };

const FeatureSectionContext = createContext<FeatureSectionState | null>(null);

function useFeatureSection() {
	const state = useContext(FeatureSectionContext);
	if (!state)
		throw new Error("FeatureSection parts must be rendered inside a FeatureSection.");
	return state;
}

export interface FeatureSectionProps extends ComponentProps<"section"> {
	/** `cards`, ruled `divided` cells, open `plain` columns, or a `split` list beside media. */
	variant?: FeatureSectionVariant;
}

/**
 * A feature section from parts: FeatureSectionHeader, a FeatureSectionList of
 * FeatureSectionItems, and in `split` a FeatureSectionMedia beside them.
 */
export function FeatureSection({
	variant = "cards",
	className,
	children,
	...props
}: FeatureSectionProps) {
	const titleId = useId();
	const styles = featureSection({ variant });
	return (
		<FeatureSectionContext.Provider value={{ titleId, styles }}>
			<section
				data-slot="feature-section"
				data-variant={variant}
				aria-labelledby={titleId}
				className={cn(styles.root(), className)}
				{...props}
			>
				<div className={styles.inner()}>{children}</div>
			</section>
		</FeatureSectionContext.Provider>
	);
}

export function FeatureSectionHeader({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="feature-section-header"
			className={cn(useFeatureSection().styles.header(), className)}
			{...props}
		/>
	);
}

/** A short kicker above the title. */
export function FeatureSectionEyebrow({ className, ...props }: ComponentProps<"p">) {
	return (
		<p
			data-slot="feature-section-eyebrow"
			className={cn(useFeatureSection().styles.eyebrow(), className)}
			{...props}
		/>
	);
}

export function FeatureSectionTitle({ className, ...props }: ComponentProps<"h2">) {
	const { titleId, styles } = useFeatureSection();
	return (
		<h2
			data-slot="feature-section-title"
			id={titleId}
			className={cn(styles.title(), className)}
			{...props}
		/>
	);
}

export function FeatureSectionDescription({ className, ...props }: ComponentProps<"p">) {
	return (
		<p
			data-slot="feature-section-description"
			className={cn(useFeatureSection().styles.description(), className)}
			{...props}
		/>
	);
}

export function FeatureSectionList({ className, ...props }: ComponentProps<"ul">) {
	return (
		<ul
			data-slot="feature-section-list"
			className={cn(useFeatureSection().styles.list(), className)}
			{...props}
		/>
	);
}

export function FeatureSectionItem({ className, ...props }: ComponentProps<"li">) {
	return (
		<li
			data-slot="feature-section-item"
			className={cn(useFeatureSection().styles.item(), className)}
			{...props}
		/>
	);
}

/** The item's glyph; pass an inline `<svg>`. */
export function FeatureSectionIcon({
	className,
	children,
	...props
}: ComponentProps<"span">) {
	const { styles } = useFeatureSection();
	return (
		<span
			data-slot="feature-section-icon"
			aria-hidden="true"
			className={cn(styles.icon(), className)}
			{...props}
		>
			<span className={styles.iconTile()}>{children}</span>
		</span>
	);
}

export function FeatureSectionItemTitle({ className, ...props }: ComponentProps<"h3">) {
	return (
		<h3
			data-slot="feature-section-item-title"
			className={cn(useFeatureSection().styles.itemTitle(), className)}
			{...props}
		/>
	);
}

export function FeatureSectionItemDescription({
	className,
	...props
}: ComponentProps<"p">) {
	return (
		<p
			data-slot="feature-section-item-description"
			className={cn(useFeatureSection().styles.itemDescription(), className)}
			{...props}
		/>
	);
}

/** A visual beside the list in `split`; below it otherwise. */
export function FeatureSectionMedia({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="feature-section-media"
			className={cn(useFeatureSection().styles.media(), className)}
			{...props}
		/>
	);
}
