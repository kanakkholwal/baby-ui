<script lang="ts">
import type { Framework } from "@baby-ui/registry-schema";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@baby-ui/svelte";
import type { Icon } from "@tabler/icons-svelte";
import IconBrandJavascript from "@tabler/icons-svelte/icons/brand-javascript";
import IconBrandReact from "@tabler/icons-svelte/icons/brand-react";
import IconBrandSvelte from "@tabler/icons-svelte/icons/brand-svelte";
import IconBrandTypescript from "@tabler/icons-svelte/icons/brand-typescript";
import IconCheck from "@tabler/icons-svelte/icons/check";
import { type Appearance, type Dialect, prefs, THEMES } from "$lib/preferences.svelte";

type Option = { id: string; label: string; icon: Icon };

const APPEARANCE: { value: Appearance; label: string }[] = [
	{ value: "light", label: "Light" },
	{ value: "dark", label: "Dark" },
	{ value: "system", label: "System" },
];

const FRAMEWORKS: { id: Framework; label: string; icon: Icon }[] = [
	{ id: "react", label: "React", icon: IconBrandReact },
	{ id: "svelte", label: "Svelte", icon: IconBrandSvelte },
];

const DIALECTS: { id: Dialect; label: string; icon: Icon }[] = [
	{ id: "ts", label: "TS", icon: IconBrandTypescript },
	{ id: "js", label: "JS", icon: IconBrandJavascript },
];

let appearance = $state<string>(prefs.appearance);

$effect(() => {
	if (appearance !== prefs.appearance) prefs.set("appearance", appearance as Appearance);
});
</script>

{#snippet segment(options: Option[], current: string, pick: (id: never) => void)}
	<div class="inline-flex items-center gap-0.5 rounded-lg bg-card p-0.5">
		{#each options as option (option.id)}
			{@const Glyph = option.icon}
			<button
				type="button"
				onclick={() => pick(option.id as never)}
				aria-pressed={current === option.id}
				class="inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-muted-foreground text-xs transition-colors hover:text-foreground aria-pressed:bg-background aria-pressed:font-medium aria-pressed:text-foreground aria-pressed:shadow-sm"
			>
				<Glyph size={14} stroke={1.6} />
				{option.label}
			</button>
		{/each}
	</div>
{/snippet}

<Sheet bind:open={prefs.open}>
	<SheetContent side="right" class="w-[min(20rem,100vw)] gap-0 p-0">
		<SheetHeader class="h-12 shrink-0 border-border border-b px-4">
			<SheetTitle>Settings</SheetTitle>
			<SheetClose class="size-7 rounded-md" />
		</SheetHeader>

		<div class="flex flex-col divide-y divide-border">
			<div class="flex items-center justify-between gap-3 px-4 py-2.5">
				<span class="text-foreground text-xs">Appearance</span>
				<Select bind:value={appearance}>
					<SelectTrigger aria-label="Appearance" class="h-8 w-32 rounded-lg text-xs">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{#each APPEARANCE as option (option.value)}
							<SelectItem value={option.value}>{option.label}</SelectItem>
						{/each}
					</SelectContent>
				</Select>
			</div>

			<div class="flex flex-col gap-2 px-4 py-3">
				<span class="text-foreground text-xs">Theme</span>
				<div class="grid grid-cols-6 gap-2">
					{#each THEMES as theme (theme.id)}
						<button
							type="button"
							onclick={() => prefs.set("theme", theme.id)}
							aria-pressed={prefs.theme === theme.id}
							aria-label={theme.name}
							title={theme.name}
							style:background={theme.swatch}
							class="grid aspect-square place-items-center rounded-full text-white ring-offset-2 ring-offset-background transition-[box-shadow,scale] hover:scale-110 aria-pressed:ring-2 aria-pressed:ring-foreground/40"
						>
							{#if prefs.theme === theme.id}
								<IconCheck size={12} stroke={2.6} />
							{/if}
						</button>
					{/each}
				</div>
			</div>

			<div class="flex items-center justify-between gap-3 px-4 py-2.5">
				<span class="text-foreground text-xs">Framework</span>
				{@render segment(FRAMEWORKS, prefs.framework, (id) => prefs.set("framework", id))}
			</div>

			<div class="flex items-center justify-between gap-3 px-4 py-2.5">
				<span class="text-foreground text-xs">Language</span>
				{@render segment(DIALECTS, prefs.dialect, (id) => prefs.set("dialect", id))}
			</div>
		</div>

		<p class="mt-auto border-border border-t px-4 py-3 text-[11px] text-muted-foreground">
			Theme lasts this tab. Framework and language are remembered.
		</p>
	</SheetContent>
</Sheet>
