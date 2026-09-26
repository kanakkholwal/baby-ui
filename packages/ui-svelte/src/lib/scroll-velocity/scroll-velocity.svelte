<script lang="ts">
import { cn } from "../lib/cn";
import {
	followScroll,
	type ScrollVelocityDirection,
	type ScrollVelocityLayout,
	type ScrollVelocitySize,
	scrollVelocity,
} from "./variants";

let {
	text,
	durationS = 30,
	boost = 5,
	repeat = 4,
	layout = "double",
	direction = "left",
	size,
	class: className,
}: {
	/** The phrase each row repeats. */
	text: string;
	/** Seconds for one full loop at rest. */
	durationS?: number;
	/** Extra speed per 1000 px/s of scroll, as a multiple of the resting speed. */
	boost?: number;
	/** Copies of `text` in each half of a row; raise it for short phrases on wide screens. */
	repeat?: number;
	layout?: ScrollVelocityLayout;
	direction?: ScrollVelocityDirection;
	size?: ScrollVelocitySize;
	class?: string;
} = $props();

const s = $derived(scrollVelocity({ layout, direction, size }));
const rowCount = $derived(layout === "double" ? 2 : 1);
const tracks: HTMLDivElement[] = [];

$effect(() => {
	void rowCount;
	return followScroll(tracks.filter(Boolean), boost);
});
</script>

{#snippet half()}
	<div class={s.half()}>
		{#each Array.from({ length: repeat }) as _, i (i)}
			<span class={s.item()}>{text}</span>
		{/each}
	</div>
{/snippet}

<div data-slot="scroll-velocity" class={cn(s.root(), className)}>
	<span class={s.srOnly()}>{text}</span>
	{#each Array.from({ length: rowCount }) as _, r (r)}
		<div aria-hidden="true" class={s.row()}>
			<div
				bind:this={tracks[r]}
				class={s.track()}
				style="--scroll-velocity-duration: {durationS}s; animation-direction: {(r % 2 === 1) !== (direction === 'right') ? 'reverse' : 'normal'}"
			>
				{@render half()}
				{@render half()}
			</div>
		</div>
	{/each}
</div>
