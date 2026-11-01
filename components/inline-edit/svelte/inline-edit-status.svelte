<script lang="ts">
import { cn } from "../../lib/cn";
import Spinner from "../../spinner/svelte/spinner.svelte";
import { inlineEditState } from "./context";

let { class: classProp }: { class?: string } = $props();
const edit = inlineEditState("InlineEditStatus");
</script>

<!-- A spinner while saving, then a tick that draws and fades; the root announces both. -->
<span aria-hidden="true" data-slot="inline-edit-status" class={cn(edit.styles.status(), classProp)}>
	{#if edit.phase === "saving"}<Spinner size="sm" label="Saving" />{/if}
	<svg viewBox="0 0 14 14" fill="none" data-on={edit.phase === "saved"} class={edit.styles.tick()}>
		<path d="M3 7.4 5.6 10 11 4.2" pathLength="1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
	</svg>
</span>
