import { Section } from "react-email";
import {
	EmailButton,
	EmailCode,
	EmailDivider,
	EmailFooter,
	type EmailFooterLink,
	EmailHeader,
	EmailHeading,
	EmailKeyValue,
	type EmailKeyValueRow,
	EmailShell,
	type EmailShellSurface,
	EmailText,
} from "../../email-kit/react/email-kit";
import { emailLayout } from "../../email-kit/variants";
import { emailMagicLink } from "../variants";

export interface EmailMagicLinkProps {
	productName: string;
	/** One-time sign-in link. */
	signInUrl: string;
	/** Pre-formatted lifetime, e.g. "10 minutes". */
	expiresIn: string;
	/** Sender name and postal address, one line each. */
	companyLines: string[];
	/** One-time code; when set it leads and the button becomes the alternative. */
	code?: string;
	/** Where the request came from, e.g. device, location, time; helps spot a stranger's attempt. */
	requestDetails?: EmailKeyValueRow[];
	/** Absolute PNG URL of a square mark, set beside the product name in header and footer. */
	logoUrl?: string;
	footerLinks?: EmailFooterLink[];
	reason?: string;
	preview?: string;
	heading?: string;
	intro?: string;
	actionLabel?: string;
	codeLabel?: string;
	expiryText?: string;
	detailsTitle?: string;
	warningTitle?: string;
	warningText?: string;
	surface?: Exclude<EmailShellSurface, "stacked">;
}

/** Passwordless sign-in, centred around the code in an accent panel. */
export function EmailMagicLink({
	productName,
	signInUrl,
	expiresIn,
	companyLines,
	code,
	requestDetails = [],
	logoUrl,
	footerLinks,
	reason,
	preview = code
		? `Your ${productName} sign-in code is ${code}.`
		: `Your ${productName} sign-in link is inside.`,
	heading = `Sign in to ${productName}`,
	intro = code
		? "Enter this code to finish signing in, or use the button below."
		: "Use the button below to sign in. The link works once.",
	actionLabel = `Sign in to ${productName}`,
	codeLabel = "Your sign-in code",
	expiryText = `This ${code ? "code" : "link"} expires in ${expiresIn}.`,
	detailsTitle = "Request details",
	warningTitle = "Didn't try to sign in?",
	warningText = "You can safely ignore this email. Nobody can sign in without it.",
	surface = "plain",
}: EmailMagicLinkProps) {
	const s = emailLayout();
	const m = emailMagicLink();
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
					layout="row"
					align="left"
				/>
			}
		>
			<EmailHeader brand={productName} logo={logoUrl} align="left" />
			<EmailHeading align="left">{heading}</EmailHeading>
			<EmailText tone="muted" className={m.intro()}>
				{intro}
			</EmailText>
			{code ? (
				<Section className={m.code()}>
					<EmailCode code={code} />
					<EmailText tone="muted" size="sm" className={m.codeLabel()}>
						{codeLabel}
					</EmailText>
				</Section>
			) : null}
			<Section className={s.action()}>
				<EmailButton href={signInUrl} variant={code ? "secondary" : "primary"}>
					{actionLabel}
				</EmailButton>
			</Section>
			<EmailText tone="muted" size="sm" className={m.expiry()}>
				{expiryText}
			</EmailText>
			<EmailDivider spacing="lg" />
			{requestDetails.length > 0 ? (
				<Section>
					<EmailText className={s.sectionTitle()}>{detailsTitle}</EmailText>
					<EmailKeyValue rows={requestDetails} density="compact" />
				</Section>
			) : null}
			<EmailText
				tone="muted"
				size="sm"
				className={requestDetails.length > 0 ? m.warning() : undefined}
			>
				<strong>{warningTitle}</strong> {warningText}
			</EmailText>
		</EmailShell>
	);
}
