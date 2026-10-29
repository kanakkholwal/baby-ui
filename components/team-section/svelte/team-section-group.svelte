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

<!-- A department: a TeamSectionGroupTitle over its own TeamSectionList. -->
<div
	data-slot="team-section-group"
	{...rest}
	class={cn(team.styles.group(), classProp)}
>
	{@render children?.()}
</div>
