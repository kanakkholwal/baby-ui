<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { teamSectionState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLParagraphElement> & { children?: Snippet } = $props();
const team = teamSectionState();
</script>

<p
	data-slot="team-section-description"
	{...rest}
	class={cn(team.styles.description(), classProp)}
>
	{@render children?.()}
</p>
