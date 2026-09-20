<script lang="ts">
import { Question } from "@baby-ui/svelte";

let answered = $state(false);
const options = [
	{ id: "react", label: "React" },
	{ id: "svelte", label: "Svelte" },
	{ id: "both", label: "Both" },
];
</script>

<Question
	bind:answered
	question="Which port do you want?"
	{options}
	onanswer={(ids) => console.log(ids)}
/>
