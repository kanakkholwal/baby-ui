<script lang="ts">
import { Column, Img, Row, Section, Text } from "@better-svelte-email/components";
import EmailBadge from "../email-kit/email-badge.svelte";
import EmailButton from "../email-kit/email-button.svelte";
import EmailCallout from "../email-kit/email-callout.svelte";
import EmailDivider from "../email-kit/email-divider.svelte";
import EmailFallbackLink from "../email-kit/email-fallback-link.svelte";
import EmailFooter, { type EmailFooterLink } from "../email-kit/email-footer.svelte";
import EmailHeader from "../email-kit/email-header.svelte";
import EmailHeading from "../email-kit/email-heading.svelte";
import EmailPanel from "../email-kit/email-panel.svelte";
import EmailShell from "../email-kit/email-shell.svelte";
import EmailText from "../email-kit/email-text.svelte";
import {
	type EmailShellAccent,
	type EmailShellSurface,
	emailLayout,
} from "../email-kit/variants";
import { type EmailTeamInviteDesign, emailTeamInvite, initials } from "./variants";

let {
	productName,
	inviterName,
	teamName,
	acceptUrl,
	companyLines,
	inviterEmail,
	inviterAvatarUrl,
	role,
	message,
	expiresIn,
	logoUrl,
	footerLinks,
	reason,
	preview = `${inviterName} invited you to join ${teamName} on ${productName}.`,
	heading,
	intro = `${inviterName} invited you to collaborate${role ? ` as ${role}` : ""}.`,
	lead = `${inviterName} invited you to join`,
	actionLabel = "Accept invitation",
	closingText = `${expiresIn ? `This invitation expires in ${expiresIn}. ` : ""}If you weren't expecting it, you can ignore this email.`,
	fallbackLabel,
	design = "classic",
	surface = "card",
	accent = "none",
}: {
	productName: string;
	inviterName: string;
	teamName: string;
	/** One-time link that joins the team. */
	acceptUrl: string;
	/** Sender name and postal address, one line each. */
	companyLines: string[];
	inviterEmail?: string;
	/** Absolute URL of the inviter's photo; initials show without it. */
	inviterAvatarUrl?: string;
	/** Role the invitee joins with, e.g. "Editor". */
	role?: string;
	/** A personal note from the inviter, shown quoted. */
	message?: string;
	/** Pre-formatted lifetime, e.g. "7 days". */
	expiresIn?: string;
	/** Absolute URL, about 32px tall. Falls back to the product name as text. */
	logoUrl?: string;
	footerLinks?: EmailFooterLink[];
	reason?: string;
	preview?: string;
	/** Defaults to `Join {teamName} on {productName}`, or the team name in `spotlight`. */
	heading?: string;
	intro?: string;
	/** Line above the team name in `spotlight`. */
	lead?: string;
	actionLabel?: string;
	closingText?: string;
	fallbackLabel?: string;
	/** `classic` is a left-aligned card; `spotlight` centres a large avatar and the team name. */
	design?: EmailTeamInviteDesign;
	surface?: EmailShellSurface;
	accent?: EmailShellAccent;
} = $props();

const s = emailLayout();
const t = $derived(emailTeamInvite({ design }));
const avatarSize = $derived(design === "spotlight" ? "64" : "40");
</script>

{#snippet avatar()}
	{#if inviterAvatarUrl}
		<Img src={inviterAvatarUrl} alt={inviterName} width={avatarSize} height={avatarSize} class={t.avatar()} />
	{:else}
		<Text class={t.initials()}>{initials(inviterName)}</Text>
	{/if}
{/snippet}

{#snippet plainFooter()}
	<EmailFooter lines={companyLines} links={footerLinks} {reason} />
{/snippet}

{#snippet bandFooter()}
	<EmailFooter lines={companyLines} links={footerLinks} {reason} layout="band" />
{/snippet}

{#if design === "spotlight"}
	<EmailShell {preview} {surface} {accent}>
		{#snippet cardFooter()}{@render bandFooter()}{/snippet}
		<EmailHeader brand={productName} logo={logoUrl} align="center" />
		{@render avatar()}
		<Text class={t.lead()}>{lead}</Text>
		<EmailHeading size="display" align="center">{heading ?? teamName}</EmailHeading>
		{#if role}
			<Section class={t.role()}>
				<EmailBadge tone="accent">{role}</EmailBadge>
			</Section>
		{/if}
		{#if message}
			<Section class={s.section()}>
				<EmailPanel>
					<EmailText>“{message}”</EmailText>
					<Text class={t.signoff()}>{inviterName}{inviterEmail ? `, ${inviterEmail}` : ""}</Text>
				</EmailPanel>
			</Section>
		{/if}
		<Section class={s.action()}>
			<EmailButton href={acceptUrl} size="lg" shape="pill" width="full">{actionLabel}</EmailButton>
		</Section>
		<EmailText tone="muted" size="sm" class={t.closing()}>{closingText}</EmailText>
		<EmailDivider spacing="lg" />
		<EmailFallbackLink href={acceptUrl} label={fallbackLabel} align="center" />
	</EmailShell>
{:else}
	<EmailShell {preview} {surface} {accent}>
		{#snippet footer()}{@render plainFooter()}{/snippet}
		<EmailHeader brand={productName} logo={logoUrl} />
		<EmailHeading>{heading ?? `Join ${teamName} on ${productName}`}</EmailHeading>
		<EmailText tone="muted" class={s.intro()}>{intro}</EmailText>
		<Section class={s.section()}>
			<Row>
				<Column class={t.avatarCell()}>{@render avatar()}</Column>
				<Column>
					<Text class={t.name()}>{inviterName}</Text>
					{#if inviterEmail}<Text class={t.email()}>{inviterEmail}</Text>{/if}
				</Column>
			</Row>
		</Section>
		{#if message}
			<Section class={s.section()}>
				<EmailCallout>
					<EmailText size="sm">“{message}”</EmailText>
				</EmailCallout>
			</Section>
		{/if}
		<Section class={s.action()}>
			<EmailButton href={acceptUrl}>{actionLabel}</EmailButton>
		</Section>
		<EmailText tone="muted" size="sm" class={t.closing()}>{closingText}</EmailText>
		<EmailDivider spacing="lg" />
		<EmailFallbackLink href={acceptUrl} label={fallbackLabel} />
	</EmailShell>
{/if}
