<script lang="ts">
import { Link, Section } from "@better-svelte-email/components";
import EmailBadge from "../email-kit/email-badge.svelte";
import EmailButton from "../email-kit/email-button.svelte";
import EmailDivider from "../email-kit/email-divider.svelte";
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
import {
	EMAIL_RECEIPT_LABELS,
	type EmailReceiptDesign,
	type EmailReceiptLabels,
	emailReceipt,
} from "./variants";

let {
	productName,
	receiptNumber,
	date,
	items,
	total,
	paymentMethod,
	companyLines,
	adjustments = [],
	billingLines = [],
	invoiceUrl,
	billingEmail,
	logoUrl,
	footerLinks,
	reason,
	preview = `Receipt ${receiptNumber} from ${productName}: ${total} paid on ${date}.`,
	heading = `Receipt from ${productName}`,
	intro = "Thanks for your payment. Keep this email for your records.",
	actionLabel = "Download invoice",
	helpLabel = "Questions about this charge? Write to",
	labels: labelOverrides,
	design = "classic",
	surface = "card",
	accent = "none",
}: {
	productName: string;
	receiptNumber: string;
	/** Pre-formatted, so the email never guesses a locale. */
	date: string;
	/** What was charged, amounts pre-formatted with currency, e.g. "$24.00". */
	items: EmailKeyValueRow[];
	/** Pre-formatted grand total. */
	total: string;
	/** E.g. "Visa ending 4242"; never the full card number. */
	paymentMethod: string;
	/** Sender name and postal address, one line each. */
	companyLines: string[];
	/** Rows between items and total, e.g. subtotal, discount, tax. */
	adjustments?: EmailKeyValueRow[];
	/** Billing name and address, one line each. */
	billingLines?: string[];
	/** Link to a PDF invoice or billing page. */
	invoiceUrl?: string;
	/** Address for questions about the charge. */
	billingEmail?: string;
	/** Absolute URL, about 32px tall. Falls back to the product name as text. */
	logoUrl?: string;
	footerLinks?: EmailFooterLink[];
	reason?: string;
	preview?: string;
	heading?: string;
	intro?: string;
	actionLabel?: string;
	helpLabel?: string;
	labels?: Partial<EmailReceiptLabels>;
	/** `classic` lists everything in rows; `summary` leads with a display headline and a tinted items panel. */
	design?: EmailReceiptDesign;
	surface?: EmailShellSurface;
	accent?: EmailShellAccent;
} = $props();

const s = emailLayout();
const r = $derived(emailReceipt({ design }));
const summary = $derived(design === "summary");
const labels = $derived({ ...EMAIL_RECEIPT_LABELS, ...labelOverrides });
</script>

{#snippet plainFooter()}
	<EmailFooter lines={companyLines} links={footerLinks} {reason} brand={productName} layout="plain" />
{/snippet}
{#snippet barFooter()}
	<EmailFooter lines={companyLines} links={footerLinks} {reason} brand={productName} layout="bar" />
{/snippet}
{#snippet details()}
	<EmailKeyValue
		density="compact"
		rows={[
			{ label: labels.receipt, value: receiptNumber },
			{ label: labels.date, value: date },
			{ label: labels.paymentMethod, value: paymentMethod },
		]}
	/>
{/snippet}
{#snippet lineItems()}
	<EmailKeyValue rows={[...items, ...adjustments]} total={{ label: labels.total, value: total }} />
{/snippet}

<EmailShell {preview} {surface} {accent}>
	{#snippet footer()}{#if !summary}{@render plainFooter()}{/if}{/snippet}
	{#snippet cardFooter()}{#if summary}{@render barFooter()}{/if}{/snippet}
	<EmailHeader brand={productName} logo={logoUrl} />
	<Section class={s.badge()}>
		<EmailBadge tone="success">{labels.status}</EmailBadge>
	</Section>
	<EmailHeading size={summary ? "display" : "lg"}>{heading}</EmailHeading>
	<EmailText tone="muted" class={s.intro()}>{intro}</EmailText>
	{#if summary}
		<Section class={r.summary()}>
			<EmailPanel>
				<EmailText class={s.sectionTitle()}>{labels.items}</EmailText>
				{@render lineItems()}
			</EmailPanel>
		</Section>
		<Section class={r.details()}>{@render details()}</Section>
	{:else}
		<Section class={s.section()}>{@render details()}</Section>
		<EmailDivider />
		<EmailText class={s.sectionTitle()}>{labels.items}</EmailText>
		{@render lineItems()}
	{/if}
	{#if billingLines.length > 0}
		<Section class={s.section()}>
			<EmailText class={s.sectionTitle()}>{labels.billedTo}</EmailText>
			{#each billingLines as line (line)}
				<EmailText tone="muted" size="sm">{line}</EmailText>
			{/each}
		</Section>
	{/if}
	{#if invoiceUrl}
		<Section class={s.action()}>
			<EmailButton
				href={invoiceUrl}
				variant={summary ? "primary" : "secondary"}
				shape={summary ? "pill" : "rounded"}
			>{actionLabel}</EmailButton>
		</Section>
	{/if}
	{#if billingEmail}
		<EmailDivider spacing="lg" />
		<EmailText tone="muted" size="sm">
			{helpLabel}
			<Link href={`mailto:${billingEmail}`} class={s.inlineLink()}>{billingEmail}</Link>.
		</EmailText>
	{/if}
</EmailShell>
