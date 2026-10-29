<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { teamSectionState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLHeadingElement> & { children?: Snippet } = $props();
const team = teamSectionState();
</script>

<h3
	data-slot="team-section-group-title"
	{...rest}
	class={cn(team.styles.groupTitle(), classProp)}
>
	{@render children?.()}
</h3>
