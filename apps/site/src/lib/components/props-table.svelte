<script lang="ts">
import type { PropSpec } from "@baby-ui/registry-schema";
import IconChevronDown from "@tabler/icons-svelte/icons/chevron-down";
import { prefersReducedMotion } from "svelte/motion";
import { slide } from "svelte/transition";

let { props: specs }: { props: PropSpec[] } = $props();

let open = $state<Record<string, boolean>>({});
const duration = $derived(prefersReducedMotion.current ? 0 : 200);
</script>

{#if specs.length}
	<div class="overflow-hidden rounded-xl border border-border">
		<table class="w-full border-collapse text-left">
			<thead>
				<tr class="border-border border-b">
					<th
						scope="col"
						class="w-[42%] px-4 py-2.5 font-medium text-muted-foreground text-xs sm:w-[30%]"
					>
						Prop
					</th>
					<th scope="col" class="px-4 py-2.5 font-medium text-muted-foreground text-xs">
						Type
					</th>
					<th scope="col" class="w-10"><span class="sr-only">Details</span></th>
				</tr>
			</thead>
			<tbody>
				{#each specs as prop (prop.name)}
					{@const expanded = Boolean(open[prop.name])}
					<tr class="border-border/60 border-b last:border-b-0">
						<td colspan="3" class="p-0">
							<button
								type="button"
								aria-expanded={expanded}
								onclick={() => (open[prop.name] = !expanded)}
								class="grid w-full grid-cols-[42%_1fr_2.5rem] items-center text-left transition-colors hover:bg-foreground/[0.03] sm:grid-cols-[30%_1fr_2.5rem]"
							>
								<span class="px-4 py-3 font-mono text-[13px] text-sky-400">
									{prop.name}{prop.required ? "" : "?"}
								</span>
								<span class="px-4 py-3 font-mono text-[13px] text-foreground">
									{prop.type}
								</span>
								<span class="flex justify-center px-2 text-muted-foreground">
									<IconChevronDown
										size={16}
										stroke={1.6}
										class="transition-transform duration-[var(--duration-dropdown)] ease-[var(--ease-out)] motion-reduce:transition-none"
										style={expanded ? "transform: rotate(180deg)" : undefined}
									/>
								</span>
							</button>

							{#if expanded}
								<div transition:slide={{ duration }} class="overflow-hidden">
									<div class="border-border/60 border-t px-4 py-3">
										<p class="text-foreground text-sm">{prop.description}</p>
										<dl class="mt-3 grid grid-cols-[6rem_1fr] items-baseline gap-y-1">
											<dt class="text-muted-foreground text-sm">Default</dt>
											<dd class="font-mono text-[13px] text-foreground">
												{prop.default === undefined ? "—" : String(prop.default)}
											</dd>
										</dl>
									</div>
								</div>
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}
