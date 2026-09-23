<script lang="ts">
import type { Icon } from "@tabler/icons-svelte";

export type SegmentOption = { id: string; label: string; icon: Icon };

let {
	options,
	current,
	onPick,
}: { options: SegmentOption[]; current: string; onPick: (id: string) => void } = $props();
</script>

<div class="inline-flex items-center gap-0.5 rounded-lg bg-card p-0.5">
	{#each options as option (option.id)}
		{const Glyph = option.icon}
		<button
			type="button"
			onclick={() => onPick(option.id)}
			aria-pressed={current === option.id}
			class="inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-muted-foreground text-xs transition-colors hover:text-foreground aria-pressed:bg-background aria-pressed:font-medium aria-pressed:text-foreground aria-pressed:shadow-sm"
		>
			<Glyph size={14} stroke={1.6} />
			{option.label}
		</button>
	{/each}
</div>
