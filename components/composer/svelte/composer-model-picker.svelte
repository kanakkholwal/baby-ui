<script lang="ts">
import type { Snippet } from "svelte";
import Popover from "../../popover/svelte/popover.svelte";

let { open = $bindable(false), children }: { open?: boolean; children?: Snippet } =
	$props();
</script>

<!-- The model picker: a popover with a trigger, a list of models and an effort slider. -->
<Popover bind:open>{@render children?.()}</Popover>
