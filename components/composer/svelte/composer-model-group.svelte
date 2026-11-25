<script lang="ts">
import type { ComponentProps } from "svelte";
import { cn } from "../../lib/cn";
import RadioGroup from "../../radio-group/svelte/radio-group.svelte";

let {
	value = $bindable(""),
	class: classProp,
	...rest
}: ComponentProps<typeof RadioGroup> = $props();
</script>

<!-- The radio list of models; its value is the chosen model. -->
<RadioGroup size="sm" bind:value class={cn("gap-0.5", classProp)} {...rest} />
