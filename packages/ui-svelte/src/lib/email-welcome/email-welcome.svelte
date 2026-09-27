<script lang="ts">
import { Column, Img, Link, Row, Section, Text } from "@better-svelte-email/components";
import EmailButton from "../email-kit/email-button.svelte";
import EmailDivider from "../email-kit/email-divider.svelte";
import EmailFooter, { type EmailFooterLink } from "../email-kit/email-footer.svelte";
import EmailHeader from "../email-kit/email-header.svelte";
import EmailHeading from "../email-kit/email-heading.svelte";
import EmailSection from "../email-kit/email-section.svelte";
import EmailShell from "../email-kit/email-shell.svelte";
import EmailText from "../email-kit/email-text.svelte";
import type { EmailShellAccent, EmailShellSurface } from "../email-kit/variants";
import {
	type EmailWelcomeDensity,
	type EmailWelcomeDesign,
	emailWelcome,
} from "./variants";

export interface EmailWelcomeStep {
	title: string;
	description: string;
}

let {
	productName,
	actionUrl,
	steps,
	companyLines,
	recipientName,
	logoUrl,
	heroImageUrl,
	heroImageAlt,
	actionLabel = "Get started",
	supportEmail,
	supportLabel = "Questions? Reply to this email or write to",
	footerLinks,
	preview = `Your ${productName} account is ready. Here is how to get started.`,
	eyebrow = "Thanks for joining",
	heading = recipientName ? `Welcome, ${recipientName}` : `Welcome to ${productName}`,
	intro = `Your ${productName} account is ready. A few things worth doing first:`,
	stepsTitle = "Getting started",
	reason,
	design = "classic",
	surface = "card",
	accent = "none",
	density = "comfortable",
}: {
	productName: string;
	/** Where the button lands: usually the dashboard or the first setup screen. */
	actionUrl: string;
	/** Two to four first actions; an empty list hides the section. */
	steps: EmailWelcomeStep[];
	/** Sender name and postal address, one line each. */
	companyLines: string[];
	recipientName?: string;
	/** Absolute URL, about 32px tall. Falls back to the product name as text. */
	logoUrl?: string;
	/** Absolute URL of a wide illustration or product shot for the `stacked` design. */
	heroImageUrl?: string;
	heroImageAlt?: string;
	actionLabel?: string;
	/** Shown as a mailto link in the help line; omit to hide the line. */
	supportEmail?: string;
	/** Lead-in before the support address. */
	supportLabel?: string;
	footerLinks?: EmailFooterLink[];
	preview?: string;
	/** Small line above the heading in the `stacked` design. */
	eyebrow?: string;
	heading?: string;
	intro?: string;
	stepsTitle?: string;
	/** Footer line saying why this arrived, e.g. "You're receiving this because you signed up". */
	reason?: string;
	/** `classic` is one card; `stacked` splits the email into cards with a centred, image-led opener. */
	design?: EmailWelcomeDesign;
	surface?: EmailShellSurface;
	accent?: EmailShellAccent;
	density?: EmailWelcomeDensity;
} = $props();

const s = $derived(emailWelcome({ design, density }));
const stacked = $derived(design === "stacked");
</script>

{#snippet stepList()}
	<Section class={s.steps()}>
		{#each steps as step, i (step.title)}
			<Row>
				<Column class={s.stepIndex()}>
					<Text class={s.stepBadge()}>{i + 1}</Text>
				</Column>
				<Column>
					<Text class={s.stepTitle()}>{step.title}</Text>
					<Text class={s.stepBody()}>{step.description}</Text>
				</Column>
			</Row>
		{/each}
	</Section>
{/snippet}

{#snippet help()}
	<EmailText tone="muted" size="sm">
		{supportLabel}
		<Link href={`mailto:${supportEmail}`} class={s.helpLink()}>{supportEmail}</Link>.
	</EmailText>
{/snippet}

{#snippet footerBlock()}
	<EmailFooter lines={companyLines} links={footerLinks} {reason} />
{/snippet}

{#if stacked}
	<EmailShell {preview} surface="stacked" {accent}>
		{#snippet footer()}{@render footerBlock()}{/snippet}
		<EmailSection align="center">
			<EmailHeader brand={productName} logo={logoUrl} align="center" />
			{#if heroImageUrl}
				<Img src={heroImageUrl} alt={heroImageAlt ?? productName} width="432" height="auto" class={s.heroImage()} />
			{/if}
			<EmailText class={s.eyebrow()}>{eyebrow}</EmailText>
			<EmailHeading size="display" align="center">{heading}</EmailHeading>
			<EmailText tone="muted" class={s.intro()}>{intro}</EmailText>
			<Section class={s.action()}>
				<EmailButton href={actionUrl} size="lg" shape="pill">{actionLabel}</EmailButton>
			</Section>
		</EmailSection>
		{#if steps.length > 0}
			<EmailSection>
				<EmailHeading size="md">{stepsTitle}</EmailHeading>
				{@render stepList()}
			</EmailSection>
		{/if}
		{#if supportEmail}
			<EmailSection>{@render help()}</EmailSection>
		{/if}
	</EmailShell>
{:else}
	<EmailShell {preview} {surface} {accent}>
		{#snippet footer()}{@render footerBlock()}{/snippet}
		<EmailHeader brand={productName} logo={logoUrl} />
		<EmailHeading>{heading}</EmailHeading>
		<EmailText tone="muted" class={s.intro()}>{intro}</EmailText>
		{#if steps.length > 0}{@render stepList()}{/if}
		<Section class={s.action()}>
			<EmailButton href={actionUrl}>{actionLabel}</EmailButton>
		</Section>
		{#if supportEmail}
			<EmailDivider spacing="lg" />
			{@render help()}
		{/if}
	</EmailShell>
{/if}
