<script lang="ts">
import { Dialog as SheetPrimitive } from "bits-ui";
import { cn } from "../lib/cn";
import { type SheetSide, sheet } from "./variants";

let {
	class: classProp,
	side = "right",
	ref = $bindable(null),
	...rest
}: SheetPrimitive.ContentProps & { side?: SheetSide } = $props();

const styles = $derived(sheet({ side }));
</script>

<SheetPrimitive.Portal>
	<SheetPrimitive.Overlay data-slot="sheet-backdrop" class={styles.backdrop()} />
	<SheetPrimitive.Content
		bind:ref
		{...rest}
		data-slot="sheet-content"
		data-side={side}
		class={cn(styles.panel(), classProp)}
	/>
</SheetPrimitive.Portal>
