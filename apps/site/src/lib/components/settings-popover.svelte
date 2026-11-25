<script lang="ts">
import { IconCheck, IconSettings } from "@baby-ui/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@baby-ui/svelte/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@baby-ui/svelte/select";
import { type PageLayout, prefs, THEMES } from "#lib/preferences.svelte.js";
import { prefetchReact } from "#lib/react-demos.js";
import { DIALECT_OPTIONS, FRAMEWORK_OPTIONS } from "#lib/technology-options.js";
import { page } from "$app/state";

const LAYOUTS: { id: PageLayout; label: string }[] = [
	{ id: "library", label: "Library" },
	{ id: "playground", label: "Playground" },
];

const currentFramework = $derived(
	FRAMEWORK_OPTIONS.find((framework) => framework.id === prefs.framework),
);
const currentDialect = $derived(
	DIALECT_OPTIONS.find((dialect) => dialect.id === prefs.dialect),
);

// Resolving through the option lists narrows the select's string back to its union without a cast.
function pickLayout(next: string) {
	const hit = LAYOUTS.find((layout) => layout.id === next);
	if (hit) prefs.set("layout", hit.id);
}

function pickFramework(next: string) {
	const hit = FRAMEWORK_OPTIONS.find((framework) => framework.id === next);
	if (hit) prefs.set("framework", hit.id);
}

function pickDialect(next: string) {
	const hit = DIALECT_OPTIONS.find((dialect) => dialect.id === next);
	if (hit) prefs.set("dialect", hit.id);
}

const ROW = "flex items-center justify-between gap-3";
const LABEL = "text-muted-foreground text-xs";
</script>

<Popover bind:open={prefs.open}>
	<PopoverTrigger
		aria-label="Settings"
		class="gear grid size-8 shrink-0 place-items-center rounded-full text-foreground/70 outline-none transition-colors duration-(--duration-fast) hover:bg-foreground/[0.06] hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring data-[state=open]:bg-foreground/[0.09] data-[state=open]:text-foreground"
	>
		<IconSettings size={14} />
	</PopoverTrigger>
	<PopoverContent align="end" sideOffset={8} size="sm" class="w-60 p-3">
		<div class="mb-2 flex items-center justify-between">
			<span class="font-medium text-foreground text-xs">Theme</span>
			<span class="text-muted-foreground text-xs">{THEMES.find((t) => t.id === prefs.theme)?.name}</span>
		</div>
		<div role="group" aria-label="Theme" class="flex flex-wrap gap-2">
			{#each THEMES as theme (theme.id)}
				<button
					type="button"
					onclick={() => prefs.set("theme", theme.id)}
					aria-pressed={prefs.theme === theme.id}
					aria-label={theme.name}
					title={theme.name}
					style:background="linear-gradient(145deg, color-mix(in oklch, {theme.swatch} 60%, white), {theme.swatch})"
					class="grid size-6 place-items-center rounded-full text-white outline-2 outline-offset-2 outline-transparent transition-[outline-color,scale] duration-(--duration-fast) hover:scale-110 focus-visible:outline-ring aria-pressed:outline-foreground/50 motion-reduce:transition-none"
				>
					{#if prefs.theme === theme.id}<IconCheck size={11} />{/if}
				</button>
			{/each}
		</div>

		<div class="my-3 h-px bg-foreground/10" aria-hidden="true"></div>

		<p class="mb-2 font-medium text-foreground text-xs">Defaults</p>
		<div class="flex flex-col gap-1.5">
			<div class={ROW}>
				<span class={LABEL}>Layout</span>
				<Select
					size="xs"
					items={LAYOUTS.map((layout) => ({ value: layout.id, label: layout.label }))}
					bind:value={() => prefs.layout, pickLayout}
				>
					<SelectTrigger aria-label="Page layout" size="xs" class="w-28 rounded-md text-xs">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{#each LAYOUTS as layout (layout.id)}
							<SelectItem value={layout.id} label={layout.label}>{layout.label}</SelectItem>
						{/each}
					</SelectContent>
				</Select>
			</div>
			<div class={ROW}>
				<span class={LABEL}>Framework</span>
				<Select
					size="xs"
					items={FRAMEWORK_OPTIONS.map((option) => ({ value: option.id, label: option.label }))}
					bind:value={() => prefs.framework, pickFramework}
				>
					<!-- Hovering the switch warms React and this page's demo, so picking it is instant. -->
					<SelectTrigger
						aria-label="Framework"
						size="xs"
						class="w-28 rounded-md text-xs"
						onpointerenter={() => {
							if (prefs.framework !== "react") prefetchReact(page.params.slug);
						}}
					>
						{#if currentFramework}
							<currentFramework.icon class={currentFramework.iconClass} />
							{currentFramework.label}
						{:else}
							<SelectValue />
						{/if}
					</SelectTrigger>
					<SelectContent>
						{#each FRAMEWORK_OPTIONS as option (option.id)}
							<SelectItem value={option.id} label={option.label}>
								<option.icon class={option.iconClass} />
								{option.label}
							</SelectItem>
						{/each}
					</SelectContent>
				</Select>
			</div>
			<div class={ROW}>
				<span class={LABEL}>Language</span>
				<Select
					size="xs"
					items={DIALECT_OPTIONS.map((option) => ({ value: option.id, label: option.label }))}
					bind:value={() => prefs.dialect, pickDialect}
				>
					<SelectTrigger aria-label="Language" size="xs" class="w-28 rounded-md text-xs">
						{#if currentDialect}
							<currentDialect.icon class={currentDialect.iconClass} />
							{currentDialect.label}
						{:else}
							<SelectValue />
						{/if}
					</SelectTrigger>
					<SelectContent>
						{#each DIALECT_OPTIONS as option (option.id)}
							<SelectItem value={option.id} label={option.label}>
								<option.icon class={option.iconClass} />
								{option.label}
							</SelectItem>
						{/each}
					</SelectContent>
				</Select>
			</div>
		</div>
	</PopoverContent>
</Popover>
