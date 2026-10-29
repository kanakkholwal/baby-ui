import { type ComponentProps, createContext, useContext, useId } from "react";
import { cn } from "../../lib/cn";
import { type ContactSectionVariant, contactSection } from "../variants";

export type { ContactSectionVariant };

type ContactSectionState = {
	titleId: string;
	formTitleId: string;
	styles: ReturnType<typeof contactSection>;
};

const ContactSectionContext = createContext<ContactSectionState | null>(null);

function useContactSection() {
	const state = useContext(ContactSectionContext);
	if (!state)
		throw new Error("ContactSection parts must be rendered inside a ContactSection.");
	return state;
}

export interface ContactSectionProps extends ComponentProps<"section"> {
	/** `split` sets the form beside the copy; `stacked` centres everything in one column. */
	variant?: ContactSectionVariant;
}

/**
 * A contact section from parts: ContactSectionHeader, ContactSectionChannels of
 * ContactSectionChannels, and a ContactSectionForm holding your own fields.
 */
export function ContactSection({
	variant = "split",
	className,
	children,
	...props
}: ContactSectionProps) {
	const titleId = useId();
	const formTitleId = useId();
	const styles = contactSection({ variant });
	return (
		<ContactSectionContext.Provider value={{ titleId, formTitleId, styles }}>
			<section
				data-slot="contact-section"
				data-variant={variant}
				aria-labelledby={titleId}
				className={cn(styles.root(), className)}
				{...props}
			>
				<div className={styles.inner()}>{children}</div>
			</section>
		</ContactSectionContext.Provider>
	);
}

export function ContactSectionHeader({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="contact-section-header"
			className={cn(useContactSection().styles.header(), className)}
			{...props}
		/>
	);
}

export function ContactSectionTitle({ className, ...props }: ComponentProps<"h2">) {
	const { titleId, styles } = useContactSection();
	return (
		<h2
			data-slot="contact-section-title"
			id={titleId}
			className={cn(styles.title(), className)}
			{...props}
		/>
	);
}

export function ContactSectionDescription({ className, ...props }: ComponentProps<"p">) {
	return (
		<p
			data-slot="contact-section-description"
			className={cn(useContactSection().styles.description(), className)}
			{...props}
		/>
	);
}

export function ContactSectionChannels({ className, ...props }: ComponentProps<"ul">) {
	return (
		<ul
			data-slot="contact-section-channels"
			className={cn(useContactSection().styles.channels(), className)}
			{...props}
		/>
	);
}

/** One way to reach you: a title, a link and a detail line. */
export function ContactSectionChannel({ className, ...props }: ComponentProps<"li">) {
	return (
		<li
			data-slot="contact-section-channel"
			className={cn(useContactSection().styles.channel(), className)}
			{...props}
		/>
	);
}

export function ContactSectionChannelTitle({
	className,
	...props
}: ComponentProps<"h3">) {
	return (
		<h3
			data-slot="contact-section-channel-title"
			className={cn(useContactSection().styles.channelTitle(), className)}
			{...props}
		/>
	);
}

export interface ContactSectionChannelLinkProps extends ComponentProps<"a"> {
	/** A `mailto:`, `tel:` or page URL. */
	href: string;
}

export function ContactSectionChannelLink({
	className,
	...props
}: ContactSectionChannelLinkProps) {
	return (
		<a
			data-slot="contact-section-channel-link"
			className={cn(useContactSection().styles.channelLink(), className)}
			{...props}
		/>
	);
}

export function ContactSectionChannelDetail({
	className,
	...props
}: ComponentProps<"p">) {
	return (
		<p
			data-slot="contact-section-channel-detail"
			className={cn(useContactSection().styles.channelDetail(), className)}
			{...props}
		/>
	);
}

/** The form card; put your own fields and submit button inside and handle `onSubmit`. */
export function ContactSectionForm({ className, ...props }: ComponentProps<"form">) {
	const { formTitleId, styles } = useContactSection();
	return (
		<form
			data-slot="contact-section-form"
			aria-labelledby={formTitleId}
			className={cn(styles.form(), className)}
			{...props}
		/>
	);
}

export function ContactSectionFormTitle({ className, ...props }: ComponentProps<"h3">) {
	const { formTitleId, styles } = useContactSection();
	return (
		<h3
			data-slot="contact-section-form-title"
			id={formTitleId}
			className={cn(styles.formTitle(), className)}
			{...props}
		/>
	);
}

export function ContactSectionFormDescription({
	className,
	...props
}: ComponentProps<"p">) {
	return (
		<p
			data-slot="contact-section-form-description"
			className={cn(useContactSection().styles.formDescription(), className)}
			{...props}
		/>
	);
}
