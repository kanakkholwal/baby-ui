<script lang="ts">
import { Progress } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<div class="w-72">
	<Progress
		value={Number(props.value ?? 40)}
		indeterminate={Boolean(props.indeterminate)}
		size={(props.size as "sm" | "md") ?? "md"}
		label="Upload progress"
	/>
</div>
