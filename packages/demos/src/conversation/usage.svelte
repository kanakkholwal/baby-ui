<script lang="ts">
import {
	Composer,
	ComposerActions,
	ComposerChip,
	ComposerContext,
	ComposerFooter,
	ComposerInput,
	ComposerMenuIcon,
	ComposerMenuItem,
	ComposerMenuLabel,
	ComposerMenuTitle,
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
	Conversation,
	ConversationContent,
	ConversationFooter,
	ConversationScrollButton,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	Message,
	MessageBubble,
	MessageContent,
	Reasoning,
	ReasoningDuration,
	ReasoningIcon,
	ReasoningTitle,
	ReasoningTrigger,
} from "@baby-ui/svelte";

const PATHS = {
	branch:
		"M6 3v12M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 9a9 9 0 0 1-9 9",
	folder: "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z",
	clip: "M21 12.5 12.7 20.8a5 5 0 0 1-7.1-7.1l8.5-8.5a3.3 3.3 0 0 1 4.7 4.7l-8.5 8.5a1.7 1.7 0 0 1-2.4-2.4l7.8-7.8",
	infinity: "M18.2 8.5a4 4 0 1 0 0 7c2.5-2 3.8-7-6.2-7s-8.7 5-6.2 7a4 4 0 1 0 0-7",
	chat: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z",
	plan: "M9 6h11M9 12h11M9 18h11M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2",
};

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
const MODELS = [
	{ value: "fable-5", name: "Fable 5" },
	{ value: "sonnet-5", name: "Sonnet 5" },
];

let turns = $state([
	{ id: 1, text: "Redesign the pricing page hero and tighten the CTA copy." },
]);
let thinking = $state(true);
let branch = $state("Main");
let project = $state("project-sea");
let agent = $state("Agent");
let model = $state("fable-5");

// Stands in for your request: the reply lands after a moment and the thinking row goes away.
$effect(() => {
	if (!thinking) return;
	const timer = setTimeout(() => (thinking = false), 4000);
	return () => clearTimeout(timer);
});
</script>

{#snippet glyph(d: string, size?: string)}
	<svg class={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path {d} /></svg>
{/snippet}

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

<Conversation class="h-[26rem] w-full max-w-xl">
	<ConversationContent>
		{#each turns as turn (turn.id)}
			<Message align="end" animated={false}>
				<MessageContent>
					<MessageBubble variant="card">{turn.text}</MessageBubble>
				</MessageContent>
			</Message>
		{/each}
		{#if thinking}
			<Reasoning thinking duration={1.6}>
				<ReasoningTrigger>
					<ReasoningIcon />
					<ReasoningTitle>Thought for 1.6s</ReasoningTitle>
					<ReasoningDuration />
				</ReasoningTrigger>
			</Reasoning>
		{/if}
	</ConversationContent>
	<ConversationScrollButton />
	<ConversationFooter>
		<Composer
			onSubmit={(text) => {
				turns = [...turns, { id: turns.length + 1, text }];
				thinking = true;
			}}
		>
			<ComposerFooter>
				{@render pick(BRANCHES, branch, (next) => (branch = next))}
				{@render pick(PROJECTS, project, (next) => (project = next))}
				<span class="ms-auto flex items-center gap-2">
					{@render pick(AGENTS, agent, (next) => (agent = next))}
					<ComposerContext percent={57} class="ms-0" />
				</span>
			</ComposerFooter>
			<ComposerInput placeholder="Ask me anything" minRows={1} />
			<ComposerToolbar>
				<ComposerActions>
					<ComposerMenuLabel>Add</ComposerMenuLabel>
					<ComposerMenuItem>
						<ComposerMenuIcon>{@render glyph(PATHS.clip, "size-4")}</ComposerMenuIcon>
						<ComposerMenuTitle>Files and folders</ComposerMenuTitle>
					</ComposerMenuItem>
				</ComposerActions>
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
						</ComposerModelContent>
					</ComposerModelPicker>
					<ComposerVoice />
					<ComposerSubmit />
				</ComposerTools>
			</ComposerToolbar>
		</Composer>
	</ConversationFooter>
</Conversation>
