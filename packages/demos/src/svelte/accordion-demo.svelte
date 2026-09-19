<script lang="ts">
import { Accordion } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const items = [
	{
		id: "install",
		title: "How do I install a component?",
		content:
			"Run the CLI command on the Install tab. It copies the source into your project.",
	},
	{
		id: "own",
		title: "Do I own the code?",
		content:
			"Yes. Nothing is imported from a package at runtime, so you can edit any file freely.",
	},
	{
		id: "update",
		title: "How do updates work?",
		content: "Re-run the add command. The CLI will show you a diff before overwriting.",
	},
];
</script>

<div class="w-96">
	<Accordion
		{items}
		multiple={Boolean(props.multiple)}
		collapsible={props.collapsible !== false}
	/>
</div>
