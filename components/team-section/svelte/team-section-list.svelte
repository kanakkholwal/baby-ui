<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { teamSectionState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLUListElement> & { children?: Snippet } = $props();
const team = teamSectionState();
</script>

<ul data-slot="team-section-list" {...rest} class={cn(team.styles.list(), classProp)}>
	{@render children?.()}
</ul>
