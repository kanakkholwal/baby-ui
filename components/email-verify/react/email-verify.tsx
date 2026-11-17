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
	EmailShell,
	type EmailShellSurface,
	EmailText,
} from "../../email-kit/react/email-kit";
import { emailLayout } from "../../email-kit/variants";
import { emailVerify } from "../variants";

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
	/** Ways to reach support, e.g. email, phone, hours. */
	helpItems?: EmailListItem[];
	/** Absolute PNG URL of a square mark, set beside the product name in header and footer. */
	logoUrl?: string;
	footerLinks?: EmailFooterLink[];
	/** Footer line saying why this arrived. */
	reason?: string;
	preview?: string;
	heading?: string;
	/** Line under the heading. */
	subheading?: string;
	intro?: string;
	actionLabel?: string;
	codeLabel?: string;
	fallbackLabel?: string;
	/** Security panel text; defaults to the expiry plus "ignore if this wasn't you". */
	ignoreText?: string;
	noticeTitle?: string;
	helpTitle?: string;
	surface?: Exclude<EmailShellSurface, "stacked">;
}

/** Confirms a new account's email address: centred button, optional code, security panel. */
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
	subheading,
	intro = `Confirm that ${recipientEmail} is your address to finish setting up your ${productName} account.`,
	actionLabel = "Verify email address",
	codeLabel = "Or enter this code in the app",
	fallbackLabel,
	ignoreText = `This link expires in ${expiresIn}. If you didn't create a ${productName} account, you can ignore this email.`,
	noticeTitle = "Security notice",
	helpTitle = "Need help?",
	surface = "plain",
}: EmailVerifyProps) {
	const s = emailLayout();
	const v = emailVerify();
	return (
		<EmailShell
			preview={preview}
			surface={surface}
			cardFooter={
				<EmailFooter
					lines={companyLines}
					links={footerLinks}
					reason={reason}
					brand={productName}
					logo={logoUrl}
					layout="band"
				/>
			}
		>
			<EmailHeader brand={productName} logo={logoUrl} align="left" />
			<EmailHeading align="left">{heading}</EmailHeading>
			{subheading ? (
				<EmailText tone="muted" className={v.subheading()}>
					{subheading}
				</EmailText>
			) : null}
			<EmailText tone="muted" className={v.intro()}>
				{intro}
			</EmailText>
			<Section className={v.action()}>
				<EmailButton href={verifyUrl}>{actionLabel}</EmailButton>
			</Section>
			{code ? (
				<Section className={s.section()}>
					<EmailText tone="muted" size="sm" className={v.codeLabel()}>
						{codeLabel}
					</EmailText>
					<EmailCode code={code} />
				</Section>
			) : null}
			<Section className={v.fallback()}>
				<EmailFallbackLink href={verifyUrl} label={fallbackLabel} align="left" />
			</Section>
			<EmailDivider spacing="lg" />
			<EmailText tone="muted" size="sm">
				<strong>{noticeTitle}.</strong> {ignoreText}
			</EmailText>
			{helpItems.length > 0 ? (
				<>
					<Section className={v.helpHeading()}>
						<EmailHeading size="default">{helpTitle}</EmailHeading>
					</Section>
					<Section className={v.helpList()}>
						<EmailList items={helpItems} marker="dot" />
					</Section>
				</>
			) : null}
		</EmailShell>
	);
}
