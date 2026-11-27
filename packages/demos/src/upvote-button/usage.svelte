<script lang="ts">
import { UpvoteButton } from "@baby-ui/svelte";
</script>

<div class="flex items-start gap-6">
	<UpvoteButton count={482} />
	<UpvoteButton count={482} variant="secondary" />
	<UpvoteButton count={482} variant="success" orientation="horizontal" />
	<UpvoteButton
		count={482}
		orientation="horizontal"
		class="[--upvote-color:oklch(0.7_0.19_30)] [--upvote-on:white]"
	/>
</div>
