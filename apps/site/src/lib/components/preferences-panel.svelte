<script lang="ts">
import type { Icon } from "@baby-ui/icons";
import {
	IconAdjustmentsHorizontal,
	IconBrandJavascript,
	IconBrandReact,
	IconBrandSvelte,
	IconBrandTypescript,
	IconCheck,
	IconLayoutColumns,
	IconLayoutRows,
} from "@baby-ui/icons";
import type { Framework } from "@baby-ui/registry-schema";
import {
	Field,
	FieldLabel,
	PropertyPanel,
	PropertyPanelGroup,
	PropertyPanelGroupContent,
	PropertyPanelGroupLabel,
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@baby-ui/svelte";
import { type Dialect, type PageLayout, prefs, THEMES } from "#lib/preferences.svelte.js";
import SegmentControl from "./segment-control.svelte";

const FRAMEWORKS: { id: Framework; label: string; icon: Icon }[] = [
	{ id: "react", label: "React", icon: IconBrandReact },
	{ id: "svelte", label: "Svelte", icon: IconBrandSvelte },
];

const DIALECTS: { id: Dialect; label: string; icon: Icon }[] = [
	{ id: "ts", label: "TS", icon: IconBrandTypescript },
	{ id: "js", label: "JS", icon: IconBrandJavascript },
];

const LAYOUTS: { id: PageLayout; label: string; icon: Icon }[] = [
	{ id: "stacked", label: "Stacked", icon: IconLayoutRows },
	{ id: "split", label: "Split", icon: IconLayoutColumns },
	{ id: "playground", label: "Play", icon: IconAdjustmentsHorizontal },
];
</script>

<Sheet bind:open={prefs.open}>
	<SheetContent side="right" class="w-[min(20rem,100vw)] gap-0 p-0">
		<SheetHeader class="h-12 shrink-0 border-border border-b px-4">
			<SheetTitle>Settings</SheetTitle>
			<SheetClose class="size-7 rounded-md" />
		</SheetHeader>

		<PropertyPanel class="[&>*]:px-1">
			<PropertyPanelGroup>
				<PropertyPanelGroupLabel>Appearance</PropertyPanelGroupLabel>
				<PropertyPanelGroupContent>
					<Field orientation="horizontal" size="sm" class="items-start">
						<FieldLabel class="pt-1">Theme</FieldLabel>
						<div role="group" aria-label="Theme" class="flex flex-wrap gap-2">
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
										<IconCheck size={10} />
									{/if}
								</button>
							{/each}
						</div>
					</Field>
				</PropertyPanelGroupContent>
			</PropertyPanelGroup>

			<PropertyPanelGroup>
				<PropertyPanelGroupLabel>Components</PropertyPanelGroupLabel>
				<PropertyPanelGroupContent>
					<Field orientation="horizontal" size="sm">
						<FieldLabel>Layout</FieldLabel>
						<SegmentControl
							size="sm"
							label="Page layout"
							options={LAYOUTS}
							current={prefs.layout}
							onPick={(id) => prefs.set("layout", id)}
						/>
					</Field>
					<Field orientation="horizontal" size="sm">
						<FieldLabel>Framework</FieldLabel>
						<SegmentControl
							size="sm"
							label="Framework"
							options={FRAMEWORKS}
							current={prefs.framework}
							onPick={(id) => prefs.set("framework", id)}
						/>
					</Field>
					<Field orientation="horizontal" size="sm">
						<FieldLabel>Language</FieldLabel>
						<SegmentControl
							size="sm"
							label="Language"
							options={DIALECTS}
							current={prefs.dialect}
							onPick={(id) => prefs.set("dialect", id)}
						/>
					</Field>
					<p class="text-[11px] text-muted-foreground">Split and Play need a wide screen.</p>
				</PropertyPanelGroupContent>
			</PropertyPanelGroup>
		</PropertyPanel>

		<p class="mt-auto border-border border-t px-4 py-3 text-[11px] text-muted-foreground">
			Saved in this browser and synced across open tabs.
		</p>
	</SheetContent>
</Sheet>
