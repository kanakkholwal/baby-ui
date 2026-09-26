<script lang="ts">
import { cn } from "../lib/cn";
import { flapRows, SPLIT_FLAP_CHARACTERS } from "./flap";
import SplitFlapCell from "./split-flap-cell.svelte";
import {
	type SplitFlapIndicator,
	type SplitFlapSize,
	type SplitFlapVariant,
	splitFlap,
} from "./variants";

let {
	value,
	columns = 14,
	variant = "solid",
	size = "md",
	indicator = "success",
	stepMs = 60,
	staggerMs = 30,
	characters = SPLIT_FLAP_CHARACTERS,
	class: className,
}: {
	/** Board text; `\n` starts a new row. Uppercased. */
	value: string;
	/** Cells per row; shorter rows pad with blanks, longer ones are cut. */
	columns?: number;
	variant?: SplitFlapVariant;
	size?: SplitFlapSize;
	/** Colour of the side strips; `none` hides them. */
	indicator?: SplitFlapIndicator;
	/** Time for one flap to fall, per character step. */
	stepMs?: number;
	/** Delay between neighbouring cells starting, for a wave. */
	staggerMs?: number;
	/** Drum order each cell flips through. */
	characters?: string;
	class?: string;
} = $props();

const styles = $derived(splitFlap({ variant, size, indicator }));
const rows = $derived(flapRows(value, columns));
</script>

<div
	data-slot="split-flap-display"
	class={cn(styles.root(), className)}
	style="--split-flap-ms: {stepMs}ms;"
>
	<span class="sr-only">{value}</span>
	{#each rows as row, r (r)}
		<div aria-hidden="true" class={styles.row()}>
			{#if indicator !== "none"}<span class={styles.indicator()}></span>{/if}
			<div class={styles.cells()}>
				{#each row as char, c (c)}
					<SplitFlapCell {char} delayMs={c * staggerMs} {stepMs} {characters} {styles} />
				{/each}
			</div>
			{#if indicator !== "none"}<span class={styles.indicator()}></span>{/if}
		</div>
	{/each}
</div>
