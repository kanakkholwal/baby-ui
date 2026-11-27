<script lang="ts">
import {
	IconArrowUpRight,
	IconBrandClaude,
	IconBrandCursor,
	IconBrandV0,
	IconChevronDown,
	IconFileText,
	IconLink,
	IconTerminal2,
} from "@baby-ui/icons";
import { Button, button } from "@baby-ui/svelte/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@baby-ui/svelte/dropdown-menu";
import { IconMorph } from "@baby-ui/svelte/icon-morph";
import { cn } from "@baby-ui/svelte/lib/cn";
import origins from "#lib/generated/origins.json";
import { installArgs } from "#lib/install.js";
import { pmCommand } from "#lib/pm.js";
import { prefs } from "#lib/preferences.svelte.js";

let {
	markdownUrl,
	copyText,
	name,
	installSlug,
	subject = "page",
}: {
	markdownUrl: string;
	copyText: string;
	/** What the agents are asked to help with, e.g. "Signature Pad". */
	name: string;
	/** Adds "Copy install command" for a free component. */
	installSlug?: string;
	/** Names the thing the agents are asked about. */
	subject?: string;
} = $props();

let copied = $state<"page" | "link" | "install" | null>(null);
let timer: ReturnType<typeof setTimeout>;

// The canonical URL even in dev or a preview: the agent fetches the page from the public site.
const absolute = $derived(`${origins.site}${markdownUrl}`);
const ask = $derived(
	encodeURIComponent(
		`Read ${absolute} and help me use the Baby UI ${name} ${subject} in my project. Follow its install steps, props, keyboard and accessibility notes.`,
	),
);
const LABEL = { page: "Copied", link: "Link copied", install: "Command copied" } as const;

// No ChatGPT mark ships in @baby-ui/icons (Simple Icons dropped OpenAI), so it stays inline.
const CHATGPT =
	"M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5Z";

const agents = $derived([
	{ label: "ChatGPT", href: `https://chatgpt.com/?hints=search&q=${ask}`, icon: null },
	{ label: "Claude", href: `https://claude.ai/new?q=${ask}`, icon: IconBrandClaude },
	{
		label: "Cursor",
		href: `https://cursor.com/link/prompt?text=${ask}`,
		icon: IconBrandCursor,
	},
	{
		label: "v0",
		href: `https://v0.app/chat?q=${ask}`,
		icon: IconBrandV0,
	},
]);

function flash(kind: "page" | "link" | "install") {
	copied = kind;
	clearTimeout(timer);
	timer = setTimeout(() => (copied = null), 1600);
}

async function copyPage() {
	const res = await fetch(markdownUrl).catch(() => null);
	await navigator.clipboard.writeText(res?.ok ? await res.text() : copyText);
	flash("page");
}

async function copyInstall() {
	if (!installSlug) return;
	const args = installArgs(installSlug);
	await navigator.clipboard.writeText(pmCommand("dlx", args, prefs.pm));
	flash("install");
}

async function copyLink() {
	await navigator.clipboard.writeText(location.href.split("#")[0] ?? location.href);
	flash("link");
}

// Rows are one line: an icon, a title and, for links out, an arrow.
const row = "justify-start gap-3 px-3 py-2";
const lead = "shrink-0 text-muted-foreground";
const trail = "ms-auto shrink-0 text-muted-foreground/70";
</script>

<!-- A split pill: copy on the left, the menu on the right, one soft fill and no border. -->
<div role="group" aria-label="Page actions" class="inline-flex shrink-0 items-center self-start rounded-full bg-secondary">
	<Button variant="ghost" size="sm" class="rounded-full rounded-e-none ps-3 pe-2.5 hover:bg-foreground/[0.06]" onclick={copyPage}>
		<IconMorph name="copy" state={copied !== null} size="sm" class="size-3.5 {copied ? 'text-success-strong' : ''}" />
		<span aria-live="polite">{copied ? LABEL[copied] : "Copy page"}</span>
	</Button>
	<span aria-hidden="true" class="h-4 w-px bg-foreground/15"></span>
	<DropdownMenu>
		<DropdownMenuTrigger
			aria-label="More page actions"
			class={cn(
				button({ variant: "ghost", size: "icon-sm" }),
				"rounded-full rounded-s-none text-muted-foreground hover:bg-foreground/[0.06] hover:text-foreground",
				"[&>svg]:transition-[rotate] [&>svg]:duration-(--duration-exit) [&>svg]:ease-(--ease-ui-out) data-[state=open]:[&>svg]:rotate-180 data-[state=open]:[&>svg]:duration-(--duration-dropdown) motion-reduce:[&>svg]:transition-none",
			)}
		>
			<IconChevronDown size={14} />
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end" collisionPadding={16} class="w-64">
			<DropdownMenuItem class={row}>
				{#snippet child({ props })}
					<a {...props} href={markdownUrl} target="_blank" rel="noopener">
						<IconFileText size={16} class={lead} />
						<span class="font-medium">View as Markdown</span>
						<IconArrowUpRight size={13} class={trail} />
					</a>
				{/snippet}
			</DropdownMenuItem>
			<DropdownMenuItem class={row} onSelect={copyLink}>
				<IconLink size={16} class={lead} />
				<span class="font-medium">Copy page link</span>
			</DropdownMenuItem>
			{#if installSlug}
				<DropdownMenuItem class={row} onSelect={copyInstall}>
					<IconTerminal2 size={16} class={lead} />
					<span class="font-medium">Copy install command</span>
				</DropdownMenuItem>
			{/if}
			<DropdownMenuSeparator />
			{#each agents as agent (agent.label)}
				<DropdownMenuItem class={row}>
					{#snippet child({ props })}
						<a {...props} href={agent.href} target="_blank" rel="noreferrer noopener">
							{#if agent.icon}
								<agent.icon size={16} class={cn(lead, agent.label === "Claude" && "text-[#d97757]")} />
							{:else}
								<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="size-4 shrink-0 text-muted-foreground">
									<path d={CHATGPT} />
								</svg>
							{/if}
							<span class="font-medium">Open in {agent.label}</span>
							<IconArrowUpRight size={13} class={trail} />
						</a>
					{/snippet}
				</DropdownMenuItem>
			{/each}
		</DropdownMenuContent>
	</DropdownMenu>
</div>
