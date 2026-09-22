<script lang="ts">
import { Dialog as SheetPrimitive } from "bits-ui";
import { DIALOG_BACKDROP } from "../dialog/context";
import { cn } from "../lib/cn";
import { type SheetSide, sheetPanel } from "./variants";

let {
	class: classProp,
	side = "right",
	...rest
}: SheetPrimitive.ContentProps & { side?: SheetSide } = $props();
</script>

<SheetPrimitive.Portal>
	<SheetPrimitive.Overlay data-slot="sheet-backdrop" class={DIALOG_BACKDROP} />
	<SheetPrimitive.Content
		{...rest}
		data-slot="sheet-content"
		data-side={side}
		class={cn(sheetPanel({ side }), classProp)}
	/>
</SheetPrimitive.Portal>
