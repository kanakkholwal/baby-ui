"use client";

import {
	Button,
	Command,
	CommandBar,
	CommandDialog,
	CommandEmpty,
	CommandFilter,
	CommandFilters,
	CommandFooter,
	CommandGroup,
	CommandHeader,
	CommandHint,
	CommandInput,
	CommandItem,
	CommandList,
	CommandShortcut,
	type CommandVariant,
} from "@baby-ui/react";
import { useState } from "react";
import { COMMAND_ALL, COMMAND_GROUPS } from "../data/command";

type Props = Record<string, unknown>;

function CommandIcon({ d }: { d: string }) {
	return (
		<svg viewBox="0 0 16 16" fill="none" aria-hidden>
			<path
				d={d}
				stroke="currentColor"
				strokeWidth="1.4"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

const COMMAND_VARIANTS: CommandVariant[] = ["default", "framed", "launcher", "spotlight"];

export function CommandDemo({ props }: { props: Props }) {
	const [open, setOpen] = useState(false);
	const [last, setLast] = useState("");
	const [filter, setFilter] = useState("all");
	const variant = COMMAND_VARIANTS.find((v) => v === props.variant) ?? "default";
	const placeholder =
		typeof props.placeholder === "string" && props.placeholder
			? props.placeholder
			: variant === "spotlight"
				? "What are you searching for?"
				: "Type a command or search…";
	const groups =
		filter === "all" ? COMMAND_GROUPS : COMMAND_GROUPS.filter((g) => g.id === filter);

	function run(id: string) {
		setLast(id);
		setOpen(false);
	}

	return (
		<div className="flex flex-col items-center gap-3">
			<Button variant="outline" onClick={() => setOpen(true)}>
				Open palette
			</Button>
			{last ? <p className="text-muted-foreground text-xs">Ran: {last}</p> : null}
			<CommandDialog open={open} onOpenChange={setOpen} variant={variant}>
				<Command>
					{variant === "framed" ? <CommandHeader>Command</CommandHeader> : null}
					{variant === "launcher" ? (
						<CommandBar>
							<CommandInput placeholder={placeholder} hint="⌘K" />
							<CommandFilters value={filter} onValueChange={setFilter} label="Show">
								{[COMMAND_ALL, ...COMMAND_GROUPS].map((group) => (
									<CommandFilter key={group.id} value={group.id} label={group.heading}>
										<CommandIcon d={group.icon} />
									</CommandFilter>
								))}
							</CommandFilters>
						</CommandBar>
					) : variant === "spotlight" ? (
						<>
							<CommandFilters value={filter} onValueChange={setFilter} label="Scope">
								{[COMMAND_ALL, ...COMMAND_GROUPS].map((group) => (
									<CommandFilter key={group.id} value={group.id} label={group.heading}>
										{group.heading}
									</CommandFilter>
								))}
							</CommandFilters>
							<CommandInput placeholder={placeholder} hint="Esc" />
						</>
					) : (
						<CommandInput placeholder={placeholder} />
					)}
					<CommandList>
						<CommandEmpty>
							{typeof props.emptyLabel === "string" ? props.emptyLabel : "No results"}
						</CommandEmpty>
						{groups.map((group) => (
							<CommandGroup key={group.id} heading={group.heading}>
								{group.items.map((item) => (
									<CommandItem
										key={item.value}
										value={item.value}
										keywords={item.keywords}
										onClick={() => run(item.value)}
									>
										<CommandIcon d={group.icon} />
										<span className="min-w-0 flex-1 truncate">{item.value}</span>
										{"shortcut" in item && item.shortcut ? (
											<CommandShortcut>{item.shortcut}</CommandShortcut>
										) : null}
									</CommandItem>
								))}
							</CommandGroup>
						))}
					</CommandList>
					{variant === "launcher" ? (
						<CommandFooter>
							<span className="flex items-center gap-4">
								<CommandHint keys={["↑", "↓"]}>Move</CommandHint>
								<CommandHint keys={["↵"]}>Open</CommandHint>
							</span>
							<CommandHint keys={["Esc"]}>Close</CommandHint>
						</CommandFooter>
					) : null}
				</Command>
			</CommandDialog>
		</div>
	);
}
