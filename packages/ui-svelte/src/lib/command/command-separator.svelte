<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../lib/cn";

let { class: classProp, ...rest }: { class?: string } & HTMLAttributes<HTMLHRElement> =
	$props();
</script>

<hr {...rest} data-slot="command-separator" class={cn("my-1 border-border", classProp)} />
