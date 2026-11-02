<script lang="ts">
import type { Snippet } from "svelte";
import { PLAN_ICONS, PLAN_TOOL_TEXT, type PlanToolKind, planTool } from "../variants";

let {
	kind,
	class: classProp,
	children,
}: { kind: PlanToolKind; class?: string; children?: Snippet } = $props();
</script>

<!-- The tool the step uses, e.g. Search or Test. -->
<span class={planTool({ kind, class: classProp })}>
	<svg viewBox="0 0 24 24" aria-hidden="true"><path d={PLAN_ICONS[kind]} /></svg>
	{#if children}{@render children()}{:else}{PLAN_TOOL_TEXT[kind]}{/if}
</span>
