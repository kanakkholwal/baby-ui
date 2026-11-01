<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { streamingTextState } from "./context";

let { class: classProp, children, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
const ctx = streamingTextState("StreamingTextFooter");
</script>

<!-- The row under the answer, shown once it settles: copy, message actions, sources. -->
<div data-slot="streaming-text-footer" class={cn(ctx.styles.footer(), classProp)} {...rest}>{@render children?.()}</div>
