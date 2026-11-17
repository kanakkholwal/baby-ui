<script lang="ts">
const ITEMS = [
	{
		title: "Source, not a dependency",
		text: "The CLI copies files into your repo. Edit them, delete what you don't use, and update when you want to.",
	},
	{
		title: "Your Tailwind tokens",
		text: "Components read colour, radius and motion from CSS variables. One theme file restyles all of them.",
	},
	{
		title: "Keyboard and screen readers",
		text: "Menus, dialogs, selects and tabs sit on Base UI and bits-ui, so focus, roles and arrow keys behave.",
	},
	{
		title: "Light and dark",
		text: "Every component has both modes, and reduced motion removes movement while keeping the colour change.",
	},
	{
		title: "Shadcn-compatible API",
		text: "Part names, data-slot values and the variant and size props follow shadcn, so existing code keeps working.",
	},
	{
		title: "Apache-2.0",
		text: "Free to use in client and commercial work, with no attribution required and no license key for the free set.",
	},
];
</script>

<section aria-labelledby="home-included-heading" class="mx-auto max-w-7xl px-4 pb-24 md:px-8">
	<h2
		id="home-included-heading"
		class="m-0 max-w-2xl font-display font-medium text-3xl text-foreground tracking-[-0.03em] md:text-4xl"
	>
		What you get when you install one
	</h2>
	<dl class="mt-10 grid gap-x-12 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
		{#each ITEMS as item (item.title)}
			<div>
				<dt class="font-medium text-foreground">{item.title}</dt>
				<dd class="m-0 mt-2 text-pretty text-muted-foreground text-sm leading-6">{item.text}</dd>
			</div>
		{/each}
	</dl>
</section>
