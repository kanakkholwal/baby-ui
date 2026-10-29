import { tv, type VariantProps } from "tailwind-variants";
import type { AvatarShape, AvatarSize } from "../avatar/variants";

export const teamSection = tv({
	slots: {
		root: "@container/team w-full bg-background text-foreground",
		inner:
			"mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)] gap-12 px-6 py-20 @3xl/team:gap-16 @3xl/team:py-28",
		header: "grid max-w-2xl justify-items-start gap-4",
		title:
			"text-balance font-medium text-3xl tracking-tight @3xl/team:text-4xl @5xl/team:text-5xl",
		description: "text-pretty text-lg text-muted-foreground leading-relaxed",
		group: "grid gap-4",
		groupTitle: "font-medium text-lg",
		list: "grid",
		member: "group/member relative grid min-w-0 content-start",
		avatar: "ring-1 ring-border",
		name: "truncate font-medium",
		role: "truncate text-muted-foreground text-sm",
		bio: "text-muted-foreground text-sm leading-relaxed",
		links: "flex items-center gap-0.5",
		link: "text-muted-foreground hover:text-foreground",
	},
	variants: {
		variant: {
			// Round faces in a ruled grid, the way an about page lists a whole company.
			grid: {
				list: "grid-cols-2 gap-x-4 gap-y-8 border-border border-t pt-6 @xl/team:grid-cols-3 @3xl/team:grid-cols-4",
				member: "gap-0.5",
				avatar:
					"mb-2 ring-offset-2 ring-offset-background transition-transform duration-(--duration-fast) group-hover/member:-translate-y-0.5 motion-reduce:transition-none",
				name: "text-sm",
				role: "text-xs",
				bio: "mt-1 text-xs",
				links: "mt-1 -ml-2",
			},
			// Portraits that warm to full colour and ease in on hover.
			cards: {
				list: "gap-x-6 gap-y-10 @xl/team:grid-cols-2 @3xl/team:grid-cols-3 @5xl/team:grid-cols-4",
				member: "gap-1",
				avatar:
					"mb-3 aspect-[4/5] size-auto w-full text-3xl [&_img]:grayscale-[0.35] [&_img]:transition-[opacity,scale,filter] [&_img]:duration-(--duration-slow) [&_img]:ease-(--ease-ui-out) group-hover/member:[&_img]:scale-105 group-hover/member:[&_img]:grayscale-0 motion-reduce:[&_img]:transition-none",
				links: "mt-1 -ml-2",
			},
			// Ruled rows: face, name and role, then links at the end of the row from 36rem.
			list: {
				list: "divide-y divide-border border-border border-y",
				member:
					"grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 gap-y-0.5 py-4 @xl/team:grid-cols-[auto_minmax(0,1fr)_auto]",
				avatar:
					"row-span-2 transition-transform duration-(--duration-fast) group-hover/member:scale-105 motion-reduce:transition-none",
				name: "col-start-2",
				role: "col-start-2",
				bio: "col-start-2 mt-1",
				links:
					"col-start-2 mt-1 -ml-2 @xl/team:col-start-3 @xl/team:row-span-2 @xl/team:row-start-1 @xl/team:mt-0 @xl/team:ml-0",
			},
		},
	},
	defaultVariants: { variant: "grid" },
});

export type TeamSectionVariant = NonNullable<VariantProps<typeof teamSection>["variant"]>;

export const TEAM_AVATAR: Record<
	TeamSectionVariant,
	{ size: AvatarSize; shape: AvatarShape }
> = {
	grid: { size: "xl", shape: "circle" },
	cards: { size: "xl", shape: "square" },
	list: { size: "lg", shape: "circle" },
};

/** Up to two initials for the avatar fallback, e.g. "Ada Lovelace" to "AL". */
export const initials = (name: string) =>
	name
		.split(/\s+/)
		.filter(Boolean)
		.slice(0, 2)
		.map((word) => word[0]?.toUpperCase())
		.join("");
