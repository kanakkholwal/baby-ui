import {
	TranscriptRow,
	TranscriptRowActions,
	TranscriptRowCancel,
	TranscriptRowHeader,
	TranscriptRowProgress,
	TranscriptRowStatusBadge,
	TranscriptRowTitle,
} from "@baby-ui/react";

export function Example() {
	return (
		<ul>
			<TranscriptRow status="running">
				<TranscriptRowHeader>
					<TranscriptRowTitle>meeting.m4a</TranscriptRowTitle>
					<TranscriptRowActions>
						<TranscriptRowStatusBadge />
						<TranscriptRowCancel onClick={() => console.log("cancel")} />
					</TranscriptRowActions>
				</TranscriptRowHeader>
				<TranscriptRowProgress value={60} label="meeting.m4a" />
			</TranscriptRow>
		</ul>
	);
}
