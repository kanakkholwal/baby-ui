<script lang="ts">
import { IconBrandReact, IconBrandSvelte } from "@baby-ui/icons";
import { Badge, Button, Switch } from "@baby-ui/svelte";
import Logo from "./logo.svelte";

const PORTS = [
	{ name: "React", icon: IconBrandReact, file: "button.tsx" },
	{ name: "Svelte", icon: IconBrandSvelte, file: "button.svelte" },
];
</script>

<!-- Baby UI's own idea as the cover: one spec feeds two identical ports. -->
<section
	aria-label="Baby UI: one spec, two frameworks, source you own"
	class="not-prose relative isolate flex flex-col gap-8 overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8"
>
	<div
		aria-hidden="true"
		class="absolute inset-0 -z-10 bg-[radial-gradient(var(--border-strong)_1px,transparent_1px)] bg-size-[18px_18px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
	></div>

	<div class="flex flex-col gap-2">
		<span
			class="flex items-center gap-3 whitespace-nowrap font-display font-semibold text-4xl text-foreground tracking-tight sm:text-5xl"
		>
			<Logo class="size-10 shrink-0 sm:size-12" />
			Baby UI
		</span>
		<span class="text-lg text-muted-foreground sm:text-xl">
			One spec. Two frameworks. Source you own.
		</span>
	</div>

	<div
		aria-hidden="true"
		inert
		class="hidden grid-cols-[minmax(0,1fr)_2.5rem_minmax(0,1.25fr)] items-center gap-3 sm:grid"
	>
		<div
			class="min-w-0 rounded-xl border border-border bg-background p-4 font-mono text-xs leading-relaxed shadow-sm"
		>
			<p class="mb-1.5 text-muted-foreground">button.ts</p>
			<p><span class="text-primary">defineComponent</span>({"{"}</p>
			<p class="ps-3">slug: <span class="text-success">"button"</span>,</p>
			<p class="ps-3">variant: [<span class="text-success">"default"</span>, …],</p>
			<p class="ps-3">
				size: [<span class="text-success">"sm"</span>, <span class="text-success">"md"</span>],
			</p>
			<p>{"}"})</p>
		</div>

		<svg viewBox="0 0 40 120" class="h-28 w-10 text-border-strong" fill="none">
			<path
				d="M0 60 C20 60 20 20 40 20 M0 60 C20 60 20 100 40 100"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-dasharray="3 4"
			/>
		</svg>

		<div class="flex min-w-0 flex-col gap-3">
			{#each PORTS as port (port.name)}
				{@const Glyph = port.icon}
				<div
					class="flex min-w-0 flex-col gap-3 rounded-xl border border-border bg-background p-3 shadow-sm"
				>
					<div class="flex items-center justify-between gap-2">
						<span class="flex min-w-0 items-center gap-1.5 truncate text-muted-foreground text-xs">
							<Glyph size={13} />{port.file}
						</span>
						<Badge size="sm" variant="secondary">{port.name}</Badge>
					</div>
					<div class="flex flex-wrap items-center gap-2">
						<Button size="sm">Deploy</Button>
						<Button size="sm" variant="outline">Preview</Button>
						<Switch checked size="sm" aria-label="Auto deploy" class="ms-auto" />
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
