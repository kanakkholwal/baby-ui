<script lang="ts">
import { WeekCalendar } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof WeekCalendar>>(props));
</script>

{#key props.defaultExpanded}
	<WeekCalendar
		defaultExpanded={p.defaultExpanded ?? false}
		weekStartsOn={p.weekStartsOn ?? 0}
		locale={p.locale ?? "en-US"}
		variant={p.variant ?? "card"}
	/>
{/key}
