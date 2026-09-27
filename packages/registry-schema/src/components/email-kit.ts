import { defineComponent } from "../index";

export const emailKit = defineComponent({
	slug: "email-kit",
	name: "Email Kit",
	description:
		"Shell, header, heading, text, button, callout, divider, footer, code and key-value parts for transactional email, themed from your tokens as hex.",
	category: "emails",
	status: "beta",
	variants: {
		width: ["md", "lg"],
		surface: ["card", "plain"],
		tone: ["neutral", "info", "success", "warning", "destructive"],
	},
	props: [
		{
			name: "preview",
			type: "string",
			description:
				"EmailShell: inbox preview line after the subject; keep it under ~90 characters.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "width",
			type: '"md" | "lg"',
			description:
				"EmailShell: 560px or 600px column. 600px is the most any inbox reliably shows.",
			default: "md",
			control: { kind: "none" },
		},
		{
			name: "surface",
			type: '"card" | "plain"',
			description:
				"EmailShell: a bordered card on a quiet page, or content straight on the page.",
			default: "card",
			control: { kind: "none" },
		},
		{
			name: "tone",
			type: '"neutral" | "info" | "success" | "warning" | "destructive"',
			description:
				"EmailCallout: soft fill for notices; the text still says what happened.",
			default: "neutral",
			control: { kind: "none" },
		},
	],
	a11y: {
		keyboard: [],
		notes: [
			"EmailShell sets `lang` and the preview line; every image needs meaningful `alt`.",
			"Colour never carries meaning alone: callout tones pair with text that states the outcome.",
		],
	},
	impl: {
		react: {
			entry: "EmailShell",
			files: [
				{ path: "email-kit/email-kit.tsx", type: "registry:ui" },
				{ path: "email-kit/variants.ts", type: "registry:ui" },
				{ path: "lib/email-theme.ts", type: "registry:lib" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["react-email", "clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "EmailShell",
			files: [
				{ path: "email-kit/email-shell.svelte", type: "registry:ui" },
				{ path: "email-kit/email-header.svelte", type: "registry:ui" },
				{ path: "email-kit/email-heading.svelte", type: "registry:ui" },
				{ path: "email-kit/email-text.svelte", type: "registry:ui" },
				{ path: "email-kit/email-button.svelte", type: "registry:ui" },
				{ path: "email-kit/email-callout.svelte", type: "registry:ui" },
				{ path: "email-kit/email-divider.svelte", type: "registry:ui" },
				{ path: "email-kit/email-footer.svelte", type: "registry:ui" },
				{ path: "email-kit/email-code.svelte", type: "registry:ui" },
				{ path: "email-kit/email-key-value.svelte", type: "registry:ui" },
				{ path: "email-kit/variants.ts", type: "registry:ui" },
				{ path: "lib/email-theme.ts", type: "registry:lib" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: [
				"@better-svelte-email/components",
				"clsx",
				"tailwind-merge",
				"tailwind-variants",
			],
		},
	},
	installDir: "emails/ui",
	keywords: [
		"email",
		"react email",
		"better svelte email",
		"transactional",
		"newsletter",
	],
});
