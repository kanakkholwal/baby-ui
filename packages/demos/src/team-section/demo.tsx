"use client";

import {
	TeamSection,
	TeamSectionDescription,
	TeamSectionGroup,
	TeamSectionGroupTitle,
	TeamSectionHeader,
	TeamSectionList,
	TeamSectionMember,
	TeamSectionMemberAvatar,
	TeamSectionMemberBio,
	TeamSectionMemberLink,
	TeamSectionMemberLinks,
	TeamSectionMemberName,
	TeamSectionMemberRole,
	TeamSectionTitle,
} from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";
import { TEAM_SECTION as copy, TEAM_LINK_ICON } from "../data/team-section";

type Member = (typeof copy.groups)[number]["members"][number];

function Member({ person }: { person: Member }) {
	return (
		<TeamSectionMember>
			<TeamSectionMemberAvatar src={person.avatar} name={person.name} />
			<TeamSectionMemberName>{person.name}</TeamSectionMemberName>
			<TeamSectionMemberRole>{person.role}</TeamSectionMemberRole>
			<TeamSectionMemberBio>{person.bio}</TeamSectionMemberBio>
			<TeamSectionMemberLinks>
				{person.links.map((link) => (
					<TeamSectionMemberLink key={link.kind} href={link.href} label={link.label}>
						<svg
							aria-hidden
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.6"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d={TEAM_LINK_ICON[link.kind]} />
						</svg>
					</TeamSectionMemberLink>
				))}
			</TeamSectionMemberLinks>
		</TeamSectionMember>
	);
}

export function TeamSectionDemo({ props }: { props: Record<string, unknown> }) {
	const variant =
		controlProps<ComponentProps<typeof TeamSection>>(props).variant ?? "grid";
	return (
		<TeamSection variant={variant}>
			<TeamSectionHeader>
				<TeamSectionTitle>{copy.title}</TeamSectionTitle>
				<TeamSectionDescription>{copy.description}</TeamSectionDescription>
			</TeamSectionHeader>
			{copy.groups.map((group) => (
				<TeamSectionGroup key={group.title}>
					<TeamSectionGroupTitle>{group.title}</TeamSectionGroupTitle>
					<TeamSectionList>
						{group.members.map((person) => (
							<Member key={person.name} person={person} />
						))}
					</TeamSectionList>
				</TeamSectionGroup>
			))}
		</TeamSection>
	);
}
