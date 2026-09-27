<script lang="ts">
import { Section } from "@better-svelte-email/components";
import EmailButton from "../email-kit/email-button.svelte";
import EmailCode from "../email-kit/email-code.svelte";
import EmailDivider from "../email-kit/email-divider.svelte";
import EmailFallbackLink from "../email-kit/email-fallback-link.svelte";
import EmailFooter, { type EmailFooterLink } from "../email-kit/email-footer.svelte";
import EmailHeader from "../email-kit/email-header.svelte";
import EmailHeading from "../email-kit/email-heading.svelte";
import EmailList, { type EmailListItem } from "../email-kit/email-list.svelte";
import EmailPanel from "../email-kit/email-panel.svelte";
import EmailShell from "../email-kit/email-shell.svelte";
import EmailText from "../email-kit/email-text.svelte";
import {
	type EmailShellAccent,
	type EmailShellSurface,
	emailLayout,
} from "../email-kit/variants";
import { type EmailVerifyDesign, emailVerify } from "./variants";

let {
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
}: {
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
} = $props();

const s = emailLayout();
const v = $derived(emailVerify({ design }));
const centered = $derived(design === "centered");
</script>

{#snippet footerBlock()}
	<EmailFooter lines={companyLines} links={footerLinks} {reason} layout={centered ? "band" : "plain"} />
{/snippet}

<EmailShell {preview} {surface} {accent}>
	{#snippet footer()}{#if !centered}{@render footerBlock()}{/if}{/snippet}
	{#snippet cardFooter()}{#if centered}{@render footerBlock()}{/if}{/snippet}
	<EmailHeader brand={productName} logo={logoUrl} align={centered ? "center" : "left"} />
	<EmailHeading align={centered ? "center" : "left"}>{heading}</EmailHeading>
	{#if centered}
		<EmailText tone="muted" class={v.subheading()}>{subheading}</EmailText>
	{/if}
	<EmailText tone={centered ? "default" : "muted"} class={v.intro()}>{intro}</EmailText>
	<Section class={v.action()}>
		<EmailButton href={verifyUrl}>{actionLabel}</EmailButton>
	</Section>
	{#if code}
		<Section class={s.section()}>
			<EmailText tone="muted" size="sm" class={s.label()}>{codeLabel}</EmailText>
			<EmailCode {code} />
		</Section>
	{/if}
	{#if centered}
		<Section class={v.fallback()}>
			<EmailFallbackLink href={verifyUrl} label={fallbackLabel} align="center" />
		</Section>
		<Section class={v.notice()}>
			<EmailPanel>
				<EmailText class={s.sectionTitle()}>{noticeTitle}</EmailText>
				<EmailText size="sm">{ignoreText}</EmailText>
			</EmailPanel>
		</Section>
		{#if helpItems.length > 0}
			<EmailDivider spacing="lg" />
			<EmailHeading size="md">{helpTitle}</EmailHeading>
			<Section class={v.helpList()}>
				<EmailList items={helpItems} marker="dot" />
			</Section>
		{/if}
	{:else}
		<EmailDivider spacing="lg" />
		<EmailFallbackLink href={verifyUrl} label={fallbackLabel} />
		<EmailText tone="muted" size="sm" class={s.closing()}>{ignoreText}</EmailText>
	{/if}
</EmailShell>
