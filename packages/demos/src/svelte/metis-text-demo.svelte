<script lang="ts">
import { MetisText } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof MetisText>>(props));
</script>

<p class="text-lg text-foreground">
	Read the
	<MetisText
		direction={p.direction ?? "left"}
		durationMs={Number(props.durationMs ?? 300)}
	>
		full changelog
	</MetisText>
	.
</p>
