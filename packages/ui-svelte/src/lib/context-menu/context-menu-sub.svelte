<script lang="ts">
import { ContextMenu as ContextMenuPrimitive } from "bits-ui";

let { open = $bindable(false), ...rest }: ContextMenuPrimitive.SubProps = $props();
</script>

<ContextMenuPrimitive.Sub bind:open {...rest} />
