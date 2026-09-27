import { Link, Section } from "react-email";
import {
	EmailBadge,
	EmailButton,
	EmailDivider,
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
import {
	EMAIL_RECEIPT_LABELS,
	type EmailReceiptDesign,
	type EmailReceiptLabels,
	emailReceipt,
} from "./variants";

export type { EmailReceiptDesign, EmailReceiptLabels };

export interface EmailReceiptProps {
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
}

/** A payment receipt: status, reference details, line items, total and billing contact. */
export function EmailReceipt({
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
}: EmailReceiptProps) {
	const s = emailLayout();
	const r = emailReceipt({ design });
	const summary = design === "summary";
	const labels = { ...EMAIL_RECEIPT_LABELS, ...labelOverrides };
	const footer = (
		<EmailFooter
			lines={companyLines}
			links={footerLinks}
			reason={reason}
			brand={productName}
			layout={summary ? "bar" : "plain"}
		/>
	);
	const details = (
		<EmailKeyValue
			density="compact"
			rows={[
				{ label: labels.receipt, value: receiptNumber },
				{ label: labels.date, value: date },
				{ label: labels.paymentMethod, value: paymentMethod },
			]}
		/>
	);
	const lineItems = (
		<EmailKeyValue
			rows={[...items, ...adjustments]}
			total={{ label: labels.total, value: total }}
		/>
	);
	return (
		<EmailShell
			preview={preview}
			surface={surface}
			accent={accent}
			footer={summary ? undefined : footer}
			cardFooter={summary ? footer : undefined}
		>
			<EmailHeader brand={productName} logo={logoUrl} />
			<Section className={s.badge()}>
				<EmailBadge tone="success">{labels.status}</EmailBadge>
			</Section>
			<EmailHeading size={summary ? "display" : "lg"}>{heading}</EmailHeading>
			<EmailText tone="muted" className={s.intro()}>
				{intro}
			</EmailText>
			{summary ? (
				<>
					<Section className={r.summary()}>
						<EmailPanel>
							<EmailText className={s.sectionTitle()}>{labels.items}</EmailText>
							{lineItems}
						</EmailPanel>
					</Section>
					<Section className={r.details()}>{details}</Section>
				</>
			) : (
				<>
					<Section className={s.section()}>{details}</Section>
					<EmailDivider />
					<EmailText className={s.sectionTitle()}>{labels.items}</EmailText>
					{lineItems}
				</>
			)}
			{billingLines.length > 0 ? (
				<Section className={s.section()}>
					<EmailText className={s.sectionTitle()}>{labels.billedTo}</EmailText>
					{billingLines.map((line) => (
						<EmailText key={line} tone="muted" size="sm">
							{line}
						</EmailText>
					))}
				</Section>
			) : null}
			{invoiceUrl ? (
				<Section className={s.action()}>
					<EmailButton
						href={invoiceUrl}
						variant={summary ? "primary" : "secondary"}
						shape={summary ? "pill" : "rounded"}
					>
						{actionLabel}
					</EmailButton>
				</Section>
			) : null}
			{billingEmail ? (
				<>
					<EmailDivider spacing="lg" />
					<EmailText tone="muted" size="sm">
						{helpLabel}{" "}
						<Link href={`mailto:${billingEmail}`} className={s.inlineLink()}>
							{billingEmail}
						</Link>
						.
					</EmailText>
				</>
			) : null}
		</EmailShell>
	);
}
