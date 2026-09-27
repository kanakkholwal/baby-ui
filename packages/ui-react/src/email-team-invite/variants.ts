import { tv, type VariantProps } from "tailwind-variants";

export const emailTeamInvite = tv({
	slots: {
		avatarCell: "w-[52px] align-middle",
		avatar: "h-[40px] w-[40px] rounded-full",
		initials:
			"m-0 h-[40px] w-[40px] rounded-full bg-accent-soft text-center font-semibold text-[14px] text-foreground leading-[40px] dark:bg-accent-soft-dark dark:text-foreground-dark",
		name: "m-0 font-semibold text-[14px] text-foreground leading-[20px] dark:text-foreground-dark",
		email:
			"m-0 text-[13px] text-muted-foreground leading-[20px] dark:text-muted-foreground-dark",
		lead: "m-0 mt-5 mb-1 text-center text-[14px] text-muted-foreground leading-[22px] dark:text-muted-foreground-dark",
		role: "mt-4 text-center",
		signoff:
			"m-0 mt-2 text-[13px] text-muted-foreground leading-[20px] dark:text-muted-foreground-dark",
		closing: "mt-4",
	},
	variants: {
		design: {
			classic: {},
			// Centred card led by a large avatar and the team name as display text.
			spotlight: {
				avatar: "mx-auto block h-[64px] w-[64px]",
				initials: "mx-auto h-[64px] w-[64px] text-[22px] leading-[64px]",
				closing: "text-center",
			},
		},
	},
	defaultVariants: { design: "classic" },
});

export type EmailTeamInviteDesign = NonNullable<
	VariantProps<typeof emailTeamInvite>["design"]
>;

/** Up to two initials for the fallback avatar, e.g. "Grace Hopper" to "GH". */
export const initials = (name: string) =>
	name
		.split(/\s+/)
		.filter(Boolean)
		.slice(0, 2)
		.map((part) => part[0]?.toUpperCase())
		.join("");
