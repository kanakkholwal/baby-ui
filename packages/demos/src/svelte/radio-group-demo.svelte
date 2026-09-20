<script lang="ts">
import { RadioGroup, RadioGroupItem } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let value = $state("weekly");
</script>

<RadioGroup
	bind:value
	orientation={(props.orientation as "vertical" | "horizontal") ?? "vertical"}
	variant={(props.variant as "default" | "card") ?? "default"}
	size={(props.size as "sm" | "md" | "lg" | "xl") ?? "md"}
	disabled={Boolean(props.disabled)}
	name="demo-radio"
>
	<RadioGroupItem value="daily" label="Daily digest" />
	<RadioGroupItem value="weekly" label="Weekly summary" />
	<RadioGroupItem value="never" label="Never" />
</RadioGroup>
