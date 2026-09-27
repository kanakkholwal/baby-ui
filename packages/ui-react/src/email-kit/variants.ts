import { tv, type VariantProps } from "tailwind-variants";

// Every colour pairs with its `-dark` twin: inboxes that honour prefers-color-scheme swap them.
// React Email copies Body styles onto an inner td minus its classes, so colour lives on `page`.
export const emailShell = tv({
	slots: {
		body: "m-0 font-sans",
		page: "bg-card py-10 dark:bg-card-dark",
		container: "mx-auto w-full px-4",
		card: "rounded-lg border border-border border-solid bg-background px-8 py-9 dark:border-border-dark dark:bg-background-dark",
	},
	variants: {
		width: {
			md: { container: "max-w-[560px]" },
			lg: { container: "max-w-[600px]" },
		},
		surface: {
			card: {},
			plain: {
				page: "bg-background dark:bg-background-dark",
				card: "rounded-none border-0 bg-transparent px-0 dark:bg-transparent",
			},
		},
	},
	defaultVariants: { width: "md", surface: "card" },
});

export const emailHeader = tv({
	slots: {
		root: "mb-8",
		logo: "h-8 w-auto",
		brand:
			"m-0 font-semibold text-[15px] text-foreground leading-[24px] dark:text-foreground-dark",
	},
	variants: {
		align: {
			left: { root: "text-left" },
			center: { root: "text-center" },
		},
	},
	defaultVariants: { align: "left" },
});

export const emailHeading = tv({
	base: "m-0 font-semibold text-foreground tracking-[-0.01em] dark:text-foreground-dark",
	variants: {
		size: {
			md: "text-[20px] leading-[28px]",
			lg: "text-[24px] leading-[32px]",
		},
	},
	defaultVariants: { size: "lg" },
});

export const emailText = tv({
	base: "m-0",
	variants: {
		tone: {
			default: "text-foreground dark:text-foreground-dark",
			muted: "text-muted-foreground dark:text-muted-foreground-dark",
		},
		size: {
			sm: "text-[13px] leading-[20px]",
			md: "text-[15px] leading-[24px]",
		},
	},
	defaultVariants: { tone: "default", size: "md" },
});

export const emailButton = tv({
	base: "rounded font-semibold no-underline",
	variants: {
		variant: {
			primary:
				"bg-primary text-primary-foreground dark:bg-primary-dark dark:text-primary-foreground-dark",
			secondary:
				"border border-border-strong border-solid bg-background text-foreground dark:border-border-strong-dark dark:bg-background-dark dark:text-foreground-dark",
		},
		size: {
			md: "px-5 py-3 text-[14px] leading-[20px]",
			lg: "px-6 py-[14px] text-[15px] leading-[20px]",
		},
	},
	defaultVariants: { variant: "primary", size: "md" },
});

/** Padding the Svelte button also needs as numbers, for its Outlook (MSO) spacer. */
export const EMAIL_BUTTON_PADDING: Record<EmailButtonSize, { x: number; y: number }> = {
	md: { x: 20, y: 12 },
	lg: { x: 24, y: 14 },
};

export const emailCallout = tv({
	base: "rounded px-5 py-4",
	variants: {
		tone: {
			neutral: "bg-card dark:bg-card-dark",
			info: "bg-info-soft dark:bg-info-soft-dark",
			success: "bg-success-soft dark:bg-success-soft-dark",
			warning: "bg-warning-soft dark:bg-warning-soft-dark",
			destructive: "bg-destructive-soft dark:bg-destructive-soft-dark",
		},
	},
	defaultVariants: { tone: "neutral" },
});

export const emailDivider = tv({
	base: "m-0 border-0 border-border border-t border-solid dark:border-border-dark",
	variants: {
		spacing: {
			md: "my-6",
			lg: "my-8",
		},
	},
	defaultVariants: { spacing: "md" },
});

export const emailFooter = tv({
	slots: {
		root: "mt-8 px-8",
		text: "m-0 text-[12px] text-muted-foreground leading-[18px] dark:text-muted-foreground-dark",
		link: "text-muted-foreground underline dark:text-muted-foreground-dark",
	},
	variants: {
		align: {
			left: { root: "text-left" },
			center: { root: "text-center" },
		},
	},
	defaultVariants: { align: "center" },
});

export const emailCode = tv({
	base: "m-0 inline-block rounded bg-card px-6 py-4 font-mono font-semibold text-foreground dark:bg-card-dark dark:text-foreground-dark",
	variants: {
		size: {
			md: "text-[22px] tracking-[4px]",
			lg: "text-[30px] tracking-[8px]",
		},
	},
	defaultVariants: { size: "lg" },
});

export const emailKeyValue = tv({
	slots: {
		label:
			"py-2 text-[14px] text-muted-foreground leading-[20px] dark:text-muted-foreground-dark",
		value:
			"py-2 text-right text-[14px] text-foreground leading-[20px] dark:text-foreground-dark",
		total:
			"border-0 border-border border-t border-solid pt-3 font-semibold dark:border-border-dark",
	},
	variants: {
		density: {
			comfortable: {},
			compact: { label: "py-1", value: "py-1" },
		},
	},
	defaultVariants: { density: "comfortable" },
});

export type EmailShellWidth = NonNullable<VariantProps<typeof emailShell>["width"]>;
export type EmailShellSurface = NonNullable<VariantProps<typeof emailShell>["surface"]>;
export type EmailHeaderAlign = NonNullable<VariantProps<typeof emailHeader>["align"]>;
export type EmailHeadingSize = NonNullable<VariantProps<typeof emailHeading>["size"]>;
export type EmailTextTone = NonNullable<VariantProps<typeof emailText>["tone"]>;
export type EmailTextSize = NonNullable<VariantProps<typeof emailText>["size"]>;
export type EmailButtonVariant = NonNullable<VariantProps<typeof emailButton>["variant"]>;
export type EmailButtonSize = NonNullable<VariantProps<typeof emailButton>["size"]>;
export type EmailCalloutTone = NonNullable<VariantProps<typeof emailCallout>["tone"]>;
export type EmailDividerSpacing = NonNullable<
	VariantProps<typeof emailDivider>["spacing"]
>;
export type EmailFooterAlign = NonNullable<VariantProps<typeof emailFooter>["align"]>;
export type EmailCodeSize = NonNullable<VariantProps<typeof emailCode>["size"]>;
export type EmailKeyValueDensity = NonNullable<
	VariantProps<typeof emailKeyValue>["density"]
>;
