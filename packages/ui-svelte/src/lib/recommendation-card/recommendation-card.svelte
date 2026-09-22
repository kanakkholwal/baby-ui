<script lang="ts">
import Button from "../button/button.svelte";
import type { RecommendationLabels, RecommendationOption } from "./types";

export type { RecommendationLabels, RecommendationOption } from "./types";

const DEFAULT_LABELS: RecommendationLabels = {
	alternatives: "Alternatives",
	otherOptions: "Other options",
	accepted: "Accepted",
};

let {
	title,
	options,
	labels,
}: {
	title: string;
	options: RecommendationOption[];
	labels?: Partial<RecommendationLabels>;
} = $props();

const t = $derived({ ...DEFAULT_LABELS, ...labels });

let selected = $state(0);
let open = $state(false);
let accepted = $state(false);

const active = $derived(options[selected] as RecommendationOption);
const others = $derived(
	options
		.map((option, index) => ({ option, index }))
		.filter(({ index }) => index !== selected),
);
</script>

{#snippet meter(signal: number, tone: string)}
	<span class="flex items-end gap-0.5">
		{#each [0, 1, 2] as bar (bar)}
			<span
				class="h-2.5 w-1 rounded-full transition-colors duration-300"
				style={`background: ${bar < signal ? tone : "var(--border-strong)"}`}
			></span>
		{/each}
	</span>
{/snippet}

<div data-slot="recommendation-card" class="w-full max-w-sm overflow-hidden rounded-2xl bg-card shadow-sm">
	<div class="p-4">
		<span class="font-medium text-[14px] text-foreground">{title}</span>
		{#key active.key}
			<p class="fade-in mt-1.5 min-h-12 text-[13px] text-muted-foreground leading-relaxed">
				{@render active.body()}
			</p>
		{/key}
	</div>

	<div
		class="grid transition-[grid-template-rows,opacity] duration-300 ease-[var(--ease-out)]"
		style={`grid-template-rows: ${open ? "1fr" : "0fr"}; opacity: ${open ? 1 : 0}`}
	>
		<div class="overflow-hidden">
			<div class="border-border border-t bg-card px-2 py-2">
				<p class="px-1.5 pb-1 font-medium text-[11px] text-muted-foreground">{t.otherOptions}</p>
				{#each others as { option, index } (option.key)}
					<button
						type="button"
						onclick={() => {
							selected = index;
							accepted = false;
						}}
						class="flex w-full items-center gap-2.5 rounded-lg px-1.5 py-1.5 text-left transition-colors duration-100 hover:bg-foreground/[0.06]"
					>
						{@render meter(option.signal, option.tone)}
						<span class="min-w-0 flex-1 truncate text-[12.5px] text-foreground">{option.short}</span>
						<span class="shrink-0 text-[11px] text-muted-foreground">{option.label}</span>
					</button>
				{/each}
			</div>
		</div>
	</div>

	<div class="flex items-center justify-between gap-3 border-border border-t bg-card px-4 py-3">
		<span class="flex items-center gap-2">
			{@render meter(active.signal, active.tone)}
			<span class="font-medium text-[12.5px] text-muted-foreground">{active.label}</span>
		</span>

		<span class="-mr-0.5 flex items-center gap-2">
			<Button
				variant="secondary"
				size="sm"
				aria-expanded={open}
				onclick={() => (open = !open)}
				class="px-2.5 text-[12.5px]"
			>
				{t.alternatives}
			</Button>
			<Button
				variant={accepted ? "success" : active.ctaVariant}
				size="sm"
				onclick={() => (accepted = true)}
				class="text-[12.5px]"
			>
				{accepted ? t.accepted : active.cta}
			</Button>
		</span>
	</div>
</div>
