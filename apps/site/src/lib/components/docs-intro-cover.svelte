<script lang="ts">
import { IconBrandReact, IconBrandSvelte } from "@baby-ui/icons";
import { Badge, Button, Switch } from "@baby-ui/svelte";
import Logo from "./logo.svelte";

const PORTS = [
	{ name: "React", icon: IconBrandReact, file: "button.tsx" },
	{ name: "Svelte", icon: IconBrandSvelte, file: "button.svelte" },
];
</script>

<!-- Baby UI's own idea as the cover: one spec on the left feeds two identical ports on the right. -->
<section
	aria-label="Baby UI: one spec, two frameworks, source you own"
	class="not-prose relative isolate grid min-h-80 gap-8 overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-10 lg:grid-cols-[1fr_auto]"
>
	<div
		aria-hidden="true"
		class="absolute inset-0 -z-10 bg-[radial-gradient(var(--border-strong)_1px,transparent_1px)] bg-size-[18px_18px] [mask-image:linear-gradient(to_right,black,transparent_70%)]"
	></div>

	<div class="flex flex-col justify-end gap-4 self-end">
		<span
			class="flex items-center gap-3 font-display font-semibold text-5xl text-foreground tracking-tight"
		>
			<Logo class="size-12" />
			Baby UI
		</span>
		<span class="max-w-md text-foreground text-xl sm:text-2xl">
			One spec. Two frameworks. Source you own.
		</span>
	</div>

	<div aria-hidden="true" inert class="hidden items-center gap-5 self-center sm:flex">
		<div
			class="w-52 rounded-xl border border-border bg-background p-3 font-mono text-[11px] leading-relaxed shadow-sm"
		>
			<p class="mb-1 text-muted-foreground">button.ts</p>
			<p><span class="text-primary">defineComponent</span>({"{"}</p>
			<p class="ps-3">slug: <span class="text-success">"button"</span>,</p>
			<p class="ps-3">variant: [<span class="text-success">"default"</span>, …],</p>
			<p class="ps-3">
				size: [<span class="text-success">"sm"</span>, <span class="text-success">"md"</span>],
			</p>
			<p>{"}"})</p>
		</div>

		<svg viewBox="0 0 40 120" class="h-32 w-10 shrink-0 text-border-strong" fill="none">
			<path
				d="M0 60 C20 60 20 20 40 20 M0 60 C20 60 20 100 40 100"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-dasharray="3 4"
			/>
		</svg>

		<div class="flex flex-col gap-3">
			{#each PORTS as port (port.name)}
				{@const Glyph = port.icon}
				<div
					class="flex w-56 flex-col gap-3 rounded-xl border border-border bg-background p-3 shadow-sm"
				>
					<div class="flex items-center justify-between">
						<span class="flex items-center gap-1.5 text-muted-foreground text-xs">
							<Glyph size={13} />{port.file}
						</span>
						<Badge size="sm" variant="secondary">{port.name}</Badge>
					</div>
					<div class="flex items-center gap-2">
						<Button size="sm">Deploy</Button>
						<Button size="sm" variant="outline">Preview</Button>
						<Switch checked size="sm" aria-label="Auto deploy" class="ms-auto" />
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
