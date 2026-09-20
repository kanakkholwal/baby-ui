<script lang="ts">
import { CopyButton } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<CopyButton
	text={(props.text as string) || "npx shadcn add button"}
	label={(props.label as string) || "Copy"}
	copiedLabel={(props.copiedLabel as string) || "Copied"}
	iconOnly={Boolean(props.iconOnly)}
/>
