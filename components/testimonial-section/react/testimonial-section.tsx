import { type ComponentProps, createContext, useContext, useId } from "react";
import { cn } from "../../lib/cn";
import { type TestimonialSectionVariant, testimonialSection } from "../variants";

export type { TestimonialSectionVariant };

type TestimonialSectionState = {
	titleId: string;
	styles: ReturnType<typeof testimonialSection>;
};

const TestimonialSectionContext = createContext<TestimonialSectionState | null>(null);

function useTestimonialSection() {
	const state = useContext(TestimonialSectionContext);
	if (!state)
		throw new Error(
			"TestimonialSection parts must be rendered inside a TestimonialSection.",
		);
	return state;
}

export interface TestimonialSectionProps extends ComponentProps<"section"> {
	/** A `masonry` wall of columns, or a `bento` grid where a featured quote spans 2x2. */
	variant?: TestimonialSectionVariant;
}

/**
 * A wall of customer quotes from parts: TestimonialSectionHeader, then a TestimonialSectionList
 * of TestimonialSectionItems, each holding a Testimonial.
 */
export function TestimonialSection({
	variant = "masonry",
	className,
	children,
	...props
}: TestimonialSectionProps) {
	const titleId = useId();
	const styles = testimonialSection({ variant });
	return (
		<TestimonialSectionContext.Provider value={{ titleId, styles }}>
			<section
				data-slot="testimonial-section"
				data-variant={variant}
				aria-labelledby={titleId}
				className={cn(styles.root(), className)}
				{...props}
			>
				<div className={styles.inner()}>{children}</div>
			</section>
		</TestimonialSectionContext.Provider>
	);
}

export function TestimonialSectionHeader({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="testimonial-section-header"
			className={cn(useTestimonialSection().styles.header(), className)}
			{...props}
		/>
	);
}

export function TestimonialSectionTitle({ className, ...props }: ComponentProps<"h2">) {
	const { titleId, styles } = useTestimonialSection();
	return (
		<h2
			data-slot="testimonial-section-title"
			id={titleId}
			className={cn(styles.title(), className)}
			{...props}
		/>
	);
}

export function TestimonialSectionDescription({
	className,
	...props
}: ComponentProps<"p">) {
	return (
		<p
			data-slot="testimonial-section-description"
			className={cn(useTestimonialSection().styles.description(), className)}
			{...props}
		/>
	);
}

export function TestimonialSectionList({ className, ...props }: ComponentProps<"ul">) {
	return (
		<ul
			data-slot="testimonial-section-list"
			className={cn(useTestimonialSection().styles.list(), className)}
			{...props}
		/>
	);
}

export interface TestimonialSectionItemProps extends ComponentProps<"li"> {
	/** A larger quote; in bento it also spans a 2x2 block. */
	featured?: boolean;
}

/** One quote; put a Testimonial inside. */
export function TestimonialSectionItem({
	featured = false,
	className,
	...props
}: TestimonialSectionItemProps) {
	return (
		<li
			data-slot="testimonial-section-item"
			data-featured={featured}
			className={cn(useTestimonialSection().styles.item(), className)}
			{...props}
		/>
	);
}
