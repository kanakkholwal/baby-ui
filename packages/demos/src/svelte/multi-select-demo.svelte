<script lang="ts">
import { MultiSelect, type MultiSelectSize } from "@baby-ui/svelte";
import { TEAM_MEMBERS } from "../data/utility-inputs";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let value = $state(["ana", "dev"]);
</script>

<div class="flex w-full max-w-sm flex-col gap-1.5">
	<span id="reviewers-label" class="font-medium text-sm">Reviewers</span>
	<MultiSelect
		aria-labelledby="reviewers-label"
		options={TEAM_MEMBERS}
		bind:value
		maxChips={Number(props.maxChips ?? 3)}
		size={(props.size as MultiSelectSize) ?? "md"}
		disabled={Boolean(props.disabled)}
		labels={{ placeholder: "Add reviewers…", search: "Search people…" }}
	/>
</div>
