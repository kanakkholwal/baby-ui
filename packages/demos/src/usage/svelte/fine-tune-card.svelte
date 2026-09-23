<script lang="ts">
import { FineTuneCard } from "@baby-ui/svelte";
</script>

<FineTuneCard
	labels={{ title: "Button" }}
	fields={[
		{ key: "width", label: "W", value: 120, min: 40, max: 400 },
		{ key: "radius", label: "Radius", value: 8, min: 0, max: 32 },
	]}
	options={["Primary", "Secondary"]}
/>
