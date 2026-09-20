<script lang="ts">
import { RadioGroup } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let value = $state("weekly");

const options = [
	{ value: "daily", label: "Daily digest" },
	{ value: "weekly", label: "Weekly summary" },
	{ value: "never", label: "Never" },
];
</script>

<RadioGroup
	{options}
	bind:value
	orientation={(props.orientation as "vertical" | "horizontal") ?? "vertical"}
	disabled={Boolean(props.disabled)}
	name="demo-radio"
/>
