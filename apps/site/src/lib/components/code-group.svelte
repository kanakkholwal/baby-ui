<script lang="ts">
import type { Panel } from "$lib/docs-nodes";
import { LANG_LABEL } from "$lib/highlight";
import { pmCommand } from "$lib/pm";
import { prefs } from "$lib/preferences.svelte";
import CopyButton from "./copy-button.svelte";
import PmTabs from "./pm-tabs.svelte";
import PmTerminal from "./pm-terminal.svelte";
import Tabs from "./tabs.svelte";

let { panels }: { panels: Panel[] } = $props();

// Follows the header preference until the reader picks a tab manually; $effect, not
// $derived, since the check has to read `active` itself to detect that override.
let active = $state("");
$effect(() => {
	const preferred = panels.find((p) => p.label.toLowerCase() === prefs.framework);
	if (!panels.some((p) => p.id === active)) active = (preferred ?? panels[0])?.id ?? "";
});
const current = $derived(panels.find((p) => p.id === active) ?? panels[0]);
const activeIndex = $derived(panels.findIndex((p) => p.id === current.id));
const tabs = $derived(panels.map((p) => ({ id: p.id, label: p.label })));
const copyText = $derived(
	current.pm ? pmCommand(current.pm.kind, current.pm.args, prefs.pm) : current.code,
);

const BODY =
	"scroll-area overflow-auto py-4 font-mono text-[13px] leading-[1.7] [&_.line]:px-5 [&_.shiki]:bg-transparent [&_pre]:!bg-transparent [&_pre]:!p-0";
</script>

<div class="min-w-0 max-w-full rounded-xl border border-border bg-card p-1 text-foreground">
	<div class="flex min-h-8 items-center gap-2 px-1 pb-1">
		{#if panels.length > 1}
			<div class="scrollbar-hide min-w-0 flex-1 overflow-x-auto">
				<Tabs {tabs} bind:active variant="segment" />
			</div>
		{:else}
			<span
				class="inline-flex h-5 shrink-0 items-center rounded border border-border bg-background px-1.5 font-mono font-semibold text-[10px] text-muted-foreground uppercase tracking-wider"
			>
				{LANG_LABEL[current.lang] ?? current.lang.toUpperCase()}
			</span>
		{/if}
		<div class="ml-auto flex shrink-0 items-center gap-2">
			{#if current.pm}<PmTabs />{/if}
			<CopyButton text={copyText} iconOnly />
		</div>
	</div>
	<div class="relative overflow-hidden rounded-[calc(var(--radius-xl)-1px-0.25rem)] bg-background">
		{#each panels as panel, i (panel.id)}
			{const shift = i === activeIndex ? 0 : i < activeIndex ? -1 : 1}
			<div
				role="tabpanel"
				id="panel-{panel.id}"
				aria-labelledby="tab-{panel.id}"
				inert={shift !== 0}
				style:translate="{shift * 1.25}rem 0"
				class={[
					"transition-[opacity,translate] duration-[var(--duration-dropdown)] ease-[var(--ease-out)] motion-reduce:transition-none",
					shift === 0 ? "relative opacity-100" : "pointer-events-none absolute inset-0 opacity-0",
				]}
			>
				{#if panel.pm}
					<PmTerminal kind={panel.pm.kind} args={panel.pm.args} />
				{:else}
					<div class={BODY}>{@html panel.html}</div>
				{/if}
			</div>
		{/each}
	</div>
</div>
