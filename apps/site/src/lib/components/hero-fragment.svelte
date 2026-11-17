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

<!-- A real component half off the page edge, turned toward the copy and faded on both sides.
     Decoration: inert, hidden from AT, and only where the viewport leaves room for it. -->
<div
	aria-hidden="true"
	inert
	class={[
		"pointer-events-none absolute hidden w-[30rem] opacity-55 [perspective:1400px] 2xl:block",
		side === "left" ? "top-[14%] -left-40" : "top-[10%] -right-40",
		classProp,
	]}
>
	<div
		class={[
			"origin-center scale-90",
			side === "left"
				? "[transform:rotateY(22deg)_rotateZ(-1deg)] [mask-image:linear-gradient(to_right,transparent_8%,black_40%,black_60%,transparent_95%)]"
				: "[transform:rotateY(-22deg)_rotateZ(1deg)] [mask-image:linear-gradient(to_left,transparent_8%,black_40%,black_60%,transparent_95%)]",
		]}
	>
		{#if demo}
			{#await demo then mod}
				{@const Demo = mod.default}
				<Demo props={{}} />
			{/await}
		{/if}
	</div>
</div>
