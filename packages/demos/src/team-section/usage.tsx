import {
	TeamSection,
	TeamSectionHeader,
	TeamSectionList,
	TeamSectionMember,
	TeamSectionMemberAvatar,
	TeamSectionMemberName,
	TeamSectionMemberRole,
	TeamSectionTitle,
} from "@baby-ui/react";

export function Example() {
	return (
		<TeamSection variant="grid">
			<TeamSectionHeader>
				<TeamSectionTitle>The people behind the product</TeamSectionTitle>
			</TeamSectionHeader>
			<TeamSectionList>
				<TeamSectionMember>
					<TeamSectionMemberAvatar src="/team/maya.jpg" name="Maya Okafor" />
					<TeamSectionMemberName>Maya Okafor</TeamSectionMemberName>
					<TeamSectionMemberRole>Co-founder, CEO</TeamSectionMemberRole>
				</TeamSectionMember>
			</TeamSectionList>
		</TeamSection>
	);
}
