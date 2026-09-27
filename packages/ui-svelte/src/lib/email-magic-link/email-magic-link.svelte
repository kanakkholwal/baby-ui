<script lang="ts">
import { Section } from "@better-svelte-email/components";
import EmailButton from "../email-kit/email-button.svelte";
import EmailCallout from "../email-kit/email-callout.svelte";
import EmailCode from "../email-kit/email-code.svelte";
import EmailFooter, { type EmailFooterLink } from "../email-kit/email-footer.svelte";
import EmailHeader from "../email-kit/email-header.svelte";
import EmailHeading from "../email-kit/email-heading.svelte";
import EmailKeyValue, {
	type EmailKeyValueRow,
} from "../email-kit/email-key-value.svelte";
import EmailPanel from "../email-kit/email-panel.svelte";
import EmailShell from "../email-kit/email-shell.svelte";
import EmailText from "../email-kit/email-text.svelte";
import {
	type EmailShellAccent,
	type EmailShellSurface,
	emailLayout,
} from "../email-kit/variants";
import { type EmailMagicLinkDesign, emailMagicLink } from "./variants";

let {
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
}: {
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
} = $props();

const s = emailLayout();
const m = $derived(emailMagicLink({ design }));
const spotlight = $derived(design === "spotlight");
</script>

{#snippet footerBlock()}
	<EmailFooter
		lines={companyLines}
		links={footerLinks}
		{reason}
		layout={spotlight ? "row" : "plain"}
		align={spotlight ? "left" : "center"}
	/>
{/snippet}

{#snippet details()}
	<EmailText class={s.sectionTitle()}>{detailsTitle}</EmailText>
	<EmailKeyValue rows={requestDetails} density="compact" />
{/snippet}

<EmailShell {preview} {surface} {accent}>
	{#snippet footer()}{#if !spotlight}{@render footerBlock()}{/if}{/snippet}
	{#snippet cardFooter()}{#if spotlight}{@render footerBlock()}{/if}{/snippet}
	<EmailHeader brand={productName} logo={logoUrl} align={spotlight ? "center" : "left"} />
	<EmailHeading align={spotlight ? "center" : "left"}>{heading}</EmailHeading>
	<EmailText tone="muted" class={m.intro()}>{intro}</EmailText>
	{#if code}
		<Section class={s.section()}>
			{#if spotlight}
				<EmailPanel tone="accent">
					<EmailText class={m.codeLabel()}>{codeLabel}</EmailText>
					<EmailCode {code} />
				</EmailPanel>
			{:else}
				<EmailCode {code} />
			{/if}
		</Section>
	{/if}
	<Section class={s.action()}>
		<EmailButton
			href={signInUrl}
			variant={code ? "secondary" : "primary"}
			width={spotlight ? "full" : "auto"}
		>
			{actionLabel}
		</EmailButton>
	</Section>
	<EmailText tone="muted" size="sm" class={m.expiry()}>{expiryText}</EmailText>
	{#if requestDetails.length > 0}
		<Section class={s.section()}>
			{#if spotlight}
				<EmailPanel tone="outline">{@render details()}</EmailPanel>
			{:else}
				{@render details()}
			{/if}
		</Section>
	{/if}
	<Section class={s.section()}>
		<EmailCallout tone="warning" title={warningTitle}>
			<EmailText size="sm">{warningText}</EmailText>
		</EmailCallout>
	</Section>
</EmailShell>
