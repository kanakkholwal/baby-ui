<script lang="ts">
import type { Heading } from "$lib/docs-nodes";

let { headings }: { headings: Heading[] } = $props();

let active = $state("");
$effect(() => {
	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) if (entry.isIntersecting) active = entry.target.id;
		},
		{ rootMargin: "-20% 0px -70% 0px" },
	);
	for (const h of headings) {
		const el = document.getElementById(h.id);
		if (el) observer.observe(el);
	}
	return () => observer.disconnect();
});
</script>

<nav aria-label="On this page" class="border-border border-l">
	{#each headings as h (h.id)}
		<a
			href="#{h.id}"
			aria-current={active === h.id ? "location" : undefined}
			class={[
				"-ml-px block border-l py-1 pl-3 text-xs transition-colors",
				active === h.id
					? "border-foreground text-foreground"
					: "border-transparent text-muted-foreground hover:text-foreground",
			]}
		>
			{h.label}
		</a>
	{/each}
</nav>
