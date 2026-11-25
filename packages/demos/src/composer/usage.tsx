"use client";

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
	DropdownMenuTrigger,
} from "@baby-ui/react";
import { useState } from "react";

function Icon({ d, className }: { d: string; className?: string }) {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden
		>
			<path d={d} />
		</svg>
	);
}

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

const EFFORTS = ["Minimal", "Low", "Medium", "High", "Extra high", "Max"];

type Option = { name: string; icon: string };

function Pick({
	options,
	value,
	onChange,
}: {
	options: Option[];
	value: string;
	onChange: (next: string) => void;
}) {
	const current = options.find((option) => option.name === value) ?? options[0];
	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={<ComposerChip icon={<Icon d={current?.icon ?? ""} />} menu />}
			>
				{value}
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" side="top" size="sm" className="w-max min-w-40">
				{options.map((option) => (
					<ComposerMenuItem key={option.name} onClick={() => onChange(option.name)}>
						<ComposerMenuIcon>
							<Icon d={option.icon} className="size-4" />
						</ComposerMenuIcon>
						<ComposerMenuTitle>{option.name}</ComposerMenuTitle>
					</ComposerMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

const BRANCHES = [
	{ name: "Main", icon: PATHS.branch },
	{ name: "feature/pricing", icon: PATHS.branch },
];
const PROJECTS = [
	{ name: "project-sea", icon: PATHS.folder },
	{ name: "docs", icon: PATHS.folder },
];
const AGENTS = [
	{ name: "Agent", icon: PATHS.infinity },
	{ name: "Ask", icon: PATHS.chat },
	{ name: "Plan", icon: PATHS.plan },
];

export function Example({ send }: { send?: (text: string) => void }) {
	const [value, setValue] = useState("");
	const [files, setFiles] = useState<string[]>([]);
	const [branch, setBranch] = useState("Main");
	const [project, setProject] = useState("project-sea");
	const [agent, setAgent] = useState("Agent");
	const [mode, setMode] = useState("Auto");
	const [model, setModel] = useState("fable-5");
	const [effort, setEffort] = useState(2);
	const permission = PERMISSIONS.find((entry) => entry.name === mode) ?? PERMISSIONS[0];

	return (
		<Composer value={value} onValueChange={setValue} onSubmit={(text) => send?.(text)}>
			<ComposerFooter>
				<Pick options={BRANCHES} value={branch} onChange={setBranch} />
				<Pick options={PROJECTS} value={project} onChange={setProject} />
				<span className="ms-auto flex items-center gap-2">
					<Pick options={AGENTS} value={agent} onChange={setAgent} />
					<ComposerContext percent={57} className="ms-0" />
				</span>
			</ComposerFooter>
			<ComposerFiles>
				{files.map((name) => (
					<ComposerAttachment
						key={name}
						name={name}
						icon={<Icon d={PATHS.sheet} />}
						onRemove={() => setFiles((all) => all.filter((entry) => entry !== name))}
					/>
				))}
			</ComposerFiles>
			<ComposerInput placeholder="Hi, what do you need today?" minRows={1} />
			<ComposerToolbar>
				<ComposerActions>
					<ComposerMenuLabel>Add</ComposerMenuLabel>
					<ComposerMenuItem
						onClick={() => setFiles((all) => [...all, `file-${all.length + 1}.xlsx`])}
					>
						<ComposerMenuIcon>
							<Icon d={PATHS.clip} className="size-4" />
						</ComposerMenuIcon>
						<ComposerMenuTitle>Files and folders</ComposerMenuTitle>
					</ComposerMenuItem>
					<ComposerMenuItem>
						<ComposerMenuIcon>
							<Icon d={PATHS.goal} className="size-4" />
						</ComposerMenuIcon>
						<ComposerMenuTitle>Goal</ComposerMenuTitle>
						<ComposerMenuHint>Set a goal for faster results</ComposerMenuHint>
					</ComposerMenuItem>
					<ComposerMenuItem>
						<ComposerMenuIcon>
							<Icon d={PATHS.plan} className="size-4" />
						</ComposerMenuIcon>
						<ComposerMenuTitle>Plan mode</ComposerMenuTitle>
						<ComposerMenuHint>Manage complex tasks</ComposerMenuHint>
					</ComposerMenuItem>
					<ComposerMenuLabel>Plugins</ComposerMenuLabel>
					{PLUGINS.map((plugin) => (
						<ComposerMenuItem key={plugin.name}>
							<ComposerMenuIcon>
								<span
									className={`grid size-4 place-items-center rounded text-white ${plugin.tone}`}
								>
									<Icon d={plugin.icon} className="size-2.5" />
								</span>
							</ComposerMenuIcon>
							<ComposerMenuTitle>{plugin.name}</ComposerMenuTitle>
							<ComposerMenuHint>{plugin.hint}</ComposerMenuHint>
						</ComposerMenuItem>
					))}
				</ComposerActions>
				<DropdownMenu>
					<DropdownMenuTrigger
						render={<ComposerMode icon={<Icon d={permission?.icon ?? PATHS.gauge} />} />}
					>
						{mode}
					</DropdownMenuTrigger>
					<DropdownMenuContent
						align="start"
						side="top"
						size="sm"
						className="w-max min-w-72"
					>
						<ComposerMenuLabel className="flex items-center justify-between">
							Permissions
							<span className="font-normal">Learn more</span>
						</ComposerMenuLabel>
						{PERMISSIONS.map((entry) => (
							<ComposerMenuItem key={entry.name} onClick={() => setMode(entry.name)}>
								<ComposerMenuIcon>
									<Icon d={entry.icon} className="size-4" />
								</ComposerMenuIcon>
								<ComposerMenuTitle>{entry.name}</ComposerMenuTitle>
								<ComposerMenuHint>{entry.hint}</ComposerMenuHint>
							</ComposerMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
				<ComposerTools>
					<ComposerModelPicker>
						<ComposerModelTrigger>
							{MODELS.find((entry) => entry.value === model)?.name}
						</ComposerModelTrigger>
						<ComposerModelContent>
							<ComposerModelLabel>Models</ComposerModelLabel>
							<ComposerModelGroup value={model} onValueChange={setModel}>
								{MODELS.map((entry) => (
									<ComposerModelItem
										key={entry.value}
										value={entry.value}
										label={entry.name}
									/>
								))}
							</ComposerModelGroup>
							<ComposerEffort
								value={effort}
								onValueChange={setEffort}
								levels={EFFORTS.length}
								format={(n) => EFFORTS[n] ?? ""}
							/>
						</ComposerModelContent>
					</ComposerModelPicker>
					<ComposerVoice />
					<ComposerSubmit />
				</ComposerTools>
			</ComposerToolbar>
		</Composer>
	);
}
