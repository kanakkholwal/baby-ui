import { tv, type VariantProps } from "tailwind-variants";

export const emailReceipt = tv({
	slots: {
		summary: "mt-8",
		details: "mt-8",
	},
	variants: {
		design: {
			classic: {},
			// Order-confirmation style: display headline, items in a tinted panel, brand bar footer.
			summary: { summary: "mt-10" },
		},
	},
	defaultVariants: { design: "classic" },
});

export type EmailReceiptDesign = NonNullable<VariantProps<typeof emailReceipt>["design"]>;

/** Default copy for the receipt's labels; pass `labels` to translate or rename any of them. */
export const EMAIL_RECEIPT_LABELS = {
	status: "Paid",
	receipt: "Receipt number",
	date: "Date paid",
	paymentMethod: "Payment method",
	items: "Summary",
	total: "Total",
	billedTo: "Billed to",
};

export type EmailReceiptLabels = typeof EMAIL_RECEIPT_LABELS;
