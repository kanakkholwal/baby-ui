<script lang="ts">
import type { Framework } from "@baby-ui/registry-schema";
import type { Icon } from "@tabler/icons-svelte";
import IconBrandJavascript from "@tabler/icons-svelte/icons/brand-javascript";
import IconBrandReact from "@tabler/icons-svelte/icons/brand-react";
import IconBrandSvelte from "@tabler/icons-svelte/icons/brand-svelte";
import IconBrandTypescript from "@tabler/icons-svelte/icons/brand-typescript";
import IconCheck from "@tabler/icons-svelte/icons/check";
import IconChevronDown from "@tabler/icons-svelte/icons/chevron-down";
import IconDeviceDesktop from "@tabler/icons-svelte/icons/device-desktop";
import IconMoon from "@tabler/icons-svelte/icons/moon";
import IconSun from "@tabler/icons-svelte/icons/sun";
import IconX from "@tabler/icons-svelte/icons/x";
import { type Appearance, type Dialect, PRIMARIES, prefs } from "$lib/preferences.svelte";

type Option = { id: string; label: string; icon: Icon };

const APPEARANCE: { id: Appearance; label: string; icon: Icon }[] = [
	{ id: "light", label: "Light", icon: IconSun },
	{ id: "dark", label: "Dark", icon: IconMoon },
	{ id: "system", label: "System", icon: IconDeviceDesktop },
];

const AppearanceGlyph = $derived(
	APPEARANCE.find((a) => a.id === prefs.appearance)?.icon ?? IconSun,
);

const FRAMEWORKS: { id: Framework; label: string; icon: Icon }[] = [
	{ id: "react", label: "React", icon: IconBrandReact },
	{ id: "svelte", label: "Svelte", icon: IconBrandSvelte },
];

const DIALECTS: { id: Dialect; label: string; icon: Icon }[] = [
	{ id: "ts", label: "TS", icon: IconBrandTypescript },
	{ id: "js", label: "JS", icon: IconBrandJavascript },
];

function close() {
	prefs.open = false;
}

$effect(() => {
	if (!prefs.open) return;
	const onKey = (e: KeyboardEvent) => {
		if (e.key === "Escape") close();
	};
	window.addEventListener("keydown", onKey);
	return () => window.removeEventListener("keydown", onKey);
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
				class="inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-xs transition-colors aria-pressed:bg-background aria-pressed:font-medium aria-pressed:text-foreground aria-pressed:shadow-sm {current ===
				option.id
					? ''
					: 'text-muted-foreground hover:text-foreground'}"
			>
				<Glyph size={14} stroke={1.6} />
				{option.label}
			</button>
		{/each}
	</div>
{/snippet}

{#if prefs.open}
	<div class="fixed inset-0 z-50">
		<button
			type="button"
			aria-label="Close settings"
			onclick={close}
			class="absolute inset-0 bg-black/40"
		></button>

		<div
			role="dialog"
			aria-modal="true"
			aria-label="Settings"
			class="drawer absolute inset-y-0 right-0 flex w-[min(20rem,100vw)] flex-col border-border border-l bg-background"
		>
			<div class="flex h-12 shrink-0 items-center justify-between border-border border-b px-4">
				<h2 class="font-semibold text-foreground text-sm">Settings</h2>
				<button
					type="button"
					onclick={close}
					aria-label="Close"
					class="grid size-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
				>
					<IconX size={16} stroke={1.6} />
				</button>
			</div>

			<div class="flex flex-col divide-y divide-border">
				<div class="flex items-center justify-between gap-3 px-4 py-2.5">
					<label for="appearance" class="text-foreground text-xs">Appearance</label>
					<div
						class="relative inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-card pr-2 pl-2.5 text-xs"
					>
						<AppearanceGlyph
							size={14}
							stroke={1.6}
							class="pointer-events-none text-muted-foreground"
						/>
						<select
							id="appearance"
							value={prefs.appearance}
							onchange={(e) => prefs.set("appearance", e.currentTarget.value as Appearance)}
							class="appearance-none bg-transparent pr-4 font-medium text-foreground outline-none"
						>
							{#each APPEARANCE as option (option.id)}
								<option value={option.id}>{option.label}</option>
							{/each}
						</select>
						<IconChevronDown
							size={14}
							stroke={1.6}
							class="pointer-events-none absolute right-2 text-muted-foreground"
						/>
					</div>
				</div>

				<div class="flex items-center justify-between gap-3 px-4 py-2.5">
					<span class="text-foreground text-xs">Primary</span>
					<div class="flex items-center gap-1.5">
						{#each PRIMARIES as swatch (swatch.id)}
							<button
								type="button"
								onclick={() => prefs.set("primary", swatch.id)}
								aria-pressed={prefs.primary === swatch.id}
								aria-label={swatch.name}
								title={swatch.name}
								style:background={swatch.primary || "var(--foreground)"}
								class="grid size-5 place-items-center rounded-full text-background ring-offset-2 ring-offset-background transition-shadow aria-pressed:ring-2 aria-pressed:ring-foreground/40"
							>
								{#if prefs.primary === swatch.id}
									<IconCheck size={12} stroke={2.4} />
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

			<p
				class="mt-auto border-border border-t px-4 py-3 text-[11px] text-muted-foreground leading-relaxed"
			>
				Framework and language apply to every code block on the site. Primary rewrites
				<code class="font-mono">--primary</code> for this tab only.
			</p>
		</div>
	</div>
{/if}

<style>
	.drawer {
		animation: drawer-in var(--duration-drawer) var(--ease-drawer);
	}

	@keyframes drawer-in {
		from {
			transform: translateX(100%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.drawer {
			animation: none;
		}
	}
</style>
