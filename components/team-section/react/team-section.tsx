import {
	type ComponentProps,
	createContext,
	type ReactNode,
	useContext,
	useId,
} from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../avatar/react/avatar";
import { Button } from "../../button/react/button";
import { cn } from "../../lib/cn";
import { initials, TEAM_AVATAR, type TeamSectionVariant, teamSection } from "../variants";

export type { TeamSectionVariant };

type TeamSectionState = {
	variant: TeamSectionVariant;
	titleId: string;
	styles: ReturnType<typeof teamSection>;
};

const TeamSectionContext = createContext<TeamSectionState | null>(null);

function useTeamSection() {
	const state = useContext(TeamSectionContext);
	if (!state) throw new Error("TeamSection parts must be rendered inside a TeamSection.");
	return state;
}

export interface TeamSectionProps extends ComponentProps<"section"> {
	/** Round faces in a `grid`, portrait `cards`, or ruled `list` rows. */
	variant?: TeamSectionVariant;
}

/**
 * A team section from parts: TeamSectionHeader, then TeamSectionList of TeamSectionMembers,
 * optionally inside TeamSectionGroups with their own titles.
 */
export function TeamSection({
	variant = "grid",
	className,
	children,
	...props
}: TeamSectionProps) {
	const titleId = useId();
	const styles = teamSection({ variant });
	return (
		<TeamSectionContext.Provider value={{ variant, titleId, styles }}>
			<section
				data-slot="team-section"
				data-variant={variant}
				aria-labelledby={titleId}
				className={cn(styles.root(), className)}
				{...props}
			>
				<div className={styles.inner()}>{children}</div>
			</section>
		</TeamSectionContext.Provider>
	);
}

export function TeamSectionHeader({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="team-section-header"
			className={cn(useTeamSection().styles.header(), className)}
			{...props}
		/>
	);
}

export function TeamSectionTitle({ className, ...props }: ComponentProps<"h2">) {
	const { titleId, styles } = useTeamSection();
	return (
		<h2
			data-slot="team-section-title"
			id={titleId}
			className={cn(styles.title(), className)}
			{...props}
		/>
	);
}

export function TeamSectionDescription({ className, ...props }: ComponentProps<"p">) {
	return (
		<p
			data-slot="team-section-description"
			className={cn(useTeamSection().styles.description(), className)}
			{...props}
		/>
	);
}

/** A department: a TeamSectionGroupTitle over its own TeamSectionList. */
export function TeamSectionGroup({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="team-section-group"
			className={cn(useTeamSection().styles.group(), className)}
			{...props}
		/>
	);
}

export function TeamSectionGroupTitle({ className, ...props }: ComponentProps<"h3">) {
	return (
		<h3
			data-slot="team-section-group-title"
			className={cn(useTeamSection().styles.groupTitle(), className)}
			{...props}
		/>
	);
}

export function TeamSectionList({ className, ...props }: ComponentProps<"ul">) {
	return (
		<ul
			data-slot="team-section-list"
			className={cn(useTeamSection().styles.list(), className)}
			{...props}
		/>
	);
}

export function TeamSectionMember({ className, ...props }: ComponentProps<"li">) {
	return (
		<li
			data-slot="team-section-member"
			className={cn(useTeamSection().styles.member(), className)}
			{...props}
		/>
	);
}

export interface TeamSectionMemberAvatarProps {
	src?: string;
	/** The person's name: the image's alt text and the source of the fallback initials. */
	name: string;
	className?: string;
}

/** A round face in grid and list, a portrait in cards; initials while it loads. */
export function TeamSectionMemberAvatar({
	src,
	name,
	className,
}: TeamSectionMemberAvatarProps) {
	const { variant, styles } = useTeamSection();
	const { size, shape } = TEAM_AVATAR[variant];
	return (
		<Avatar
			data-slot="team-section-member-avatar"
			size={size}
			shape={shape}
			className={cn(styles.avatar(), className)}
		>
			<AvatarImage src={src} alt={name} />
			<AvatarFallback>{initials(name)}</AvatarFallback>
		</Avatar>
	);
}

export function TeamSectionMemberName({ className, ...props }: ComponentProps<"p">) {
	return (
		<p
			data-slot="team-section-member-name"
			className={cn(useTeamSection().styles.name(), className)}
			{...props}
		/>
	);
}

export function TeamSectionMemberRole({ className, ...props }: ComponentProps<"p">) {
	return (
		<p
			data-slot="team-section-member-role"
			className={cn(useTeamSection().styles.role(), className)}
			{...props}
		/>
	);
}

/** A line or two about the person. */
export function TeamSectionMemberBio({ className, ...props }: ComponentProps<"p">) {
	return (
		<p
			data-slot="team-section-member-bio"
			className={cn(useTeamSection().styles.bio(), className)}
			{...props}
		/>
	);
}

export function TeamSectionMemberLinks({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="team-section-member-links"
			className={cn(useTeamSection().styles.links(), className)}
			{...props}
		/>
	);
}

export interface TeamSectionMemberLinkProps {
	href: string;
	/** What the link opens, e.g. "Ada on GitHub"; the icon itself is hidden. */
	label: string;
	className?: string;
	/** An inline `<svg>` icon. */
	children: ReactNode;
}

export function TeamSectionMemberLink({
	href,
	label,
	className,
	children,
}: TeamSectionMemberLinkProps) {
	return (
		<Button
			data-slot="team-section-member-link"
			href={href}
			aria-label={label}
			variant="ghost"
			size="icon-sm"
			className={cn(useTeamSection().styles.link(), className)}
		>
			{children}
		</Button>
	);
}
