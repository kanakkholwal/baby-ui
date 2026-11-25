<script lang="ts">
import type { ComponentProps } from "svelte";
import { cn } from "../../lib/cn";
import RadioGroupItem from "../../radio-group/svelte/radio-group-item.svelte";
import { composerState } from "./context";

let { class: classProp, ...rest }: ComponentProps<typeof RadioGroupItem> = $props();
const ctx = composerState("ComposerModelItem");
</script>

<RadioGroupItem class={cn(ctx.styles.modelItem(), classProp)} {...rest} />
