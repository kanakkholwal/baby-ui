<script lang="ts">
import { cn } from "../lib/cn";

let { class: classProp }: { class?: string } = $props();
</script>

<span aria-hidden="true" class={cn("mx-1 h-8 w-px self-center bg-border", classProp)}></span>
