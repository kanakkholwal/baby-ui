import { type ComponentProps, createContext, useContext, useId } from "react";
import { cn } from "../../lib/cn";
import { type ContentSectionVariant, contentSection } from "../variants";

export type { ContentSectionVariant };

type ContentSectionState = { titleId: string; styles: ReturnType<typeof contentSection> };

const ContentSectionContext = createContext<ContentSectionState | null>(null);

function useContentSection() {
	const state = useContext(ContentSectionContext);
	if (!state)
		throw new Error("ContentSection parts must be rendered inside a ContentSection.");
	return state;
}

export interface ContentSectionProps extends ComponentProps<"section"> {
	/** `split` sets media beside the prose; `stacked` centres the prose over full-width media. */
	variant?: ContentSectionVariant;
}

/**
 * An editorial section from parts: ContentSectionTitle, ContentSectionMedia and a
 * ContentSectionBody of paragraphs with an optional ContentSectionQuote.
 */
export function ContentSection({
	variant = "split",
	className,
	children,
	...props
}: ContentSectionProps) {
	const titleId = useId();
	const styles = contentSection({ variant });
	return (
		<ContentSectionContext.Provider value={{ titleId, styles }}>
			<section
				data-slot="content-section"
				data-variant={variant}
				aria-labelledby={titleId}
				className={cn(styles.root(), className)}
				{...props}
			>
				<div className={styles.inner()}>{children}</div>
			</section>
		</ContentSectionContext.Provider>
	);
}

export function ContentSectionTitle({ className, ...props }: ComponentProps<"h2">) {
	const { titleId, styles } = useContentSection();
	return (
		<h2
			data-slot="content-section-title"
			id={titleId}
			className={cn(styles.title(), className)}
			{...props}
		/>
	);
}

/** The prose: paragraphs, with `<strong>` lifted to full contrast. */
export function ContentSectionBody({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="content-section-body"
			className={cn(useContentSection().styles.body(), className)}
			{...props}
		/>
	);
}

/** An image in a soft rim that eases in on hover. */
export function ContentSectionMedia({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="content-section-media"
			className={cn(useContentSection().styles.media(), className)}
			{...props}
		/>
	);
}

/** A pull quote inside the body: ContentSectionQuoteText then ContentSectionQuoteAuthor. */
export function ContentSectionQuote({ className, ...props }: ComponentProps<"figure">) {
	return (
		<figure
			data-slot="content-section-quote"
			className={cn(useContentSection().styles.quote(), className)}
			{...props}
		/>
	);
}

export function ContentSectionQuoteText({
	className,
	...props
}: ComponentProps<"blockquote">) {
	return (
		<blockquote
			data-slot="content-section-quote-text"
			className={cn(useContentSection().styles.quoteText(), className)}
			{...props}
		/>
	);
}

export function ContentSectionQuoteAuthor({
	className,
	...props
}: ComponentProps<"figcaption">) {
	return (
		<figcaption
			data-slot="content-section-quote-author"
			className={cn(useContentSection().styles.quoteAuthor(), className)}
			{...props}
		/>
	);
}
