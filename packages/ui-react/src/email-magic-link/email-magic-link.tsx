import { Section } from "react-email";
import {
	EmailButton,
	EmailCallout,
	EmailCode,
	EmailFooter,
	type EmailFooterLink,
	EmailHeader,
	EmailHeading,
	EmailKeyValue,
	type EmailKeyValueRow,
	EmailPanel,
	EmailShell,
	type EmailShellAccent,
	type EmailShellSurface,
	EmailText,
} from "../email-kit/email-kit";
import { emailLayout } from "../email-kit/variants";
import { type EmailMagicLinkDesign, emailMagicLink } from "./variants";

export type { EmailMagicLinkDesign };

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
	/** Absolute URL, about 32px tall. Falls back to the product name as text. */
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
	/** `classic` is a left-aligned card; `spotlight` centres everything around the code. */
	design?: EmailMagicLinkDesign;
	surface?: EmailShellSurface;
	accent?: EmailShellAccent;
}

/** Passwordless sign-in: a one-time link, an optional code, and who asked for it. */
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
	design = "classic",
	surface = "card",
	accent = "none",
}: EmailMagicLinkProps) {
	const s = emailLayout();
	const m = emailMagicLink({ design });
	const spotlight = design === "spotlight";
	const footer = (
		<EmailFooter
			lines={companyLines}
			links={footerLinks}
			reason={reason}
			layout={spotlight ? "row" : "plain"}
			align={spotlight ? "left" : "center"}
		/>
	);
	const details =
		requestDetails.length > 0 ? (
			<>
				<EmailText className={s.sectionTitle()}>{detailsTitle}</EmailText>
				<EmailKeyValue rows={requestDetails} density="compact" />
			</>
		) : null;
	return (
		<EmailShell
			preview={preview}
			surface={surface}
			accent={accent}
			footer={spotlight ? undefined : footer}
			cardFooter={spotlight ? footer : undefined}
		>
			<EmailHeader
				brand={productName}
				logo={logoUrl}
				align={spotlight ? "center" : "left"}
			/>
			<EmailHeading align={spotlight ? "center" : "left"}>{heading}</EmailHeading>
			<EmailText tone="muted" className={m.intro()}>
				{intro}
			</EmailText>
			{code ? (
				<Section className={s.section()}>
					{spotlight ? (
						<EmailPanel tone="accent">
							<EmailText className={m.codeLabel()}>{codeLabel}</EmailText>
							<EmailCode code={code} />
						</EmailPanel>
					) : (
						<EmailCode code={code} />
					)}
				</Section>
			) : null}
			<Section className={s.action()}>
				<EmailButton
					href={signInUrl}
					variant={code ? "secondary" : "primary"}
					width={spotlight ? "full" : "auto"}
				>
					{actionLabel}
				</EmailButton>
			</Section>
			<EmailText tone="muted" size="sm" className={m.expiry()}>
				{expiryText}
			</EmailText>
			{details ? (
				<Section className={s.section()}>
					{spotlight ? <EmailPanel tone="outline">{details}</EmailPanel> : details}
				</Section>
			) : null}
			<Section className={s.section()}>
				<EmailCallout tone="warning" title={warningTitle}>
					<EmailText size="sm">{warningText}</EmailText>
				</EmailCallout>
			</Section>
		</EmailShell>
	);
}
