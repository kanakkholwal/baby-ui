<script lang="ts">
import { Button } from "@baby-ui/svelte";
</script>

<div class="flex items-center gap-2">
	<Button onclick={() => console.log("clicked")}>Deploy</Button>
	<Button variant="outline" size="sm">Preview</Button>
	<Button variant="ghost" loading>Saving</Button>
</div>
