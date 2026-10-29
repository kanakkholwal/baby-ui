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

<h2
	data-slot="team-section-title"
	id={team.titleId}
	{...rest}
	class={cn(team.styles.title(), classProp)}
>
	{@render children?.()}
</h2>
