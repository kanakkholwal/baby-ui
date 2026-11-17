import { tv } from "tailwind-variants";

export const emailVerify = tv({
	slots: {
		subheading: "mt-2 text-center",
		intro: "mt-section text-center",
		action: "mt-section text-center",
		codeLabel: "mb-3 text-center",
		fallback: "mt-block",
		notice: "mt-10",
		helpList: "mt-3",
	},
});
