<script lang="ts">
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxGroup,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
	ComboboxTrigger,
} from "@baby-ui/svelte";

let open = $state(false);
let value = $state("");
const regions = [
	{ value: "iad1", label: "Washington, D.C." },
	{ value: "fra1", label: "Frankfurt" },
	{ value: "bom1", label: "Mumbai" },
];
const selected = $derived(regions.find((r) => r.value === value));
</script>

<Combobox bind:open>
	<ComboboxTrigger>{selected?.label ?? "Select region…"}</ComboboxTrigger>
	<ComboboxContent>
		<ComboboxInput placeholder="Search regions…" />
		<ComboboxList>
			<ComboboxEmpty>No matches</ComboboxEmpty>
			<ComboboxGroup>
				{#each regions as region (region.value)}
					<ComboboxItem
						value={region.value}
						keywords={region.label}
						onclick={() => {
							value = region.value;
							open = false;
						}}
					>
						{region.label}
					</ComboboxItem>
				{/each}
			</ComboboxGroup>
		</ComboboxList>
	</ComboboxContent>
</Combobox>
