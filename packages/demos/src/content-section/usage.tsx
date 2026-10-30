import {
	ContentSection,
	ContentSectionBody,
	ContentSectionMedia,
	ContentSectionTitle,
} from "@baby-ui/react";

export function Example() {
	return (
		<ContentSection variant="split">
			<ContentSectionTitle>
				One place for the numbers your team argues about
			</ContentSectionTitle>
			<ContentSectionMedia>
				<img src="/dashboard.png" alt="The dashboard" width={1600} height={1000} />
			</ContentSectionMedia>
			<ContentSectionBody>
				<p>
					<strong>Every figure links back to its rows</strong>, so nobody asks where it
					came from.
				</p>
			</ContentSectionBody>
		</ContentSection>
	);
}
