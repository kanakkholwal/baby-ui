<script lang="ts">
import { Dock, DockItem, DockSeparator } from "@baby-ui/svelte";
</script>

<Dock aria-label="Application dock">
	<DockItem active aria-label="Home">H</DockItem>
	<DockItem aria-label="Search">S</DockItem>
	<DockSeparator />
	<DockItem aria-label="Settings">G</DockItem>
</Dock>
