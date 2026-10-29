<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAnchorAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { heroSectionState } from "./context";

let {
	label,
	class: classProp,
	children,
	...rest
}: HTMLAnchorAttributes & {
	href: string;
	/** A short lead before the text, e.g. "New". */
	label?: string;
	children?: Snippet;
} = $props();
const hero = heroSectionState();
</script>

{#snippet arrow()}
	<svg aria-hidden="true" viewBox="0 0 12 12" fill="none">
		<path
			d="M2 6h8m-3-3 3 3-3 3"
			stroke="currentColor"
			stroke-width="1.4"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
{/snippet}

<!-- A pill link above the title; its arrow slides on hover. -->
<a
	data-slot="hero-section-announcement"
	{...rest}
	class={cn(hero.styles.announcement(), classProp)}
>
	{#if label}<span class={hero.styles.announcementLabel()}>{label}</span>{/if}
	<span class={hero.styles.announcementText()}>{@render children?.()}</span>
	<span aria-hidden="true" class={hero.styles.announcementRule()}></span>
	<span aria-hidden="true" class={hero.styles.announcementArrow()}>
		<span class={hero.styles.announcementTrack()}>
			<span class={hero.styles.announcementCell()}>{@render arrow()}</span>
			<span class={hero.styles.announcementCell()}>{@render arrow()}</span>
		</span>
	</span>
</a>
