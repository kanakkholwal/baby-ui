<script lang="ts">
import type { ComponentProps } from "svelte";
import { cn } from "../../lib/cn";
import PopoverContent from "../../popover/svelte/popover-content.svelte";
import { composerState } from "./context";

let { class: classProp, ...rest }: ComponentProps<typeof PopoverContent> = $props();
const ctx = composerState("ComposerModelContent");
</script>

<PopoverContent side="top" align="end" class={cn(ctx.styles.modelContent(), classProp)} {...rest} />
