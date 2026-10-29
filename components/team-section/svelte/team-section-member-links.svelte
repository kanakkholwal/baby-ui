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

<div
	data-slot="team-section-member-links"
	{...rest}
	class={cn(team.styles.links(), classProp)}
>
	{@render children?.()}
</div>
