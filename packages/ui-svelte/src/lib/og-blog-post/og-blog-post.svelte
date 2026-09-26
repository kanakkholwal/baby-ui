<script lang="ts">
import { cn } from "../lib/cn";
import { type OgBlogPostMode, type OgBlogPostTone, ogBlogPost } from "./variants";

let {
	title,
	site,
	logo,
	excerpt,
	category,
	author,
	date,
	readingTime,
	mode = "light",
	tone = "chart",
	class: className,
}: {
	title: string;
	/** Site or publication name shown top left. */
	site: string;
	logo?: string;
	excerpt?: string;
	category?: string;
	author?: { name: string; avatar?: string };
	date?: string;
	readingTime?: string;
	mode?: OgBlogPostMode;
	tone?: OgBlogPostTone;
	class?: string;
} = $props();

const s = $derived(ogBlogPost({ mode, tone }));
const meta = $derived([date, readingTime].filter(Boolean) as string[]);
</script>

<div data-slot="og-blog-post" class={cn(s.root(), className)}>
	<div class={s.grid()}></div>
	<div class={s.glow()}></div>
	<div class={s.header()}>
		<div class={s.brand()}>
			{#if logo}<img src={logo} alt="" class={s.logo()} />{/if}
			<span>{site}</span>
		</div>
		{#if category}<span class={s.category()}>{category}</span>{/if}
	</div>
	<div class={s.body()}>
		<h1 class={s.title()}>{title}</h1>
		{#if excerpt}<p class={s.excerpt()}>{excerpt}</p>{/if}
	</div>
	{#if author || meta.length}
		<div class={s.footer()}>
			{#if author?.avatar}<img src={author.avatar} alt="" class={s.avatar()} />{/if}
			{#if author}<span class={s.author()}>{author.name}</span>{/if}
			{#each meta as item (item)}
				<span class="flex items-center gap-5">
					<span class={s.dot()}></span>
					<span class={s.meta()}>{item}</span>
				</span>
			{/each}
		</div>
	{/if}
</div>
