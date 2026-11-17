<script lang="ts">
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@baby-ui/svelte";

const FAQ = [
	{
		id: "package",
		title: "Is this an npm package?",
		text: "No. You run the shadcn CLI and it copies the component's source into your project. A few components import a primitive library such as Base UI or bits-ui, which the CLI installs with them.",
	},
	{
		id: "shadcn",
		title: "How is it different from shadcn/ui?",
		text: "It uses the same install flow and the same part and prop names, so it drops into a shadcn project. The extras are a Svelte port of every component, motion built in, and categories like charts, agents and emails.",
	},
	{
		id: "tailwind",
		title: "Which Tailwind version does it need?",
		text: "Tailwind v4. The theme package carries every token the components use, so it also works in a project that never ran shadcn init.",
	},
	{
		id: "edit",
		title: "Can I change the components?",
		text: "Yes, they are your files. Variants live in one file per component, and the classes are plain Tailwind.",
	},
	{
		id: "license",
		title: "What does it cost?",
		text: "The component set on this site is free under Apache-2.0. Paid Pro blocks exist, and nothing in the free set depends on them.",
	},
];
let value = $state<string | string[]>("package");
</script>

<section aria-labelledby="home-faq-heading" class="mx-auto max-w-3xl px-4 pb-24 md:px-8">
	<h2
		id="home-faq-heading"
		class="m-0 font-display font-medium text-3xl text-foreground tracking-[-0.03em] md:text-4xl"
	>
		Questions
	</h2>
	<div class="mt-8">
		<Accordion type="single" collapsible bind:value>
			{#each FAQ as item (item.id)}
				<AccordionItem value={item.id}>
					<AccordionTrigger>{item.title}</AccordionTrigger>
					<AccordionContent>{item.text}</AccordionContent>
				</AccordionItem>
			{/each}
		</Accordion>
	</div>
</section>
