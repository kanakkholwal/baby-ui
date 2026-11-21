<script lang="ts">
import {
	DownloadCard,
	DownloadCardCancel,
	DownloadCardFooter,
	DownloadCardHeader,
	DownloadCardIcon,
	DownloadCardPercent,
	DownloadCardProgress,
	DownloadCardStats,
	DownloadCardText,
	DownloadCardTitle,
} from "@baby-ui/svelte";
</script>

<DownloadCard downloaded={420_000_000} total={1_800_000_000} bytesPerSecond={24_000_000}>
	<DownloadCardHeader>
		<DownloadCardIcon />
		<DownloadCardText>
			<DownloadCardTitle>model.gguf</DownloadCardTitle>
		</DownloadCardText>
		<DownloadCardPercent />
	</DownloadCardHeader>
	<DownloadCardProgress label="model.gguf" />
	<DownloadCardFooter>
		<DownloadCardStats />
		<DownloadCardCancel onclick={() => console.log("cancel")} />
	</DownloadCardFooter>
</DownloadCard>
