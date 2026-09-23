<script lang="ts">
import { DoubleUnderline, type DoubleUnderlineTrigger } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<p class="text-2xl text-foreground">
	Every
	<DoubleUnderline as="span" trigger={(props.trigger as DoubleUnderlineTrigger) ?? "hover"}>
		component
	</DoubleUnderline>
	ships in both ports.
</p>
