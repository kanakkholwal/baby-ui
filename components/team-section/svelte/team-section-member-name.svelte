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

<p data-slot="team-section-member-name" {...rest} class={cn(team.styles.name(), classProp)}>
	{@render children?.()}
</p>
