<script lang="ts">
import { UnderlineHoverText } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof UnderlineHoverText>>(props));
</script>

<p class="text-2xl text-foreground">
	Every
	<UnderlineHoverText
		variant={p.variant ?? "sweep"}
		tone={p.tone ?? "default"}
		trigger={p.trigger ?? "hover"}
		durationMs={Number(props.durationMs ?? 500)}
	>
		component
	</UnderlineHoverText>
	ships in both ports.
</p>
