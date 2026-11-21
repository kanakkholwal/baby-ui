<script lang="ts">
import {
	TranscriptRow,
	TranscriptRowActions,
	TranscriptRowCancel,
	TranscriptRowHeader,
	TranscriptRowProgress,
	TranscriptRowStatusBadge,
	TranscriptRowTitle,
} from "@baby-ui/svelte";
</script>

<ul>
	<TranscriptRow status="running">
		<TranscriptRowHeader>
			<TranscriptRowTitle>meeting.m4a</TranscriptRowTitle>
			<TranscriptRowActions>
				<TranscriptRowStatusBadge />
				<TranscriptRowCancel onclick={() => console.log("cancel")} />
			</TranscriptRowActions>
		</TranscriptRowHeader>
		<TranscriptRowProgress value={60} label="meeting.m4a" />
	</TranscriptRow>
</ul>
