"use client";

import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandShortcut,
} from "@baby-ui/react";
import { useState } from "react";

export function Example() {
	const [open, setOpen] = useState(false);

	return (
		<>
			<button type="button" onClick={() => setOpen(true)}>
				Open palette
			</button>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<Command>
					<CommandInput />
					<CommandList>
						<CommandEmpty>Nothing matches that.</CommandEmpty>
						<CommandGroup heading="Actions">
							<CommandItem value="New project">
								New project
								<CommandShortcut>N</CommandShortcut>
							</CommandItem>
							<CommandItem value="Deploy" keywords="ship release">
								Deploy
							</CommandItem>
						</CommandGroup>
					</CommandList>
				</Command>
			</CommandDialog>
		</>
	);
}
