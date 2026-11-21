<script lang="ts">
import type { Snippet } from "svelte";
import Badge from "../../badge/svelte/badge.svelte";
import Button from "../../button/svelte/button.svelte";
import { cn } from "../../lib/cn";
import Progress from "../../progress/svelte/progress.svelte";
import { LOADED_MODELS_ICONS } from "../icons";
import { type LoadedModel, STATE_LABEL } from "../model";
import { loadedModels } from "../variants";
import { getLoadedModels } from "./context";

let {
	model,
	icon,
	class: classProp,
}: { model: LoadedModel; icon?: Snippet; class?: string } = $props();

const ctx = getLoadedModels();
const styles = $derived(loadedModels({ state: model.state }));
const measurement = $derived(model.measurement);
</script>

{#snippet glyph(name: keyof typeof LOADED_MODELS_ICONS)}
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="1.5"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
	>
		<path d={LOADED_MODELS_ICONS[name]} />
	</svg>
{/snippet}

<div data-slot="loaded-models-item" data-state={model.state} class={cn(styles.row(), classProp)}>
	<div class={styles.line()}>
		<span class={styles.tile()}>
			{#if icon}{@render icon()}{:else}{@render glyph("chip")}{/if}
			<span class={styles.tileDot()}></span>
		</span>
		<div class={styles.text()}>
			<p class={styles.name()}>{model.name}</p>
			<p class={styles.meta()}>{model.status ?? `${model.kind} · ${STATE_LABEL[model.state]}`}</p>
		</div>
		{#if model.state === "idle" && ctx.onLoad}
			<Button size="sm" variant="secondary" onclick={() => ctx.onLoad?.(model.id)}>
				{@render glyph("play")}Load
			</Button>
		{:else if model.state === "ready" && ctx.onUnload}
			<Button size="sm" variant="ghost" onclick={() => ctx.onUnload?.(model.id)}>
				{@render glyph("power")}Unload
			</Button>
		{/if}
	</div>
	{#if measurement && model.state === "ready"}
		<div class={styles.measure()}>
			<Progress size="sm" tone={measurement.tone} value={measurement.value} label={measurement.label} />
			<p class={styles.measureText()}>
				{measurement.label}
				{#if measurement.badge}
					<Badge size="sm" variant={measurement.tone === "default" ? "secondary" : measurement.tone}>
						{measurement.badge}
					</Badge>
				{/if}
			</p>
		</div>
	{/if}
</div>
