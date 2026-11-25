<script lang="ts">
import {
	Composer,
	ComposerActions,
	ComposerAttachment,
	ComposerChip,
	ComposerContext,
	ComposerEffort,
	ComposerFiles,
	ComposerFooter,
	ComposerInput,
	ComposerMenuHint,
	ComposerMenuIcon,
	ComposerMenuItem,
	ComposerMenuLabel,
	ComposerMenuTitle,
	ComposerMode,
	ComposerModelContent,
	ComposerModelGroup,
	ComposerModelItem,
	ComposerModelLabel,
	ComposerModelPicker,
	ComposerModelTrigger,
	ComposerSubmit,
	ComposerToolbar,
	ComposerTools,
	ComposerVoice,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@baby-ui/svelte";

let { send }: { send?: (text: string) => void } = $props();

const PATHS = {
	branch:
		"M6 3v12M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 9a9 9 0 0 1-9 9",
	folder: "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z",
	clip: "M21 12.5 12.7 20.8a5 5 0 0 1-7.1-7.1l8.5-8.5a3.3 3.3 0 0 1 4.7 4.7l-8.5 8.5a1.7 1.7 0 0 1-2.4-2.4l7.8-7.8",
	goal: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 12h.01M12 3v3M12 18v3M3 12h3M18 12h3",
	plan: "M9 6h11M9 12h11M9 18h11M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2",
	gauge: "M12 14l4-4M3.5 14a9 9 0 1 1 17 0",
	manual:
		"M6 3v12M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 9c0 5-6 5-12 6",
	route: "M7 5v10a3 3 0 0 0 3 3h7M17 5v14M4 8l3-3 3 3M14 16l3 3 3-3",
	shield: "M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6ZM9 12l2 2 4-4",
	file: "M6 3h8l5 5v13H6zM14 3v5h5",
	sheet: "M4 4h16v16H4zM4 10h16M10 4v16",
	slides: "M3 5h18v11H3zM8 21h8M12 16v5",
	code: "m8 8-4 4 4 4M16 8l4 4-4 4",
	chat: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z",
	infinity: "M18.2 8.5a4 4 0 1 0 0 7c2.5-2 3.8-7-6.2-7s-8.7 5-6.2 7a4 4 0 1 0 0-7",
};

const PLUGINS = [
	{
		name: "Documents",
		hint: "Create and edit documents",
		icon: PATHS.file,
		tone: "bg-muted-foreground",
	},
	{
		name: "Spreadsheets",
		hint: "Generate spreadsheets",
		icon: PATHS.sheet,
		tone: "bg-chart-1",
	},
	{
		name: "Presentations",
		hint: "Create marketing assets",
		icon: PATHS.slides,
		tone: "bg-chart-5",
	},
	{
		name: "Code blocks",
		hint: "Write and edit existing code",
		icon: PATHS.code,
		tone: "bg-chart-3",
	},
];

const PERMISSIONS = [
	{ name: "Auto", hint: "Agent decides by itself", icon: PATHS.gauge },
	{ name: "Manual", hint: "Always ask before making a change", icon: PATHS.manual },
	{ name: "Plan mode", hint: "Create a plan before proceeding", icon: PATHS.route },
	{ name: "Bypass all", hint: "Agent handles permission decisions", icon: PATHS.shield },
];

const MODELS = [
	{ value: "fable-5", name: "Fable 5" },
	{ value: "sonnet-5", name: "Sonnet 5" },
	{ value: "gpt-5-6-mini", name: "GPT-5.6 Mini" },
];

type Option = { name: string; icon: string };

const BRANCHES: Option[] = [
	{ name: "Main", icon: PATHS.branch },
	{ name: "feature/pricing", icon: PATHS.branch },
];
const PROJECTS: Option[] = [
	{ name: "project-sea", icon: PATHS.folder },
	{ name: "docs", icon: PATHS.folder },
];
const AGENTS: Option[] = [
	{ name: "Agent", icon: PATHS.infinity },
	{ name: "Ask", icon: PATHS.chat },
	{ name: "Plan", icon: PATHS.plan },
];

const EFFORTS = ["Minimal", "Low", "Medium", "High", "Extra high", "Max"];

let value = $state("");
let files = $state<string[]>([]);
let branch = $state("Main");
let project = $state("project-sea");
let agent = $state("Agent");
let mode = $state("Auto");
let model = $state("fable-5");
let effort = $state(2);
const permission = $derived(
	PERMISSIONS.find((entry) => entry.name === mode) ?? PERMISSIONS[0],
);
</script>

{#snippet glyph(d: string, size?: string)}
	<svg class={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path {d} /></svg>
{/snippet}
{#snippet sheetIcon()}{@render glyph(PATHS.sheet)}{/snippet}
{#snippet modeIcon()}{@render glyph(permission?.icon ?? PATHS.gauge)}{/snippet}

{#snippet pick(options: Option[], current: string, onChange: (next: string) => void)}
	{@const active = options.find((option) => option.name === current) ?? options[0]}
	<DropdownMenu>
		<DropdownMenuTrigger>
			{#snippet child({ props: trigger })}
				<ComposerChip menu {...trigger}>
					{#snippet icon()}{@render glyph(active?.icon ?? "")}{/snippet}
					{current}
				</ComposerChip>
			{/snippet}
		</DropdownMenuTrigger>
		<DropdownMenuContent align="start" side="top" size="sm" class="w-max min-w-40">
			{#each options as option (option.name)}
				<ComposerMenuItem onSelect={() => onChange(option.name)}>
					<ComposerMenuIcon>{@render glyph(option.icon, "size-4")}</ComposerMenuIcon>
					<ComposerMenuTitle>{option.name}</ComposerMenuTitle>
				</ComposerMenuItem>
			{/each}
		</DropdownMenuContent>
	</DropdownMenu>
{/snippet}

<Composer bind:value onSubmit={(text) => send?.(text)}>
	<ComposerFooter>
		{@render pick(BRANCHES, branch, (next) => (branch = next))}
		{@render pick(PROJECTS, project, (next) => (project = next))}
		<span class="ms-auto flex items-center gap-2">
			{@render pick(AGENTS, agent, (next) => (agent = next))}
			<ComposerContext percent={57} class="ms-0" />
		</span>
	</ComposerFooter>
	<ComposerFiles>
		{#each files as name (name)}
			<ComposerAttachment {name} icon={sheetIcon} onRemove={() => (files = files.filter((entry) => entry !== name))} />
		{/each}
	</ComposerFiles>
	<ComposerInput placeholder="Hi, what do you need today?" minRows={1} />
	<ComposerToolbar>
		<ComposerActions>
			<ComposerMenuLabel>Add</ComposerMenuLabel>
			<ComposerMenuItem onSelect={() => (files = [...files, `file-${files.length + 1}.xlsx`])}>
				<ComposerMenuIcon>{@render glyph(PATHS.clip, "size-4")}</ComposerMenuIcon>
				<ComposerMenuTitle>Files and folders</ComposerMenuTitle>
			</ComposerMenuItem>
			<ComposerMenuItem>
				<ComposerMenuIcon>{@render glyph(PATHS.goal, "size-4")}</ComposerMenuIcon>
				<ComposerMenuTitle>Goal</ComposerMenuTitle>
				<ComposerMenuHint>Set a goal for faster results</ComposerMenuHint>
			</ComposerMenuItem>
			<ComposerMenuItem>
				<ComposerMenuIcon>{@render glyph(PATHS.plan, "size-4")}</ComposerMenuIcon>
				<ComposerMenuTitle>Plan mode</ComposerMenuTitle>
				<ComposerMenuHint>Manage complex tasks</ComposerMenuHint>
			</ComposerMenuItem>
			<ComposerMenuLabel>Plugins</ComposerMenuLabel>
			{#each PLUGINS as plugin (plugin.name)}
				<ComposerMenuItem>
					<ComposerMenuIcon>
						<span class="grid size-4 place-items-center rounded text-white {plugin.tone}">{@render glyph(plugin.icon, "size-2.5")}</span>
					</ComposerMenuIcon>
					<ComposerMenuTitle>{plugin.name}</ComposerMenuTitle>
					<ComposerMenuHint>{plugin.hint}</ComposerMenuHint>
				</ComposerMenuItem>
			{/each}
		</ComposerActions>
		<DropdownMenu>
			<DropdownMenuTrigger>
				{#snippet child({ props: trigger })}
					<ComposerMode icon={modeIcon} {...trigger}>{mode}</ComposerMode>
				{/snippet}
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" side="top" size="sm" class="w-max min-w-72">
				<ComposerMenuLabel class="flex items-center justify-between">
					Permissions
					<span class="font-normal">Learn more</span>
				</ComposerMenuLabel>
				{#each PERMISSIONS as entry (entry.name)}
					<ComposerMenuItem onSelect={() => (mode = entry.name)}>
						<ComposerMenuIcon>{@render glyph(entry.icon, "size-4")}</ComposerMenuIcon>
						<ComposerMenuTitle>{entry.name}</ComposerMenuTitle>
						<ComposerMenuHint>{entry.hint}</ComposerMenuHint>
					</ComposerMenuItem>
				{/each}
			</DropdownMenuContent>
		</DropdownMenu>
		<ComposerTools>
			<ComposerModelPicker>
				<ComposerModelTrigger>{MODELS.find((entry) => entry.value === model)?.name}</ComposerModelTrigger>
				<ComposerModelContent>
					<ComposerModelLabel>Models</ComposerModelLabel>
					<ComposerModelGroup bind:value={model}>
						{#each MODELS as entry (entry.value)}
							<ComposerModelItem value={entry.value} label={entry.name} />
						{/each}
					</ComposerModelGroup>
					<ComposerEffort bind:value={effort} levels={EFFORTS.length} format={(n) => EFFORTS[n] ?? ""} />
				</ComposerModelContent>
			</ComposerModelPicker>
			<ComposerVoice />
			<ComposerSubmit />
		</ComposerTools>
	</ComposerToolbar>
</Composer>
