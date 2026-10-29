<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { teamSectionState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLDivElement> & { children?: Snippet } = $props();
const team = teamSectionState();
</script>

<div data-slot="team-section-header" {...rest} class={cn(team.styles.header(), classProp)}>
	{@render children?.()}
</div>
