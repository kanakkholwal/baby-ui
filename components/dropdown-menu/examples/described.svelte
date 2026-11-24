<script lang="ts">
import { Button, button } from "@baby-ui/components/svelte/button";
import {
	ButtonGroup,
	ButtonGroupSeparator,
} from "@baby-ui/components/svelte/button-group";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@baby-ui/components/svelte/dropdown-menu";

const PATHS = {
	copy: "M8 8h12v12H8zM16 8V4H4v12h4",
	file: "M6 3h8l5 5v13H6zM14 3v5h5M9 13h6M9 17h6",
	link: "M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7L11.5 6.8M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.5-1.5",
	out: "M7 17 17 7M8 7h9v9",
	chevron: "m6 9 6 6 6-6",
	spark:
		"M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8",
} as const;
</script>

{#snippet icon(name: keyof typeof PATHS, cls = "")}
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class={cls}>
		<path d={PATHS[name]} />
	</svg>
{/snippet}

{#snippet row(name: keyof typeof PATHS, title: string, hint: string)}
	<span class="mt-0.5 self-start text-muted-foreground">{@render icon(name, "size-4")}</span>
	<span class="flex min-w-0 flex-col">
		<span class="truncate font-medium">{title}</span>
		<span class="truncate text-muted-foreground text-xs">{hint}</span>
	</span>
{/snippet}

<ButtonGroup aria-label="Copy prompt">
	<Button variant="secondary" roundness="full">
		{@render icon("spark")}
		Copy prompt
	</Button>
	<ButtonGroupSeparator />
	<DropdownMenu>
		<DropdownMenuTrigger
			aria-label="More prompt actions"
			class={button({ variant: "secondary", size: "icon", roundness: "full" })}
		>
			{@render icon("chevron")}
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end" class="w-80">
			<DropdownMenuItem class="justify-start gap-3 px-3 py-2">
				{@render row("copy", "Copy page", "Copy page as Markdown for LLMs")}
			</DropdownMenuItem>
			<DropdownMenuItem class="justify-start gap-3 px-3 py-2">
				{#snippet child({ props })}
					<a {...props} href="/docs.md" target="_blank" rel="noopener">
						{@render row("file", "View as Markdown", "View page as Markdown format")}
						{@render icon("out", "ml-auto size-3.5 shrink-0 text-muted-foreground/70")}
					</a>
				{/snippet}
			</DropdownMenuItem>
			<DropdownMenuItem class="justify-start gap-3 px-3 py-2">
				{@render row("link", "Copy link", "Share this page with a teammate")}
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</ButtonGroup>
