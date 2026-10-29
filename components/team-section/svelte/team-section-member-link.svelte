<script lang="ts">
import type { Snippet } from "svelte";
import Button from "../../button/svelte/button.svelte";
import { cn } from "../../lib/cn";
import { teamSectionState } from "./context";

let {
	href,
	label,
	class: classProp,
	children,
}: {
	href: string;
	/** What the link opens, e.g. "Ada on GitHub"; the icon itself is hidden. */
	label: string;
	class?: string;
	/** An inline `<svg>` icon. */
	children: Snippet;
} = $props();
const team = teamSectionState();
</script>

<Button
	data-slot="team-section-member-link"
	{href}
	aria-label={label}
	variant="ghost"
	size="icon-sm"
	class={cn(team.styles.link(), classProp)}
>
	{@render children()}
</Button>
