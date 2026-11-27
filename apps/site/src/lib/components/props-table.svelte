<script lang="ts">
import type { PropSpec } from "@baby-ui/registry-schema";
import { Markdown } from "@baby-ui/svelte/markdown";

let { props: specs }: { props: PropSpec[] } = $props();

// A description that starts with "PartName: " belongs to that part; the rest apply to the root.
const PART = /^([A-Z][A-Za-z0-9]+):\s+/;
// A type made only of string literals reads better as chips than as a run of mono text.
const LITERALS = /^("[^"]*"|'[^']*')(\s*\|\s*("[^"]*"|'[^']*'))*$/;

const COLUMNS = "sm:grid-cols-[10rem_minmax(0,1fr)_minmax(6rem,12rem)]";

type Row = { spec: PropSpec; description: string; options: string[] | null };
type Group = { part: string | null; rows: Row[] };

const groups = $derived.by(() => {
	const byPart = new Map<string | null, Group>();
	for (const spec of specs) {
		const match = spec.description.match(PART);
		const part = match?.[1] ?? null;
		const group = byPart.get(part) ?? { part, rows: [] };
		const options = LITERALS.test(spec.type.trim())
			? spec.type.split("|").map((option) => option.trim().replace(/^["']|["']$/g, ""))
			: null;
		group.rows.push({
			spec,
			description: match ? spec.description.slice(match[0].length) : spec.description,
			options,
		});
		byPart.set(part, group);
	}
	// The root's props lead; each part follows in the order it first appears.
	return [...byPart.values()].sort(
		(a, b) => Number(a.part !== null) - Number(b.part !== null),
	);
});
const named = $derived(groups.some((group) => group.part !== null));

function when(spec: PropSpec): string | null {
	const entries = Object.entries(spec.showWhen ?? {});
	if (!entries.length) return null;
	return entries
		.map(([name, values]) => `${name} is ${[values].flat().join(" or ")}`)
		.join(", ");
}
</script>

{#if specs.length}
	<div class="flex flex-col gap-8">
		{#each groups as group (group.part ?? "root")}
			<div>
				{#if named}
					<h3 class="mb-3 font-medium font-mono text-foreground text-sm">
						{group.part ?? "Root"}
					</h3>
				{/if}
				<!-- A card-surface rim around a page-coloured well: 16px outer, 8px padding, 8px inner. -->
				<div class="rounded-2xl bg-card p-2 sm:pt-0">
					<div
						aria-hidden="true"
						class="hidden gap-4 px-4 py-3 font-medium text-muted-foreground text-xs sm:grid {COLUMNS}"
					>
						<span>Prop</span>
						<span>Type</span>
						<span class="justify-self-end">Default</span>
					</div>
					<dl class="divide-y divide-border/50 rounded-[0.5rem] bg-background">
						{#each group.rows as row (row.spec.name)}
							{@const condition = when(row.spec)}
							<div class="grid grid-cols-1 gap-2 px-4 py-3 sm:gap-4 {COLUMNS}">
								<dt class="flex h-fit min-w-0 flex-wrap items-center gap-2">
									<code
										class="w-fit rounded-md bg-foreground/5 px-2 py-0.5 font-mono text-foreground text-xs wrap-anywhere"
									>
										{row.spec.name}
									</code>
									{#if row.spec.required}
										<span class="text-muted-foreground text-xs">Required</span>
									{/if}
								</dt>
								<dd class="m-0 min-w-0">
									{#if row.options}
										<span class="flex flex-wrap gap-1">
											{#each row.options as option (option)}
												<code
													class="rounded-md bg-foreground/5 px-2 py-0.5 font-mono text-foreground text-xs"
												>
													{option}
												</code>
											{/each}
										</span>
									{:else}
										<code
											class="w-fit rounded-md bg-foreground/5 px-2 py-0.5 font-mono text-foreground text-xs wrap-anywhere"
										>
											{row.spec.type}
										</code>
									{/if}
									<div class="mt-1.5 text-muted-foreground text-sm">
										<Markdown content={row.description} />
									</div>
									{#if condition}
										<p class="mt-1 text-muted-foreground text-xs">Applies when {condition}</p>
									{/if}
								</dd>
								<dd class="m-0 flex min-w-0 items-baseline gap-2 sm:justify-self-end">
									<span class="text-muted-foreground text-xs sm:sr-only">Default</span>
									<code
										class="h-fit w-fit min-w-0 rounded-md bg-foreground/5 px-2 py-0.5 font-mono text-foreground text-xs wrap-anywhere"
									>
										{row.spec.default === undefined ? "none" : String(row.spec.default)}
									</code>
								</dd>
							</div>
						{/each}
					</dl>
				</div>
			</div>
		{/each}
	</div>
{/if}
