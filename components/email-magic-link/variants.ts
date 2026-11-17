import { tv } from "tailwind-variants";

export const emailMagicLink = tv({
	slots: {
		intro: "mt-3",
		code: "mt-block",
		codeLabel: "mt-2",
		expiry: "mt-gap",
		details: "mt-block",
		warning: "mt-block",
	},
});
