import { ContextMenu } from "@baby-ui/react";

const items = [
	{ id: "rename", label: "Rename" },
	{ id: "duplicate", label: "Duplicate" },
	{ id: "delete", label: "Delete", destructive: true },
];

export function Example() {
	return (
		<ContextMenu items={items} onSelect={(id) => console.log(id)}>
			<div className="grid h-32 place-items-center rounded-xl border border-border border-dashed text-muted-foreground text-sm">
				Right-click anywhere here
			</div>
		</ContextMenu>
	);
}
