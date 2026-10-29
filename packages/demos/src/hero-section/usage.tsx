import {
	HeroSection,
	HeroSectionAction,
	HeroSectionActions,
	HeroSectionAnnouncement,
	HeroSectionContent,
	HeroSectionDescription,
	HeroSectionMedia,
	HeroSectionTitle,
} from "@baby-ui/react";

export function Example() {
	return (
		<HeroSection>
			<HeroSectionContent>
				<HeroSectionAnnouncement href="/changelog" label="New">
					Workflows now run on a schedule
				</HeroSectionAnnouncement>
				<HeroSectionTitle>Ship the work, skip the busywork</HeroSectionTitle>
				<HeroSectionDescription>
					Plan, track and hand off every project in one workspace.
				</HeroSectionDescription>
				<HeroSectionActions>
					<HeroSectionAction href="/signup">Start for free</HeroSectionAction>
					<HeroSectionAction variant="ghost" href="/demo">
						Book a demo
					</HeroSectionAction>
				</HeroSectionActions>
			</HeroSectionContent>
			<HeroSectionMedia variant="framed">
				<img src="/screenshot.png" alt="The workspace" width={1600} height={1000} />
			</HeroSectionMedia>
		</HeroSection>
	);
}
