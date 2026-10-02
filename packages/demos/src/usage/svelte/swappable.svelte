<script lang="ts">
import { Swappable, SwappableItem, SwappableSlot } from "@baby-ui/svelte";

const CARDS = ["Revenue", "Signups", "Churn"];
</script>

<Swappable class="grid grid-cols-3 gap-3" onSwap={(event) => console.log(event)}>
	{#each CARDS as card (card)}
		<SwappableSlot id={card}>
			<SwappableItem id={card} class="p-4">{card}</SwappableItem>
		</SwappableSlot>
	{/each}
</Swappable>
