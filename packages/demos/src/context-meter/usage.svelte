<script lang="ts">
import {
	ContextMeter,
	ContextMeterBar,
	ContextMeterBody,
	ContextMeterCompact,
	ContextMeterFooter,
	ContextMeterHeader,
	ContextMeterIcon,
	ContextMeterList,
	ContextMeterPercent,
	ContextMeterSubtitle,
	ContextMeterSummary,
	ContextMeterTitle,
	type ContextSegment,
} from "@baby-ui/svelte";

let { segments, compact }: { segments: ContextSegment[]; compact: () => void } = $props();
</script>

<ContextMeter {segments} limit={200_000}>
	<ContextMeterHeader>
		<ContextMeterIcon />
		<ContextMeterTitle>Context window</ContextMeterTitle>
		<ContextMeterSubtitle>Sonnet 5.5</ContextMeterSubtitle>
		<ContextMeterPercent />
	</ContextMeterHeader>
	<ContextMeterBody>
		<ContextMeterSummary />
		<ContextMeterBar />
		<ContextMeterList />
		<ContextMeterFooter note="Auto-compacts at 85%">
			<ContextMeterCompact onclick={compact} />
		</ContextMeterFooter>
	</ContextMeterBody>
</ContextMeter>
