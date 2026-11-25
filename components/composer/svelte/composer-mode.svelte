<script lang="ts">
import type { ComponentProps } from "svelte";
import ComposerChip from "./composer-chip.svelte";

let props: ComponentProps<typeof ComposerChip> = $props();
</script>

<!-- The mode chip in the toolbar, such as permissions. It shows only while the card is expanded. -->
<ComposerChip data-composer="mode" {...props} />
