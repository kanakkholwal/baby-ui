<script lang="ts">
import CopyButton from "../../copy-button/svelte/copy-button.svelte";
import { cn } from "../../lib/cn";
import { toolContext } from "./context";

let {
	text,
	label = "Copy output",
	class: classProp,
}: { text: string; label?: string; class?: string } = $props();
const ctx = toolContext("ToolCopy");
</script>

<CopyButton data-slot="tool-copy" {text} {label} iconOnly class={cn(ctx.styles.action(), classProp)} />
