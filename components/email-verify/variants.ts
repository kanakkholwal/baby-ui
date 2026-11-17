import { tv } from "tailwind-variants";

export const emailVerify = tv({
	slots: {
		subheading: "mt-2",
		intro: "mt-3",
		action: "mt-block",
		codeLabel: "mb-2",
		fallback: "mt-block",
		helpHeading: "mt-block",
		helpList: "mt-3",
	},
});
