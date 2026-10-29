<script lang="ts">
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
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";
import { TEAM_SECTION as copy, TEAM_LINK_ICON } from "../data/team-section";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const variant = $derived(
	controlProps<ComponentProps<typeof TeamSection>>(props).variant ?? "grid",
);
</script>

<TeamSection {variant}>
	<TeamSectionHeader>
		<TeamSectionTitle>{copy.title}</TeamSectionTitle>
		<TeamSectionDescription>{copy.description}</TeamSectionDescription>
	</TeamSectionHeader>
	{#each copy.groups as group (group.title)}
		<TeamSectionGroup>
			<TeamSectionGroupTitle>{group.title}</TeamSectionGroupTitle>
			<TeamSectionList>
				{#each group.members as person (person.name)}
					<TeamSectionMember>
						<TeamSectionMemberAvatar src={person.avatar} name={person.name} />
						<TeamSectionMemberName>{person.name}</TeamSectionMemberName>
						<TeamSectionMemberRole>{person.role}</TeamSectionMemberRole>
						<TeamSectionMemberBio>{person.bio}</TeamSectionMemberBio>
						<TeamSectionMemberLinks>
							{#each person.links as link (link.kind)}
								<TeamSectionMemberLink href={link.href} label={link.label}>
									<svg
										aria-hidden="true"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="1.6"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path d={TEAM_LINK_ICON[link.kind]} />
									</svg>
								</TeamSectionMemberLink>
							{/each}
						</TeamSectionMemberLinks>
					</TeamSectionMember>
				{/each}
			</TeamSectionList>
		</TeamSectionGroup>
	{/each}
</TeamSection>
