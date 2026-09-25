<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";
import type { FooterColumn, FooterSocialLink } from "./types";
import { type FooterLayout, footer } from "./variants";

let {
	brand,
	description,
	columns,
	socials = [],
	copyright,
	wordmark,
	layout = "split",
	class: className,
}: {
	brand?: Snippet;
	description?: string;
	columns: FooterColumn[];
	socials?: FooterSocialLink[];
	copyright?: Snippet;
	/** Giant background wordmark text; omit to skip that section entirely. */
	wordmark?: string;
	/** Brand beside the link columns, or centred above them. */
	layout?: FooterLayout;
	class?: string;
} = $props();

const styles = $derived(footer({ layout }));
</script>

<footer data-slot="footer" data-layout={layout} class={cn(styles.root(), className)}>
	<div class={styles.inner()}>
		<div class={styles.grid()}>
			<div class={styles.brandBlock()}>
				{#if brand}
					<span class="inline-flex items-center gap-2.5">{@render brand()}</span>
				{/if}
				{#if description}
					<p class={styles.description()}>{description}</p>
				{/if}
				{#if socials.length}
					<div class={styles.socials()}>
						{#each socials as social (social.href)}
							<a
								href={social.href}
								aria-label={social.label}
								target={social.href.startsWith("http") ? "_blank" : undefined}
								rel={social.href.startsWith("http") ? "noreferrer" : undefined}
								class={styles.social()}
							>
								{@render social.icon()}
							</a>
						{/each}
					</div>
				{/if}
				{#if copyright}
					<p class={styles.copyright()}>{@render copyright()}</p>
				{/if}
			</div>

			<div class={styles.columns()}>
				{#each columns as column (column.title)}
					<div>
						<h4 class={styles.columnTitle()}>{column.title}</h4>
						<ul class={styles.links()}>
							{#each column.links as link (link.href)}
								<li>
									<a
										href={link.href}
										target={link.external ? "_blank" : undefined}
										rel={link.external ? "noreferrer" : undefined}
										class={styles.link()}
									>
										{link.label}
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>
	</div>

	{#if wordmark}
		<div class={styles.wordmarkWrap()}>
			<span class={styles.wordmark()}>{wordmark}</span>
		</div>
	{/if}
</footer>
