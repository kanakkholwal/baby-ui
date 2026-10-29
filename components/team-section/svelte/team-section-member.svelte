<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLLiAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { teamSectionState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLLiAttributes & { children?: Snippet } = $props();
const team = teamSectionState();
</script>

<li data-slot="team-section-member" {...rest} class={cn(team.styles.member(), classProp)}>
	{@render children?.()}
</li>
