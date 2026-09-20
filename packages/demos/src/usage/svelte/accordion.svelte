<script lang="ts">
import { Accordion } from "@baby-ui/svelte";

const items = [
	{
		id: "own",
		title: "Do I own the code?",
		content: "Yes. Components are copied into your project.",
	},
	{
		id: "update",
		title: "How do updates work?",
		content: "Re-run the add command and diff the result.",
	},
];
</script>

<Accordion {items} collapsible />
