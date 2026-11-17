<script lang="ts">
import { demos } from "#lib/demos.js";

let {
	slug,
	side,
	class: classProp = "",
}: { slug: string; side: "left" | "right"; class?: string } = $props();

// Loaded after hydration so the fragments never compete with the headline for first paint.
let ready = $state(false);
$effect(() => {
	const id = requestAnimationFrame(() => (ready = true));
	return () => cancelAnimationFrame(id);
});
const demo = $derived(ready ? demos[slug]?.() : undefined);
</script>

<!-- A real component at the hero's edge, faded toward the copy: decoration, so inert and hidden from AT. -->
<div
	aria-hidden="true"
	inert
	class={[
		"pointer-events-none absolute top-1/2 hidden w-[26rem] -translate-y-1/2 opacity-60 xl:block",
		side === "left"
			? "-left-24 [mask-image:linear-gradient(to_right,black_30%,transparent_90%)]"
			: "-right-24 [mask-image:linear-gradient(to_left,black_30%,transparent_90%)]",
		classProp,
	]}
>
	{#if demo}
		{#await demo then mod}
			{@const Demo = mod.default}
			<Demo props={{}} />
		{/await}
	{/if}
</div>
