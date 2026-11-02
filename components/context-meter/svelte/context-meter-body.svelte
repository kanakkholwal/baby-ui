<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { contextMeterState } from "./context";

let { class: classProp, children, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
const ctx = contextMeterState("ContextMeterBody");
</script>

<!-- The inner surface: the summary, bar, rows and footer sit inside it. -->
<div data-slot="context-meter-body" class={cn(ctx.styles.body(), classProp)} {...rest}>{@render children?.()}</div>
