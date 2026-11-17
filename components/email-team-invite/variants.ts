import { tv } from "tailwind-variants";

// Left-aligned: an avatar, who invited you, the team name as the heading.
export const emailTeamInvite = tv({
	slots: {
		avatar: "block h-[48px] w-[48px] rounded-full",
		initials:
			"m-0 h-[48px] w-[48px] rounded-full bg-primary-soft text-center font-semibold text-[18px] text-foreground leading-[48px] dark:bg-primary-soft-dark dark:text-foreground-dark",
		lead: "m-0 mt-4 mb-1 text-[14px] text-muted-foreground leading-[22px] dark:text-muted-foreground-dark",
		role: "mt-gap",
		signoff:
			"m-0 mt-2 text-[13px] text-muted-foreground leading-[20px] dark:text-muted-foreground-dark",
		closing: "mt-gap",
	},
});

/** Up to two initials for the fallback avatar, e.g. "Grace Hopper" to "GH". */
export const initials = (name: string) =>
	name
		.split(/\s+/)
		.filter(Boolean)
		.slice(0, 2)
		.map((part) => part[0]?.toUpperCase())
		.join("");
