<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { inlineEditState } from "./context";

let { class: classProp, children, ...rest }: HTMLAttributes<HTMLSpanElement> = $props();
const edit = inlineEditState("InlineEditArea");
</script>

<!-- The line the text sits on: the preview or the input, then the status beside it. -->
<span data-slot="inline-edit-area" class={cn(edit.styles.area(), classProp)} {...rest}>{@render children?.()}</span>
