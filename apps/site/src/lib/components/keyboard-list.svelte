<script lang="ts">
import IconArrowDown from "@tabler/icons-svelte/icons/arrow-down";
import IconArrowLeft from "@tabler/icons-svelte/icons/arrow-left";
import IconArrowRight from "@tabler/icons-svelte/icons/arrow-right";
import IconArrowUp from "@tabler/icons-svelte/icons/arrow-up";
import IconArrowsMove from "@tabler/icons-svelte/icons/arrows-move";
import IconBackspace from "@tabler/icons-svelte/icons/backspace";
import IconCornerDownLeft from "@tabler/icons-svelte/icons/corner-down-left";
import IconFocus2 from "@tabler/icons-svelte/icons/focus-2";
import IconSpace from "@tabler/icons-svelte/icons/space";

let { rules }: { rules: string[] } = $props();

type Key = { text: string; icon?: typeof IconArrowDown };

const KEYS: Record<string, Key> = {
	"arrow down": { text: "Down", icon: IconArrowDown },
	"arrow up": { text: "Up", icon: IconArrowUp },
	"arrow left": { text: "Left", icon: IconArrowLeft },
	"arrow right": { text: "Right", icon: IconArrowRight },
	"arrow keys": { text: "Arrows", icon: IconArrowsMove },
	"page up": { text: "PgUp" },
	"page down": { text: "PgDn" },
	"shift+enter": { text: "Shift + Enter", icon: IconCornerDownLeft },
	"shift+tab": { text: "Shift + Tab" },
	enter: { text: "Enter", icon: IconCornerDownLeft },
	space: { text: "Space", icon: IconSpace },
	escape: { text: "Esc" },
	tab: { text: "Tab" },
	home: { text: "Home" },
	end: { text: "End" },
	backspace: { text: "Backspace", icon: IconBackspace },
	comma: { text: "," },
	delete: { text: "Delete" },
};

const NAMES = Object.keys(KEYS).sort((a, b) => b.length - a.length);
const KEY = new RegExp(
	`^(?:${NAMES.map((n) => n.replace("+", "\\+")).join("|")})\\b`,
	"i",
);
const JOIN = /^(?:\s*(?:,|and|or)\s+)/i;

// A rule reads "Enter and Space toggle the panel": keys lead, joined by and/or/commas.
function parse(rule: string): { keys: Key[]; text: string } {
	const keys: Key[] = [];
	let rest = rule;
	for (;;) {
		const m = rest.match(KEY);
		if (!m) break;
		keys.push(KEYS[m[0].toLowerCase()]);
		rest = rest.slice(m[0].length);
		const j = rest.match(JOIN);
		if (!j) break;
		rest = rest.slice(j[0].length);
	}
	if (!keys.length) return { keys, text: rule };
	return { keys, text: rest.trim() };
}

const rows = $derived(rules.map(parse));
</script>

<ul class="flex flex-col gap-1.5">
	{#each rows as row, i (i)}
		<li class="flex items-start gap-2.5 px-1 py-1 text-xs">
			<span class="flex shrink-0 flex-wrap items-center gap-1">
				{#if row.keys.length}
					{#each row.keys as key, k (k)}
						<kbd
							class="inline-flex h-5 min-w-5 items-center gap-1 rounded border border-border bg-card px-1 font-medium font-sans text-[10px] text-foreground"
						>
							{#if key.icon}
								<key.icon size={11} stroke={1.8} />
							{/if}
							{key.text}
						</kbd>
					{/each}
				{:else}
					<span
						class="grid size-5 place-items-center rounded border border-border bg-card text-muted-foreground"
					>
						<IconFocus2 size={11} stroke={1.8} />
					</span>
				{/if}
			</span>
			<span class="pt-0.5 text-muted-foreground leading-relaxed">{row.text}</span>
		</li>
	{/each}
</ul>
