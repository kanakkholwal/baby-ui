<script lang="ts">
import type { HTMLImgAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { getAvatar } from "./context";

let {
	src,
	alt = "",
	class: classProp,
	...rest
}: { src?: string; alt?: string; class?: string } & HTMLImgAttributes = $props();

const avatar = getAvatar();
let failed = $state(false);

$effect(() => {
	void src;
	failed = false;
	avatar.setLoaded(false);
});
</script>

{#if src && !failed}
	<img
		{...rest}
		{src}
		{alt}
		data-slot="avatar-image"
		onload={() => avatar.setLoaded(true)}
		onerror={() => (failed = true)}
		style:opacity={avatar.loaded ? 1 : 0}
		class={cn(
			"absolute inset-0 size-full object-cover transition-opacity duration-200 ease-[var(--ease-out)] motion-reduce:transition-none",
			classProp,
		)}
	/>
{/if}
