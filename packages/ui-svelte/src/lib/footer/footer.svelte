<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";
import type { FooterColumn, FooterSocialLink } from "./types";

let {
	brand,
	description,
	columns,
	socials = [],
	copyright,
	wordmark,
	class: className,
}: {
	brand?: Snippet;
	description?: string;
	columns: FooterColumn[];
	socials?: FooterSocialLink[];
	copyright?: Snippet;
	/** Giant background wordmark text; omit to skip that section entirely. */
	wordmark?: string;
	class?: string;
} = $props();
</script>

<footer data-slot="footer" class={cn("@container w-full relative border-border border-t bg-card", className)}>
	<div class="mx-auto max-w-6xl px-6 pt-20 pb-10 @3xl:pt-24 @3xl:pb-12">
		<div class="grid gap-14 @3xl:grid-cols-12">
			<div class="@3xl:col-span-5">
				{#if brand}
					<span class="inline-flex items-center gap-2.5">{@render brand()}</span>
				{/if}
				{#if description}
					<p class="mt-6 max-w-sm text-pretty text-muted-foreground text-sm">{description}</p>
				{/if}
				{#if socials.length}
					<div class="mt-7 flex items-center gap-2">
						{#each socials as social (social.href)}
							<a
								href={social.href}
								aria-label={social.label}
								target={social.href.startsWith("http") ? "_blank" : undefined}
								rel={social.href.startsWith("http") ? "noreferrer" : undefined}
								class="grid size-9 place-items-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:text-foreground motion-reduce:transition-none [&_svg]:size-4"
							>
								{@render social.icon()}
							</a>
						{/each}
					</div>
				{/if}
				{#if copyright}
					<p class="mt-7 text-muted-foreground text-xs">{@render copyright()}</p>
				{/if}
			</div>

			<div class="grid gap-10 @xl:grid-cols-3 @3xl:col-span-7">
				{#each columns as column (column.title)}
					<div>
						<h4 class="font-semibold text-foreground text-sm">{column.title}</h4>
						<ul class="mt-4 space-y-3">
							{#each column.links as link (link.href)}
								<li>
									<a
										href={link.href}
										target={link.external ? "_blank" : undefined}
										rel={link.external ? "noreferrer" : undefined}
										class="text-muted-foreground text-sm transition-colors hover:text-foreground motion-reduce:transition-none"
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
		<div class="relative overflow-hidden px-4 pb-8 @3xl:pb-10">
			<span class="footer-wordmark block select-none text-center font-semibold text-[22cqw] leading-[0.82] tracking-tight">
				{wordmark}
			</span>
		</div>
	{/if}
</footer>
