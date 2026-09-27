<script lang="ts">
import { Link, Section } from "@better-svelte-email/components";
import EmailButton from "../email-kit/email-button.svelte";
import EmailCallout from "../email-kit/email-callout.svelte";
import EmailDivider from "../email-kit/email-divider.svelte";
import EmailFallbackLink from "../email-kit/email-fallback-link.svelte";
import EmailFooter, { type EmailFooterLink } from "../email-kit/email-footer.svelte";
import EmailHeader from "../email-kit/email-header.svelte";
import EmailHeading from "../email-kit/email-heading.svelte";
import EmailHero from "../email-kit/email-hero.svelte";
import EmailKeyValue, {
	type EmailKeyValueRow,
} from "../email-kit/email-key-value.svelte";
import EmailShell from "../email-kit/email-shell.svelte";
import EmailText from "../email-kit/email-text.svelte";
import {
	type EmailShellAccent,
	type EmailShellSurface,
	emailLayout,
} from "../email-kit/variants";
import { type EmailPasswordResetDesign, emailPasswordReset } from "./variants";

let {
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
}: {
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
} = $props();

const s = emailLayout();
const r = $derived(emailPasswordReset({ design }));
const hero = $derived(design === "hero");
</script>

{#snippet plainFooter()}
	<EmailFooter lines={companyLines} links={footerLinks} {reason} layout="plain" />
{/snippet}
{#snippet bandFooter()}
	<EmailFooter lines={companyLines} links={footerLinks} {reason} layout="band" />
{/snippet}
{#snippet securityLink()}{#if securityUrl}{" "}<Link href={securityUrl} class={s.inlineLink()}>{securityLabel}</Link>.{/if}{/snippet}

<EmailShell {preview} {surface} {accent}>
	{#snippet footer()}{#if !hero}{@render plainFooter()}{/if}{/snippet}
	{#snippet cardFooter()}{#if hero}{@render bandFooter()}{/if}{/snippet}
	{#if hero}
		<EmailHero eyebrow={productName} meta={requestedAt} title={heading} text={intro} tone="accent" />
		<EmailText class={r.prompt()}>{prompt}</EmailText>
	{:else}
		<EmailHeader brand={productName} logo={logoUrl} />
		<EmailHeading>{heading}</EmailHeading>
		<EmailText tone="muted" class={s.intro()}>{intro}</EmailText>
	{/if}
	<Section class={r.action()}>
		<EmailButton href={resetUrl} size={hero ? "lg" : "md"} width={hero ? "full" : "auto"}>{actionLabel}</EmailButton>
	</Section>
	<EmailText tone="muted" size="sm" class={r.reassurance()}>
		{hero ? `${expiryText} ${warningTitle} ${warningText}` : expiryText}{#if hero}{@render securityLink()}{/if}
	</EmailText>
	{#if requestDetails.length > 0}
		<Section class={s.section()}>
			<EmailText class={s.sectionTitle()}>{detailsTitle}</EmailText>
			<EmailKeyValue rows={requestDetails} density="compact" />
		</Section>
	{/if}
	{#if !hero}
		<Section class={s.section()}>
			<EmailCallout tone="warning" title={warningTitle}>
				<EmailText size="sm">{warningText}{@render securityLink()}</EmailText>
			</EmailCallout>
		</Section>
	{/if}
	<EmailDivider spacing="lg" />
	<EmailFallbackLink href={resetUrl} label={fallbackLabel} />
</EmailShell>
