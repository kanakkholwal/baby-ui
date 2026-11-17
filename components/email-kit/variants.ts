import { tv, type VariantProps } from "tailwind-variants";

// Every colour pairs with its `-dark` twin: inboxes that honour prefers-color-scheme swap them.
// React Email copies Body styles onto an inner td minus its classes, so colour lives on `page`.
export const emailShell = tv({
	slots: {
		body: "m-0 font-sans",
		page: "bg-card py-section dark:bg-card-dark",
		// 600px is the width every client lays out without scaling; 12px keeps phones edge-near.
		container: "mx-auto w-full max-w-[600px] px-5",
		// The card has no padding of its own, so a footer band inside it can run edge to edge.
		card: "rounded-card border border-border border-solid bg-background dark:border-border-dark dark:bg-background-dark",
		// 24px, not 32: stacked padding otherwise overflows a 320px phone, and breakpoints are out.
		content: "px-gutter py-stack",
	},
	variants: {
		surface: {
			card: {},
			plain: {
				page: "bg-background py-stack dark:bg-background-dark",
				card: "rounded-none border-0 bg-transparent dark:bg-transparent",
				content: "px-0",
			},
			// Children are EmailSections spaced by the section gap, straight on the page.
			stacked: {
				page: "bg-background py-stack dark:bg-background-dark",
				card: "rounded-none border-0 bg-transparent dark:bg-transparent",
				content: "px-0 py-0",
			},
		},
	},
	defaultVariants: { surface: "plain" },
});

// Mark and name sit inline in one text line, so `align` centres the lockup without nested tables.
export const emailHeader = tv({
	slots: {
		root: "mb-block",
		// A table row, so mark and name share a baseline in every client (Img is display:block).
		row: "w-auto",
		logoCell: "align-middle",
		nameCell: "pl-2 align-middle",
		logo: "block h-6",
		name: "m-0 font-semibold text-[15px] text-foreground leading-[24px] tracking-[-0.01em] dark:text-foreground-dark",
	},
	variants: {
		variant: {
			// `logo` is a full wordmark image, so the name is left out.
			lockup: { logo: "w-6" },
			logo: { logo: "w-auto" },
		},
		align: {
			left: {},
			center: { row: "mx-auto" },
		},
	},
	defaultVariants: { variant: "lockup", align: "left" },
});

export const emailHeading = tv({
	base: "m-0 font-semibold text-foreground tracking-[-0.02em] dark:text-foreground-dark",
	variants: {
		size: {
			default: "text-[18px] leading-[26px]",
			lg: "text-[24px] leading-[32px]",
			display: "text-[30px] leading-[36px] tracking-[-0.025em]",
		},
		align: {
			left: "text-left",
			center: "text-center",
		},
	},
	defaultVariants: { size: "lg", align: "left" },
});

export const emailHero = tv({
	slots: {
		root: "rounded-inner px-pad py-pad",
		eyebrow: "m-0 font-semibold text-[13px] leading-[20px]",
		meta: "m-0 text-right text-[12px] leading-[18px]",
		title: "m-0 mt-2 font-semibold tracking-[-0.02em]",
		text: "m-0 mt-2 text-[15px] leading-[24px]",
		image: "mt-block w-full rounded-inner",
	},
	variants: {
		tone: {
			muted: {
				root: "bg-card dark:bg-card-dark",
				eyebrow: "text-muted-foreground dark:text-muted-foreground-dark",
				meta: "text-muted-foreground dark:text-muted-foreground-dark",
				title: "text-foreground dark:text-foreground-dark",
				text: "text-muted-foreground dark:text-muted-foreground-dark",
			},
			accent: {
				root: "bg-primary-soft dark:bg-primary-soft-dark",
				eyebrow: "text-foreground dark:text-foreground-dark",
				meta: "text-foreground dark:text-foreground-dark",
				title: "text-foreground dark:text-foreground-dark",
				text: "text-foreground dark:text-foreground-dark",
			},
			inverse: {
				root: "bg-foreground dark:bg-foreground-dark",
				eyebrow: "text-background dark:text-background-dark",
				meta: "text-background dark:text-background-dark",
				title: "text-background dark:text-background-dark",
				text: "text-background dark:text-background-dark",
			},
			destructive: {
				root: "bg-destructive-soft dark:bg-destructive-soft-dark",
				eyebrow: "text-foreground dark:text-destructive-dark",
				meta: "text-foreground dark:text-foreground-dark",
				title: "text-foreground dark:text-foreground-dark",
				text: "text-foreground dark:text-foreground-dark",
			},
		},
		size: {
			default: { title: "text-[20px] leading-[28px]" },
			display: { title: "text-[26px] leading-[32px]" },
		},
		align: {
			left: { root: "text-left" },
			center: { root: "text-center" },
		},
	},
	defaultVariants: { tone: "muted", size: "display", align: "left" },
});

export const emailPanel = tv({
	base: "rounded-inner px-pad py-pad",
	variants: {
		tone: {
			muted: "bg-card dark:bg-card-dark",
			accent: "bg-primary-soft dark:bg-primary-soft-dark",
			outline: "border border-border border-solid dark:border-border-dark",
		},
	},
	defaultVariants: { tone: "muted" },
});

export const emailSection = tv({
	// A block of the email: no chrome, spaced by the section gap so proximity groups it.
	base: "mb-section",
	variants: {
		align: {
			left: "text-left",
			center: "text-center",
		},
	},
	defaultVariants: { align: "left" },
});

export const emailList = tv({
	slots: {
		markerCell: "w-[40px] py-2 align-top",
		marker:
			"m-0 h-[26px] w-[26px] rounded-full text-center font-semibold text-[13px] leading-[26px]",
		icon: "h-[20px] w-[20px]",
		title:
			"m-0 pt-[2px] font-semibold text-[14px] text-foreground leading-[22px] dark:text-foreground-dark",
		text: "m-0 text-[14px] text-muted-foreground leading-[22px] dark:text-muted-foreground-dark",
		body: "py-2 align-top",
	},
	variants: {
		marker: {
			number: {
				marker:
					"bg-primary-soft text-foreground dark:bg-primary-soft-dark dark:text-foreground-dark",
			},
			check: {
				marker:
					"bg-success-soft text-foreground dark:bg-success-soft-dark dark:text-success-dark",
			},
			dot: {
				marker: "text-muted-foreground dark:text-muted-foreground-dark",
			},
			icon: {},
		},
	},
	defaultVariants: { marker: "number" },
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
			default: "text-[15px] leading-[24px]",
		},
	},
	defaultVariants: { tone: "default", size: "default" },
});

// Light status hues are under 4.5:1 on any fill, so light mode keeps the hue in the fill only.
export const emailBadge = tv({
	base: "m-0 inline-block rounded-chip px-2 py-[2px] font-semibold text-[12px] leading-[18px] tracking-[0.02em]",
	variants: {
		tone: {
			neutral:
				"bg-card text-muted-foreground dark:bg-card-dark dark:text-muted-foreground-dark",
			accent:
				"bg-primary-soft text-foreground dark:bg-primary-soft-dark dark:text-foreground-dark",
			success:
				"bg-success-soft text-foreground dark:bg-success-soft-dark dark:text-success-dark",
			warning:
				"bg-warning-soft text-foreground dark:bg-warning-soft-dark dark:text-warning-dark",
			destructive:
				"bg-destructive-soft text-foreground dark:bg-destructive-soft-dark dark:text-destructive-dark",
		},
	},
	defaultVariants: { tone: "neutral" },
});

export const emailButton = tv({
	base: "font-semibold",
	variants: {
		variant: {
			primary:
				"rounded-control bg-primary text-primary-foreground no-underline dark:bg-primary-dark dark:text-primary-foreground-dark",
			secondary:
				"rounded-control border border-border-strong border-solid bg-background text-foreground no-underline dark:border-border-strong-dark dark:bg-background-dark dark:text-foreground-dark",
			link: "text-foreground underline dark:text-foreground-dark",
		},
		size: {
			default: "px-4 py-2 text-[14px] leading-[20px]",
			lg: "px-5 py-[10px] text-[14px] leading-[20px]",
		},
		shape: {
			rounded: "",
			pill: "rounded-full",
		},
		width: {
			auto: "",
			full: "box-border block w-full text-center",
		},
	},
	compoundVariants: [{ variant: "link", class: "px-0 py-0" }],
	defaultVariants: {
		variant: "primary",
		size: "default",
		shape: "rounded",
		width: "auto",
	},
});

/** Padding the Svelte button also needs as numbers, for its Outlook (MSO) spacer. */
export const EMAIL_BUTTON_PADDING: Record<EmailButtonSize, { x: number; y: number }> = {
	default: { x: 16, y: 8 },
	lg: { x: 20, y: 10 },
};

export const emailCallout = tv({
	slots: {
		root: "rounded-control px-pad py-4",
		title:
			"m-0 mb-1 font-semibold text-[14px] text-foreground leading-[22px] dark:text-foreground-dark",
	},
	variants: {
		tone: {
			neutral: { root: "bg-card dark:bg-card-dark" },
			info: { root: "bg-info-soft dark:bg-info-soft-dark" },
			success: { root: "bg-success-soft dark:bg-success-soft-dark" },
			warning: { root: "bg-warning-soft dark:bg-warning-soft-dark" },
			destructive: { root: "bg-destructive-soft dark:bg-destructive-soft-dark" },
		},
	},
	defaultVariants: { tone: "neutral" },
});

export const emailDivider = tv({
	base: "m-0 border-0 border-border border-t border-solid dark:border-border-dark",
	variants: {
		spacing: {
			md: "my-block",
			lg: "my-stack",
		},
	},
	defaultVariants: { spacing: "md" },
});

export const emailFooter = tv({
	slots: {
		root: "mt-stack",
		bar: "",
		brand:
			"m-0 mb-3 font-semibold text-[14px] text-foreground leading-[20px] tracking-[-0.01em] dark:text-foreground-dark",
		mark: "inline-block h-5 w-5 align-middle",
		markName: "ml-2 align-middle",
		text: "m-0 text-[12px] text-muted-foreground leading-[20px] dark:text-muted-foreground-dark",
		reason:
			"m-0 mb-3 text-[12px] text-muted-foreground leading-[20px] dark:text-muted-foreground-dark",
		link: "text-muted-foreground underline dark:text-muted-foreground-dark",
		linksCell: "text-right align-middle",
		linkText:
			"m-0 text-[12px] text-muted-foreground leading-[20px] dark:text-muted-foreground-dark",
		legal: "mt-gap",
	},
	variants: {
		// `plain` sits under the card; the rest go in EmailShell's `cardFooter`, inside the card.
		layout: {
			plain: {},
			band: {
				root: "mt-0 rounded-b-card border-0 border-border border-t border-solid bg-card px-gutter py-block dark:border-border-dark dark:bg-card-dark",
			},
			bar: {
				root: "mt-0 px-gutter pb-block",
				bar: "rounded-inner bg-foreground px-pad py-pad dark:bg-foreground-dark",
				brand:
					"mb-0 text-[16px] text-background leading-[24px] dark:text-background-dark",
				link: "text-background underline dark:text-background-dark",
				linkText: "text-background dark:text-background-dark",
			},
			row: {
				root: "mt-0 border-0 border-border border-t border-solid px-gutter py-pad dark:border-border-dark",
			},
		},
		align: {
			left: { root: "text-left" },
			center: { root: "text-center" },
		},
	},
	defaultVariants: { layout: "plain", align: "left" },
});

export const emailCode = tv({
	base: "m-0 rounded-inner bg-card px-gutter py-pad text-center font-mono font-semibold text-foreground dark:bg-card-dark dark:text-foreground-dark",
	variants: {
		size: {
			default: "text-[20px] leading-[28px] tracking-[6px]",
			lg: "text-[28px] leading-[36px] tracking-[8px]",
		},
	},
	defaultVariants: { size: "lg" },
});

/** Vertical rhythm templates share, so every email spaces its parts the same way. */
export const emailLayout = tv({
	slots: {
		badge: "mb-gap",
		intro: "mt-3",
		action: "mt-block",
		section: "mt-block",
		label: "mb-2",
		sectionTitle:
			"m-0 mb-2 font-semibold text-[13px] text-foreground leading-[20px] dark:text-foreground-dark",
		closing: "mt-gap",
		inlineLink: "text-foreground underline dark:text-foreground-dark",
	},
});

export const emailFallbackLink = tv({
	slots: {
		root: "m-0 text-[13px] text-muted-foreground leading-[20px] dark:text-muted-foreground-dark",
		link: "break-all text-foreground underline dark:text-foreground-dark",
	},
	variants: {
		align: {
			left: { root: "text-left" },
			center: { root: "text-center" },
		},
	},
	defaultVariants: { align: "left" },
});

export const emailStats = tv({
	slots: {
		cell: "align-top",
		card: "rounded-inner bg-card px-3 py-3 dark:bg-card-dark",
		value:
			"m-0 font-semibold text-[22px] text-foreground leading-[28px] tracking-[-0.01em] dark:text-foreground-dark",
		label:
			"m-0 mt-1 text-[12px] text-muted-foreground leading-[18px] dark:text-muted-foreground-dark",
		note: "m-0 mt-2 font-semibold text-[12px] text-foreground leading-[18px] dark:text-foreground-dark",
		gap: "w-[12px]",
		rowGap: "h-[12px]",
	},
	variants: {
		columns: {
			2: { cell: "w-[47%]" },
			3: { cell: "w-[31%]" },
		},
		tone: {
			neutral: {},
			accent: {
				card: "border-primary-soft bg-primary-soft dark:border-primary-soft-dark dark:bg-primary-soft-dark",
				label: "text-foreground dark:text-foreground-dark",
			},
		},
		// Light status hues fail contrast, so only dark mode tints; the arrow carries direction.
		trend: {
			up: { note: "dark:text-success-dark" },
			down: { note: "dark:text-destructive-dark" },
			flat: { note: "dark:text-muted-foreground-dark" },
		},
	},
	defaultVariants: { columns: 3, tone: "neutral" },
});

/** Glyph before a stat's note, so the direction reads without colour. */
export const EMAIL_STAT_TREND_GLYPH: Record<EmailStatsTrend, string> = {
	up: "▲ ",
	down: "▼ ",
	flat: "→ ",
};

export const emailKeyValue = tv({
	slots: {
		label:
			"py-[6px] text-[14px] text-muted-foreground leading-[22px] dark:text-muted-foreground-dark",
		value:
			"py-[6px] text-right text-[14px] text-foreground leading-[22px] break-all dark:text-foreground-dark",
		total:
			"border-0 border-border border-t border-solid pt-3 font-semibold text-foreground dark:border-border-dark dark:text-foreground-dark",
	},
	variants: {
		density: {
			comfortable: {},
			compact: { label: "py-[2px]", value: "py-[2px]" },
		},
	},
	defaultVariants: { density: "comfortable" },
});

export type EmailShellSurface = NonNullable<VariantProps<typeof emailShell>["surface"]>;
export type EmailHeaderVariant = NonNullable<VariantProps<typeof emailHeader>["variant"]>;
export type EmailHeaderAlign = NonNullable<VariantProps<typeof emailHeader>["align"]>;
export type EmailHeadingSize = NonNullable<VariantProps<typeof emailHeading>["size"]>;
export type EmailHeadingAlign = NonNullable<VariantProps<typeof emailHeading>["align"]>;
export type EmailHeroTone = NonNullable<VariantProps<typeof emailHero>["tone"]>;
export type EmailHeroSize = NonNullable<VariantProps<typeof emailHero>["size"]>;
export type EmailHeroAlign = NonNullable<VariantProps<typeof emailHero>["align"]>;
export type EmailPanelTone = NonNullable<VariantProps<typeof emailPanel>["tone"]>;
export type EmailSectionAlign = NonNullable<VariantProps<typeof emailSection>["align"]>;
export type EmailListMarker = NonNullable<VariantProps<typeof emailList>["marker"]>;
export type EmailButtonShape = NonNullable<VariantProps<typeof emailButton>["shape"]>;
export type EmailButtonWidth = NonNullable<VariantProps<typeof emailButton>["width"]>;
export type EmailFooterLayout = NonNullable<VariantProps<typeof emailFooter>["layout"]>;
export type EmailTextTone = NonNullable<VariantProps<typeof emailText>["tone"]>;
export type EmailTextSize = NonNullable<VariantProps<typeof emailText>["size"]>;
export type EmailBadgeTone = NonNullable<VariantProps<typeof emailBadge>["tone"]>;
export type EmailButtonVariant = NonNullable<VariantProps<typeof emailButton>["variant"]>;
export type EmailButtonSize = NonNullable<VariantProps<typeof emailButton>["size"]>;
export type EmailCalloutTone = NonNullable<VariantProps<typeof emailCallout>["tone"]>;
export type EmailDividerSpacing = NonNullable<
	VariantProps<typeof emailDivider>["spacing"]
>;
export type EmailFooterAlign = NonNullable<VariantProps<typeof emailFooter>["align"]>;
export type EmailCodeSize = NonNullable<VariantProps<typeof emailCode>["size"]>;
export type EmailFallbackLinkAlign = NonNullable<
	VariantProps<typeof emailFallbackLink>["align"]
>;
export type EmailStatsColumns = NonNullable<VariantProps<typeof emailStats>["columns"]>;
export type EmailStatsTone = NonNullable<VariantProps<typeof emailStats>["tone"]>;
export type EmailStatsTrend = NonNullable<VariantProps<typeof emailStats>["trend"]>;
export type EmailKeyValueDensity = NonNullable<
	VariantProps<typeof emailKeyValue>["density"]
>;
