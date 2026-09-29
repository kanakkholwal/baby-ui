<script lang="ts">
import { DoubleUnderline } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof DoubleUnderline>>(props));
</script>

<p class="text-2xl text-foreground">
	Every
	<DoubleUnderline
		as="span"
		trigger={p.trigger ?? "hover"}
		durationMs={Number(props.durationMs ?? 500)}
	>
		component
	</DoubleUnderline>
	ships in both ports.
</p>
