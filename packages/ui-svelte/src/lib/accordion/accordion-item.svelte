<script lang="ts">
let {
	title,
	content,
	open = false,
	ontoggle,
}: { title: string; content: string; open?: boolean; ontoggle?: () => void } = $props();

const id = $props.id();
</script>

<div>
	<button
		type="button"
		aria-expanded={open}
		aria-controls={id}
		onclick={ontoggle}
		class="flex w-full items-center justify-between gap-4 px-4 py-3 text-left font-medium text-foreground text-sm transition-colors hover:bg-foreground/[0.03]"
	>
		{title}
		<svg
			viewBox="0 0 16 16"
			fill="none"
			aria-hidden="true"
			class="size-4 shrink-0 text-muted-foreground transition-[transform,scale,translate] duration-200 ease-[var(--ease-out)] motion-reduce:transition-none"
			style:transform={open ? "rotate(180deg)" : "none"}
		>
			<path d="m4 6 4 4 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	</button>

	<div
		{id}
		role="region"
		class="grid transition-[grid-template-rows] duration-200 ease-[var(--ease-out)] motion-reduce:transition-none"
		style:grid-template-rows={open ? "1fr" : "0fr"}
	>
		<div class="overflow-hidden">
			<p class="px-4 pb-3 text-muted-foreground text-sm leading-relaxed">{content}</p>
		</div>
	</div>
</div>
