import { Section } from "react-email";
import {
	EmailButton,
	EmailCode,
	EmailDivider,
	EmailFallbackLink,
	EmailFooter,
	type EmailFooterLink,
	EmailHeader,
	EmailHeading,
	EmailList,
	type EmailListItem,
	EmailPanel,
	EmailShell,
	type EmailShellAccent,
	type EmailShellSurface,
	EmailText,
} from "../email-kit/email-kit";
import { emailLayout } from "../email-kit/variants";
import { type EmailVerifyDesign, emailVerify } from "./variants";

export type { EmailVerifyDesign };

export interface EmailVerifyProps {
	productName: string;
	/** The address being confirmed, shown back so the reader knows which account this is. */
	recipientEmail: string;
	/** One-time confirmation link. */
	verifyUrl: string;
	/** Pre-formatted lifetime of the link, e.g. "24 hours". */
	expiresIn: string;
	/** Sender name and postal address, one line each. */
	companyLines: string[];
	/** Optional code for people who opened the email on another device. */
	code?: string;
	/** Ways to reach support, e.g. email, phone, hours; shown in the `centered` design. */
	helpItems?: EmailListItem[];
	/** Absolute URL, about 32px tall. Falls back to the product name as text. */
	logoUrl?: string;
	footerLinks?: EmailFooterLink[];
	/** Footer line saying why this arrived. */
	reason?: string;
	preview?: string;
	heading?: string;
	/** Line under the heading in the `centered` design. */
	subheading?: string;
	intro?: string;
	actionLabel?: string;
	codeLabel?: string;
	fallbackLabel?: string;
	/** Closing line; defaults to the expiry plus "ignore if this wasn't you". */
	ignoreText?: string;
	noticeTitle?: string;
	helpTitle?: string;
	/** `classic` is a left-aligned card; `centered` adds a security panel, help block and band footer. */
	design?: EmailVerifyDesign;
	surface?: EmailShellSurface;
	accent?: EmailShellAccent;
}

/** Confirms a new account's email address with a link and an optional code. */
export function EmailVerify({
	productName,
	recipientEmail,
	verifyUrl,
	expiresIn,
	companyLines,
	code,
	helpItems = [],
	logoUrl,
	footerLinks,
	reason,
	preview = `Confirm ${recipientEmail} to finish setting up ${productName}.`,
	heading = "Verify your email",
	subheading = `Thanks for signing up for ${productName}`,
	intro = `Confirm that ${recipientEmail} is your address to finish setting up your ${productName} account.`,
	actionLabel = "Verify email address",
	codeLabel = "Or enter this code in the app:",
	fallbackLabel,
	ignoreText = `This link expires in ${expiresIn}. If you didn't create a ${productName} account, you can ignore this email.`,
	noticeTitle = "Security notice",
	helpTitle = "Need help?",
	design = "classic",
	surface = "card",
	accent = "none",
}: EmailVerifyProps) {
	const s = emailLayout();
	const v = emailVerify({ design });
	const centered = design === "centered";
	const footer = (
		<EmailFooter
			lines={companyLines}
			links={footerLinks}
			reason={reason}
			layout={centered ? "band" : "plain"}
		/>
	);
	return (
		<EmailShell
			preview={preview}
			surface={surface}
			accent={accent}
			footer={centered ? undefined : footer}
			cardFooter={centered ? footer : undefined}
		>
			<EmailHeader
				brand={productName}
				logo={logoUrl}
				align={centered ? "center" : "left"}
			/>
			<EmailHeading align={centered ? "center" : "left"}>{heading}</EmailHeading>
			{centered ? (
				<EmailText tone="muted" className={v.subheading()}>
					{subheading}
				</EmailText>
			) : null}
			<EmailText tone={centered ? "default" : "muted"} className={v.intro()}>
				{intro}
			</EmailText>
			<Section className={v.action()}>
				<EmailButton href={verifyUrl}>{actionLabel}</EmailButton>
			</Section>
			{code ? (
				<Section className={s.section()}>
					<EmailText tone="muted" size="sm" className={s.label()}>
						{codeLabel}
					</EmailText>
					<EmailCode code={code} />
				</Section>
			) : null}
			{centered ? (
				<>
					<Section className={v.fallback()}>
						<EmailFallbackLink href={verifyUrl} label={fallbackLabel} align="center" />
					</Section>
					<Section className={v.notice()}>
						<EmailPanel>
							<EmailText className={s.sectionTitle()}>{noticeTitle}</EmailText>
							<EmailText size="sm">{ignoreText}</EmailText>
						</EmailPanel>
					</Section>
					{helpItems.length > 0 ? (
						<>
							<EmailDivider spacing="lg" />
							<EmailHeading size="md">{helpTitle}</EmailHeading>
							<Section className={v.helpList()}>
								<EmailList items={helpItems} marker="dot" />
							</Section>
						</>
					) : null}
				</>
			) : (
				<>
					<EmailDivider spacing="lg" />
					<EmailFallbackLink href={verifyUrl} label={fallbackLabel} />
					<EmailText tone="muted" size="sm" className={s.closing()}>
						{ignoreText}
					</EmailText>
				</>
			)}
		</EmailShell>
	);
}
