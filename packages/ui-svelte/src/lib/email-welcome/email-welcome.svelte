<script lang="ts">
import { Column, Link, Row, Section, Text } from "@better-svelte-email/components";
import EmailButton from "../email-kit/email-button.svelte";
import EmailDivider from "../email-kit/email-divider.svelte";
import EmailFooter, { type EmailFooterLink } from "../email-kit/email-footer.svelte";
import EmailHeader from "../email-kit/email-header.svelte";
import EmailHeading from "../email-kit/email-heading.svelte";
import EmailShell from "../email-kit/email-shell.svelte";
import EmailText from "../email-kit/email-text.svelte";
import type { EmailShellSurface } from "../email-kit/variants";
import { type EmailWelcomeDensity, emailWelcome } from "./variants";

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
	actionLabel = "Get started",
	supportEmail,
	supportLabel = "Questions? Reply to this email or write to",
	footerLinks,
	preview = `Your ${productName} account is ready. Here is how to get started.`,
	heading = recipientName ? `Welcome, ${recipientName}` : `Welcome to ${productName}`,
	intro = `Your ${productName} account is ready. A few things worth doing first:`,
	surface = "card",
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
	actionLabel?: string;
	/** Shown as a mailto link in the help line; omit to hide the line. */
	supportEmail?: string;
	/** Lead-in before the support address. */
	supportLabel?: string;
	footerLinks?: EmailFooterLink[];
	preview?: string;
	heading?: string;
	intro?: string;
	surface?: EmailShellSurface;
	density?: EmailWelcomeDensity;
} = $props();

const s = $derived(emailWelcome({ density }));
</script>

<EmailShell {preview} {surface}>
	<EmailHeader brand={productName} logo={logoUrl} />
	<EmailHeading>{heading}</EmailHeading>
	<EmailText tone="muted" class={s.intro()}>{intro}</EmailText>
	{#if steps.length > 0}
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
	{/if}
	<Section class={s.action()}>
		<EmailButton href={actionUrl}>{actionLabel}</EmailButton>
	</Section>
	{#if supportEmail}
		<EmailDivider spacing="lg" />
		<EmailText tone="muted" size="sm">
			{supportLabel}
			<Link href={`mailto:${supportEmail}`} class={s.helpLink()}>{supportEmail}</Link>.
		</EmailText>
	{/if}
	{#snippet footer()}
		<EmailFooter lines={companyLines} links={footerLinks} />
	{/snippet}
</EmailShell>
