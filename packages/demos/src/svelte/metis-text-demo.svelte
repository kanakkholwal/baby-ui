<script lang="ts">
import { MetisText, type MetisTextDirection } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<p class="text-lg text-foreground">
	Read the
	<MetisText
		direction={(props.direction as MetisTextDirection) ?? "left"}
		durationMs={Number(props.durationMs ?? 300)}
	>
		full changelog
	</MetisText>
	.
</p>
