import { defineComponent } from "@baby-ui/registry-schema";

export const inputOtp = defineComponent({
	slug: "input-otp",
	name: "Input OTP",
	description:
		"One-time-code field with a ring that glides between slots, staggered paste, verifying and verified states, and native paste and autofill.",
	category: "base",
	status: "stable",
	props: [
		{
			name: "maxLength",
			type: "number",
			description: "Number of slots. `maxlength` in Svelte, as bits-ui names it.",
		},
		{
			name: "value",
			type: "string",
			description: "The code typed so far. Bindable in Svelte; `onChange` in React.",
		},
		{
			name: "variant",
			type: '"default" | "soft"',
			description:
				"`default` borders each slot; `soft` sits empty slots on a muted fill.",
			default: "default",
			control: { kind: "select", options: ["default", "soft"] },
		},
		{
			name: "status",
			type: '"idle" | "verifying" | "success"',
			description:
				"Controlled. `verifying` shimmers the slots and locks typing; `success` folds them into InputOTPVerified.",
			default: "idle",
			control: { kind: "select", options: ["idle", "verifying", "success"] },
		},
		{
			name: "size",
			type: '"xs" | "sm" | "default" | "lg" | "xl"',
			description: "Slot size.",
			default: "default",
			control: { kind: "select", options: ["xs", "sm", "default", "lg", "xl"] },
		},
		{
			name: "invalid",
			type: "boolean",
			description: "Reds every slot; `invalidMotion` plays each time it turns on.",
			default: "false",
			control: { kind: "none" },
		},
		{
			name: "invalidMotion",
			type: '"shake" | "pulse" | "none"',
			description:
				"How a wrong code is announced: the row shakes, each slot pulses, or nothing moves.",
			default: "shake",
			control: { kind: "select", options: ["shake", "pulse", "none"] },
		},
		{
			name: "open / id",
			type: "boolean / string",
			description:
				"InputOTPMessage: folds a line under the field in or out; point `aria-describedby` at its id.",
			control: { kind: "none" },
		},
		{
			name: "seconds / onResend / hidden",
			type: "number / () => void / boolean",
			description:
				"InputOTPResend: counts down from your clock, then offers Resend; `hidden` fades it after success.",
			control: { kind: "none" },
		},
		{
			name: "pattern",
			type: "string",
			description: "Allowed characters, e.g. digits only for a numeric code.",
		},
	],
	motion: {
		springs: [],
		reducedMotion:
			"The caret stops blinking, the ring jumps instead of gliding, and nothing shimmers or folds.",
		behaviour: [
			"One ring glides to the active slot, so the strip reads as one field.",
			"Typed characters rise out of a blur; a pasted code lands slot by slot.",
			"Verifying sweeps a light across the slots; success folds them into a Verified pill.",
			"The caret is drawn, because the real input underneath is invisible.",
		],
	},
	a11y: {
		keyboard: [
			{ keys: ["Backspace"], action: "Clears the previous character" },
			{ keys: ["Arrow Left", "Arrow Right"], action: "Moves between slots" },
		],
		notes: [
			"One real input holds the code, so paste, one-time-code autofill and screen readers see a single field.",
			"Set `aria-invalid` on the root and slots to show a wrong code without relying on colour alone; pair it with a message.",
		],
	},
	licenseOrigin: {
		source: "shadcn/ui",
		url: "https://github.com/shadcn-ui/ui",
		license: "MIT",
		copyright: "Copyright (c) 2023 shadcn",
	},
	impl: {
		react: {
			entry: "InputOTP",
		},
		svelte: {
			entry: "InputOTP",
		},
	},
	keywords: ["otp", "one-time code", "2fa", "verification", "pin", "form", "auth"],
});
