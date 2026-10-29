import { type ComponentProps, createContext, useContext, useId } from "react";
import { cn } from "../../lib/cn";
import { type IntegrationSectionVariant, integrationSection } from "../variants";

export type { IntegrationSectionVariant };

type IntegrationSectionState = {
	titleId: string;
	styles: ReturnType<typeof integrationSection>;
};

const IntegrationSectionContext = createContext<IntegrationSectionState | null>(null);

function useIntegrationSection() {
	const state = useContext(IntegrationSectionContext);
	if (!state)
		throw new Error(
			"IntegrationSection parts must be rendered inside an IntegrationSection.",
		);
	return state;
}

export interface IntegrationSectionProps extends ComponentProps<"section"> {
	/** A `grid` of cards, or a `cluster` of logo tiles above the header. */
	variant?: IntegrationSectionVariant;
}

/**
 * An integrations section from parts: IntegrationSectionHeader and an IntegrationSectionList
 * of IntegrationSectionItems (logo, name, description, link).
 */
export function IntegrationSection({
	variant = "grid",
	className,
	children,
	...props
}: IntegrationSectionProps) {
	const titleId = useId();
	const styles = integrationSection({ variant });
	return (
		<IntegrationSectionContext.Provider value={{ titleId, styles }}>
			<section
				data-slot="integration-section"
				data-variant={variant}
				aria-labelledby={titleId}
				className={cn(styles.root(), className)}
				{...props}
			>
				<div className={styles.inner()}>{children}</div>
			</section>
		</IntegrationSectionContext.Provider>
	);
}

export function IntegrationSectionHeader({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="integration-section-header"
			className={cn(useIntegrationSection().styles.header(), className)}
			{...props}
		/>
	);
}

export function IntegrationSectionTitle({ className, ...props }: ComponentProps<"h2">) {
	const { titleId, styles } = useIntegrationSection();
	return (
		<h2
			data-slot="integration-section-title"
			id={titleId}
			className={cn(styles.title(), className)}
			{...props}
		/>
	);
}

export function IntegrationSectionDescription({
	className,
	...props
}: ComponentProps<"p">) {
	return (
		<p
			data-slot="integration-section-description"
			className={cn(useIntegrationSection().styles.description(), className)}
			{...props}
		/>
	);
}

export function IntegrationSectionList({ className, ...props }: ComponentProps<"ul">) {
	return (
		<ul
			data-slot="integration-section-list"
			className={cn(useIntegrationSection().styles.list(), className)}
			{...props}
		/>
	);
}

export interface IntegrationSectionItemProps extends ComponentProps<"li"> {
	/** Highlights one item, e.g. your own product at the centre of the cluster. */
	featured?: boolean;
}

export function IntegrationSectionItem({
	featured = false,
	className,
	...props
}: IntegrationSectionItemProps) {
	return (
		<li
			data-slot="integration-section-item"
			data-featured={featured}
			className={cn(useIntegrationSection().styles.item(), className)}
			{...props}
		/>
	);
}

/** The tool's mark; pass an `<img>` or inline `<svg>`. */
export function IntegrationSectionItemLogo({
	className,
	...props
}: ComponentProps<"span">) {
	return (
		<span
			data-slot="integration-section-item-logo"
			aria-hidden="true"
			className={cn(useIntegrationSection().styles.logo(), className)}
			{...props}
		/>
	);
}

export function IntegrationSectionItemName({
	className,
	...props
}: ComponentProps<"h3">) {
	return (
		<h3
			data-slot="integration-section-item-name"
			className={cn(useIntegrationSection().styles.name(), className)}
			{...props}
		/>
	);
}

export function IntegrationSectionItemDescription({
	className,
	...props
}: ComponentProps<"p">) {
	return (
		<p
			data-slot="integration-section-item-description"
			className={cn(useIntegrationSection().styles.itemDescription(), className)}
			{...props}
		/>
	);
}

export interface IntegrationSectionItemLinkProps extends ComponentProps<"a"> {
	href: string;
}

/** "Learn more" under a card; in the cluster it covers the whole tile. */
export function IntegrationSectionItemLink({
	className,
	children,
	...props
}: IntegrationSectionItemLinkProps) {
	const { styles } = useIntegrationSection();
	return (
		<a
			data-slot="integration-section-item-link"
			className={cn(styles.link(), className)}
			{...props}
		>
			<span>
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
			</span>
		</a>
	);
}
