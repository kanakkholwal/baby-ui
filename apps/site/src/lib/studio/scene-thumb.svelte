<script lang="ts">
import type { AnyProps } from "#lib/component-module.js";
import { claim, drop, type LiveSlot, watchLive } from "#lib/live-demo.js";
import LiveComponent from "./live-component.svelte";

let {
	slug,
	entry,
	props,
	class: classProp,
}: { slug: string; entry: string; props: AnyProps; class?: string } = $props();

let el = $state<HTMLElement>();
let live = $state(false);
// Shares the gallery's pool, so a long library never holds more WebGL contexts than a screenful.
const slot: LiveSlot = { visible: false, release: () => (live = false) };

$effect(() => {
	if (!el) return;
	const stop = watchLive(
		el,
		slot,
		() => {
			if (live) return;
			live = true;
			claim(slot);
		},
		{ deactivate: () => (live = false) },
	);
	return () => {
		stop();
		drop(slot);
	};
});
</script>

<span bind:this={el} aria-hidden="true" class={["relative block overflow-hidden bg-muted", classProp]}>
	{#if live}
		<LiveComponent {slug} {entry} {props} />
	{/if}
</span>
