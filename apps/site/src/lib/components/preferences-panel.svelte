<script lang="ts">
import type { Framework } from "@baby-ui/registry-schema";
import {
	Button,
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	ThemeToggle,
	type ThemeToggleValue,
} from "@baby-ui/svelte";
import type { Icon } from "@tabler/icons-svelte";
import IconBrandJavascript from "@tabler/icons-svelte/icons/brand-javascript";
import IconBrandReact from "@tabler/icons-svelte/icons/brand-react";
import IconBrandSvelte from "@tabler/icons-svelte/icons/brand-svelte";
import IconBrandTypescript from "@tabler/icons-svelte/icons/brand-typescript";
import IconCheck from "@tabler/icons-svelte/icons/check";
import { mode, setMode, userPrefersMode } from "mode-watcher";
import { type Dialect, prefs, THEMES } from "$lib/preferences.svelte";
import SegmentControl from "./segment-control.svelte";

const FRAMEWORKS: { id: Framework; label: string; icon: Icon }[] = [
	{ id: "react", label: "React", icon: IconBrandReact },
	{ id: "svelte", label: "Svelte", icon: IconBrandSvelte },
];

const DIALECTS: { id: Dialect; label: string; icon: Icon }[] = [
	{ id: "ts", label: "TS", icon: IconBrandTypescript },
	{ id: "js", label: "JS", icon: IconBrandJavascript },
];

// Set the class in the same tick as mode-watcher: the reveal snapshots the DOM when this returns.
function pickMode(next: ThemeToggleValue) {
	document.documentElement.classList.toggle("dark", next === "dark");
	setMode(next);
}
</script>

<Sheet bind:open={prefs.open}>
	<SheetContent side="right" class="w-[min(20rem,100vw)] gap-0 p-0">
		<SheetHeader class="h-12 shrink-0 border-border border-b px-4">
			<SheetTitle>Settings</SheetTitle>
			<SheetClose class="size-7 rounded-md" />
		</SheetHeader>

		<div class="flex flex-col divide-y divide-border">
			<div class="flex items-center justify-between gap-3 px-4 py-2.5">
				<span class="text-foreground text-xs">Appearance</span>
				<div class="flex items-center gap-1.5">
					<Button
						size="xs"
						variant={userPrefersMode.current === "system" ? "secondary" : "ghost"}
						aria-pressed={userPrefersMode.current === "system"}
						onclick={() => setMode("system")}
					>
						System
					</Button>
					<ThemeToggle
						theme={mode.current === "dark" ? "dark" : "light"}
						onThemeChange={pickMode}
						variant="circle"
						start="top-right"
						class="size-8 rounded-lg border border-border bg-background"
						iconClass="size-4"
					/>
				</div>
			</div>

			<div class="flex flex-col gap-2 px-4 py-3">
				<span class="text-foreground text-xs">Theme</span>
				<div class="flex flex-wrap gap-2">
					{#each THEMES as theme (theme.id)}
						<button
							type="button"
							onclick={() => prefs.set("theme", theme.id)}
							aria-pressed={prefs.theme === theme.id}
							aria-label={theme.name}
							title={theme.name}
							style:background={theme.swatch}
							class="grid size-6 shrink-0 place-items-center rounded-full text-white ring-offset-2 ring-offset-background transition-[box-shadow,scale] hover:scale-110 aria-pressed:ring-2 aria-pressed:ring-foreground/40"
						>
							{#if prefs.theme === theme.id}
								<IconCheck size={10} stroke={2.6} />
							{/if}
						</button>
					{/each}
				</div>
			</div>

			<div class="flex items-center justify-between gap-3 px-4 py-2.5">
				<span class="text-foreground text-xs">Framework</span>
				<SegmentControl
					options={FRAMEWORKS}
					current={prefs.framework}
					onPick={(id) => prefs.set("framework", id as Framework)}
				/>
			</div>

			<div class="flex items-center justify-between gap-3 px-4 py-2.5">
				<span class="text-foreground text-xs">Language</span>
				<SegmentControl
					options={DIALECTS}
					current={prefs.dialect}
					onPick={(id) => prefs.set("dialect", id as Dialect)}
				/>
			</div>
		</div>

		<p class="mt-auto border-border border-t px-4 py-3 text-[11px] text-muted-foreground">
			Saved in this browser and synced across open tabs.
		</p>
	</SheetContent>
</Sheet>
