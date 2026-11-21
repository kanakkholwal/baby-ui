<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import PopoverContent from "../../popover/svelte/popover-content.svelte";
import { loadedModels } from "../variants";
import { getLoadedModels } from "./context";

let { class: classProp, children }: { class?: string; children?: Snippet } = $props();

const ctx = getLoadedModels();
const styles = $derived(loadedModels({ variant: ctx.variant }));
</script>

<PopoverContent data-slot="loaded-models-content" align="end" class={cn(styles.content(), classProp)}>
	<div class={styles.list()}>
		{@render children?.()}
	</div>
</PopoverContent>
