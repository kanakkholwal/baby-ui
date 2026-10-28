<script lang="ts">
import { RadioGroup, RadioGroupItem } from "@baby-ui/svelte";

let value = $state("hobby");
</script>

<RadioGroup bind:value variant="card" name="plan">
	<RadioGroupItem value="hobby" label="Hobby" description="For side projects." />
	<RadioGroupItem value="pro" label="Pro" description="For teams shipping daily." />
</RadioGroup>
