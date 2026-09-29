<script lang="ts">
import { Field, FieldDescription, FieldLabel, PhoneInput } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof PhoneInput>>(props));

let phone = $state("");
let country = $state("US");

// The controls panel picks the country; the picker inside the field can change it too.
$effect(() => {
	if (typeof props.country === "string") country = props.country;
});
</script>

<Field class="w-full max-w-sm">
	<FieldLabel for="demo-phone">Mobile number</FieldLabel>
	<PhoneInput
		id="demo-phone"
		bind:value={phone}
		bind:country
		size={p.size ?? "md"}
	/>
	<FieldDescription>
		Stored as <span class="font-mono">{phone || "…"}</span>
	</FieldDescription>
</Field>
