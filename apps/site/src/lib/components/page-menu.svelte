<script lang="ts">
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@baby-ui/svelte";
import IconArrowUpRight from "@tabler/icons-svelte/icons/arrow-up-right";
import IconChevronDown from "@tabler/icons-svelte/icons/chevron-down";
import IconCopy from "@tabler/icons-svelte/icons/copy";
import IconMarkdown from "@tabler/icons-svelte/icons/markdown";

let { markdownUrl, copyText }: { markdownUrl: string; copyText: string } = $props();

let copied = $state(false);
let timer: ReturnType<typeof setTimeout>;

const absolute = $derived(
	typeof location === "undefined"
		? markdownUrl
		: new URL(markdownUrl, location.origin).href,
);
const ask = $derived(
	encodeURIComponent(`Read ${absolute} and help me use this component.`),
);

const agents = $derived([
	{
		label: "Open in v0",
		href: `https://v0.dev/chat/api/open?url=${encodeURIComponent(absolute)}`,
	},
	{ label: "Open in ChatGPT", href: `https://chatgpt.com/?hints=search&q=${ask}` },
	{ label: "Open in Claude", href: `https://claude.ai/new?q=${ask}` },
]);

async function copyPage() {
	await navigator.clipboard.writeText(copyText);
	copied = true;
	clearTimeout(timer);
	timer = setTimeout(() => (copied = false), 1600);
}
</script>

<div class="flex shrink-0 items-center self-start rounded-xl border border-border bg-card/20">
	<button
		type="button"
		onclick={copyPage}
		class="inline-flex h-8 items-center gap-1.5 rounded-l-xl px-2.5 font-medium text-foreground text-xs transition-colors hover:bg-foreground/[0.06]"
	>
		<IconCopy size={14} stroke={1.6} />
		{copied ? "Copied" : "Copy Page"}
	</button>
	<DropdownMenu>
		<DropdownMenuTrigger
			aria-label="Page options"
			class="grid h-8 w-7 place-items-center rounded-l-none rounded-r-xl border-border border-l text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground [&>svg]:transition-[transform,scale,translate,rotate] [&>svg]:duration-[var(--duration-exit)] [&>svg]:ease-[var(--ease-out)] [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg]:duration-[var(--duration-dropdown)] motion-reduce:[&>svg]:transition-none"
		>
			<IconChevronDown size={14} stroke={1.6} />
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end" collisionPadding={16} class="w-52">
			<DropdownMenuItem>
				{#snippet child({ props })}
					<a {...props} href={markdownUrl}>
						<IconMarkdown size={14} stroke={1.5} class="shrink-0" />
						View as Markdown
					</a>
				{/snippet}
			</DropdownMenuItem>
			{#each agents as agent (agent.href)}
				<DropdownMenuItem>
					{#snippet child({ props })}
						<a {...props} href={agent.href} target="_blank" rel="noreferrer noopener">
							<IconArrowUpRight size={14} stroke={1.6} class="shrink-0" />
							{agent.label}
						</a>
					{/snippet}
				</DropdownMenuItem>
			{/each}
		</DropdownMenuContent>
	</DropdownMenu>
</div>
