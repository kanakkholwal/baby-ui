<script lang="ts">
import { cn } from "../lib/cn";

let { class: classProp }: { class?: string } = $props();

const button =
	"grid size-6 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground";
</script>

<div
	class={cn(
		"flex items-center gap-0.5 opacity-0 transition-opacity duration-150 group-focus-within/message:opacity-100 group-hover/message:opacity-100 motion-reduce:transition-none",
		classProp,
	)}
>
	<button type="button" aria-label="Copy message" class={button}>
		<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-3.5">
			<rect x="5.5" y="5.5" width="8" height="8" rx="1.8" stroke="currentColor" stroke-width="1.3" />
			<path d="M10.5 2.5H3.6A1.6 1.6 0 0 0 2 4.1V11" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
		</svg>
	</button>
	<button type="button" aria-label="Retry" class={button}>
		<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-3.5">
			<path d="M13 8a5 5 0 1 1-1.6-3.7" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
			<path d="M13 2.5V5h-2.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	</button>
</div>
