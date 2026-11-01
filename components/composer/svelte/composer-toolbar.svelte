<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { composerState } from "./context";

let { class: classProp, children, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
const ctx = composerState("ComposerToolbar");
</script>

<!-- The row under the field: actions, the model and the send button. -->
<div data-slot="composer-toolbar" class={cn(ctx.styles.toolbar(), classProp)} {...rest}>{@render children?.()}</div>
