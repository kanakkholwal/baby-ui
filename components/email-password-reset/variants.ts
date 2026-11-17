import { tv } from "tailwind-variants";

export const emailPasswordReset = tv({
	slots: {
		intro: "mt-3",
		meta: "mt-gap",
		prompt: "mt-block",
		action: "mt-block",
		reassurance: "mt-gap",
	},
});
