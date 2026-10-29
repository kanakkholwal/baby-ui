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

<!-- A line or two about the person. -->
<p data-slot="team-section-member-bio" {...rest} class={cn(team.styles.bio(), classProp)}>
	{@render children?.()}
</p>
