<script lang="ts">
import { PollVote } from "@baby-ui/svelte";

const OPTIONS = [
	{ id: "springs", label: "Springs", votes: 42 },
	{ id: "curves", label: "Easing curves", votes: 27 },
	{ id: "both", label: "Both, it depends", votes: 31 },
];
</script>

<div class="w-72">
	<PollVote options={OPTIONS} />
</div>
