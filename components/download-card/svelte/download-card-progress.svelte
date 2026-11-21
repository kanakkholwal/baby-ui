<script lang="ts">
import Progress from "../../progress/svelte/progress.svelte";
import { getDownloadCard } from "./context";

/** `label` is the bar's accessible name, usually the file name. */
let { label, class: classProp }: { label: string; class?: string } = $props();

const card = getDownloadCard();
</script>

<Progress
	size="sm"
	class={classProp}
	value={card.percent}
	indeterminate={card.phase === "checking" || card.total === 0}
	{label}
/>
