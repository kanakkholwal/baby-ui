import { Link, Section } from "react-email";
import {
	EmailButton,
	EmailCallout,
	EmailDivider,
	EmailFallbackLink,
	EmailFooter,
	type EmailFooterLink,
	EmailHeader,
	EmailHeading,
	EmailHero,
	EmailKeyValue,
	type EmailKeyValueRow,
	EmailShell,
	type EmailShellAccent,
	type EmailShellSurface,
	EmailText,
} from "../email-kit/email-kit";
import { emailLayout } from "../email-kit/variants";
import { type EmailPasswordResetDesign, emailPasswordReset } from "./variants";

export type { EmailPasswordResetDesign };

export interface EmailPasswordResetProps {
	productName: string;
	/** One-time reset link. */
	resetUrl: string;
	/** Pre-formatted lifetime, e.g. "1 hour". */
	expiresIn: string;
	/** Sender name and postal address, one line each. */
	companyLines: string[];
	/** The account's address, shown back so the reader knows which account this is. */
	recipientEmail?: string;
	/** Pre-formatted time of the request, shown top right of the `hero` panel. */
	requestedAt?: string;
	/** Where the request came from, e.g. device, location, time. */
	requestDetails?: EmailKeyValueRow[];
	/** Account security page, linked from the warning for readers who didn't ask. */
	securityUrl?: string;
	/** Absolute URL, about 32px tall. Falls back to the product name as text. */
	logoUrl?: string;
	footerLinks?: EmailFooterLink[];
	reason?: string;
	preview?: string;
	heading?: string;
	intro?: string;
	/** Centred line above the button in the `hero` design. */
	prompt?: string;
	actionLabel?: string;
	expiryText?: string;
	fallbackLabel?: string;
	detailsTitle?: string;
	warningTitle?: string;
	warningText?: string;
	securityLabel?: string;
	/** `classic` is a plain card; `hero` opens with a tinted panel and a full-width button. */
	design?: EmailPasswordResetDesign;
	surface?: EmailShellSurface;
	accent?: EmailShellAccent;
}

/** Password reset with the request's origin and a clear path for readers who didn't ask. */
export function EmailPasswordReset({
	productName,
	resetUrl,
	expiresIn,
	companyLines,
	recipientEmail,
	requestedAt,
	requestDetails = [],
	securityUrl,
	logoUrl,
	footerLinks,
	reason,
	preview = `Reset your ${productName} password. The link expires in ${expiresIn}.`,
	heading = "Reset your password",
	intro = `We received a request to reset the password for ${recipientEmail ?? `your ${productName} account`}.`,
	prompt = "Choose a new password with the button below.",
	actionLabel = "Reset password",
	expiryText = `This link expires in ${expiresIn} and can be used once.`,
	fallbackLabel,
	detailsTitle = "Request details",
	warningTitle = "Didn't request this?",
	warningText = "Ignore this email and your password stays the same.",
	securityLabel = "Review your account security",
	design = "classic",
	surface = "card",
	accent = "none",
}: EmailPasswordResetProps) {
	const s = emailLayout();
	const r = emailPasswordReset({ design });
	const hero = design === "hero";
	const footer = (
		<EmailFooter
			lines={companyLines}
			links={footerLinks}
			reason={reason}
			layout={hero ? "band" : "plain"}
		/>
	);
	const warning = (
		<EmailText size="sm">
			{warningText}
			{securityUrl ? (
				<>
					{" "}
					<Link href={securityUrl} className={s.inlineLink()}>
						{securityLabel}
					</Link>
					.
				</>
			) : null}
		</EmailText>
	);
	return (
		<EmailShell
			preview={preview}
			surface={surface}
			accent={accent}
			footer={hero ? undefined : footer}
			cardFooter={hero ? footer : undefined}
		>
			{hero ? (
				<EmailHero
					eyebrow={productName}
					meta={requestedAt}
					title={heading}
					text={intro}
					tone="accent"
				/>
			) : (
				<>
					<EmailHeader brand={productName} logo={logoUrl} />
					<EmailHeading>{heading}</EmailHeading>
					<EmailText tone="muted" className={s.intro()}>
						{intro}
					</EmailText>
				</>
			)}
			{hero ? <EmailText className={r.prompt()}>{prompt}</EmailText> : null}
			<Section className={r.action()}>
				<EmailButton
					href={resetUrl}
					size={hero ? "lg" : "md"}
					width={hero ? "full" : "auto"}
				>
					{actionLabel}
				</EmailButton>
			</Section>
			<EmailText tone="muted" size="sm" className={r.reassurance()}>
				{hero ? `${expiryText} ${warningTitle} ${warningText}` : expiryText}
				{hero && securityUrl ? (
					<>
						{" "}
						<Link href={securityUrl} className={s.inlineLink()}>
							{securityLabel}
						</Link>
						.
					</>
				) : null}
			</EmailText>
			{requestDetails.length > 0 ? (
				<Section className={s.section()}>
					<EmailText className={s.sectionTitle()}>{detailsTitle}</EmailText>
					<EmailKeyValue rows={requestDetails} density="compact" />
				</Section>
			) : null}
			{hero ? null : (
				<Section className={s.section()}>
					<EmailCallout tone="warning" title={warningTitle}>
						{warning}
					</EmailCallout>
				</Section>
			)}
			<EmailDivider spacing="lg" />
			<EmailFallbackLink href={resetUrl} label={fallbackLabel} />
		</EmailShell>
	);
}
