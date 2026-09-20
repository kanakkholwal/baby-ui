<script lang="ts">
import { Reasoning } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<div class="w-96">
	<Reasoning
		thinking={props.thinking !== false}
		duration={Number(props.duration ?? 4)}
		defaultOpen={Boolean(props.defaultOpen)}
	>
		The measured centre shifts because the element's own width is part of the
		measurement. Using the resting rect keeps the falloff symmetric.
	</Reasoning>
</div>
