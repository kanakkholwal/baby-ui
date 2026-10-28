"use client";

import { Button, Toaster, toast } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

// One example per toast tone.
const TOAST_EXAMPLES: { label: string; run: () => unknown }[] = [
	{ label: "Title only", run: () => toast.success("Saved") },
	{
		label: "Promise",
		run: () => {
			// A shared `description` on toast.promise() would show on every state; updating
			// the same id by hand gives loading and success their own.
			const id = toast.loading("Publishing component", {
				description: "Bundling source, preview, and registry metadata.",
			});
			setTimeout(() => {
				toast.success("Component published", {
					id,
					description: "Registry endpoint and raw source are available.",
				});
			}, 1800);
		},
	},
	{
		label: "Success",
		run: () =>
			toast.success("Component published", {
				description: "Registry endpoint and raw source are available.",
			}),
	},
	{
		label: "Error",
		run: () =>
			toast.error("Snapshot failed", {
				description: "Retry after the browser target settles.",
			}),
	},
	{
		label: "Warning",
		run: () =>
			toast.warning("Quota at 90%", {
				description: "Builds pause when the month's minutes run out.",
			}),
	},
	{
		label: "Info",
		run: () =>
			toast.info("New version available", { description: "Reload to pick up 0.4.2." }),
	},
	{
		label: "Action",
		run: () =>
			toast("Invite sent", {
				description: "mia@acme.dev can join the workspace.",
				action: { label: "Undo", onClick: () => toast("Invite withdrawn") },
			}),
	},
];

export function ToastDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Toaster>>(props);
	const position = p.position ?? "bottom-right";
	return (
		<div className="flex flex-col items-center gap-4">
			<div className="flex flex-wrap items-center justify-center gap-2">
				{TOAST_EXAMPLES.map((example) => (
					<Button
						key={example.label}
						variant="outline"
						size="sm"
						className="rounded-full"
						onClick={example.run}
					>
						{example.label}
					</Button>
				))}
				<Button
					variant="ghost"
					size="sm"
					className="rounded-full"
					onClick={() => toast.dismiss()}
				>
					Clear
				</Button>
			</div>
			<p className="max-w-sm text-center text-muted-foreground text-xs leading-5">
				Toasts render fixed on the screen. Change the position in the controls to open
				from another edge.
			</p>
			<Toaster
				position={position}
				expand={p.expand ?? true}
				closeButton={p.closeButton ?? true}
			/>
		</div>
	);
}
