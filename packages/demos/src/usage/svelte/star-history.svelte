<script lang="ts">
import { StarHistory } from "@baby-ui/svelte";
import { DEMO_STAR_HISTORIES_LIST } from "../../data/star-history";

const history = $derived(DEMO_STAR_HISTORIES_LIST[0]);
</script>

{#if history}
	<div class="w-full max-w-4xl">
		<StarHistory {history} locale="en-US" />
	</div>
{/if}