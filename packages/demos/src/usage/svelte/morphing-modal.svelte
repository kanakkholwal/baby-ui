<script lang="ts">
import { MorphingModal } from "@baby-ui/svelte";
</script>

<MorphingModal title="Release 2.1">
	{#snippet trigger()}
		<span class="font-medium text-sm">Release 2.1</span>
	{/snippet}
	<p class="text-muted-foreground text-sm">
		The card you clicked becomes the dialog, then returns to exactly where it started.
	</p>
</MorphingModal>
