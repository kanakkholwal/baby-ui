import { Button } from "@baby-ui/components/react/button";
import {
	ButtonGroup,
	ButtonGroupSeparator,
} from "@baby-ui/components/react/button-group";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@baby-ui/components/react/dropdown-menu";
import type { ReactNode } from "react";

const PATHS = {
	copy: "M8 8h12v12H8zM16 8V4H4v12h4",
	file: "M6 3h8l5 5v13H6zM14 3v5h5M9 13h6M9 17h6",
	link: "M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7L11.5 6.8M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.5-1.5",
	out: "M7 17 17 7M8 7h9v9",
	chevron: "m6 9 6 6 6-6",
	spark:
		"M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8",
} as const;

function Icon({ name, className }: { name: keyof typeof PATHS; className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			className={className}
		>
			<path d={PATHS[name]} />
		</svg>
	);
}

function Row({
	title,
	hint,
	children,
}: {
	title: string;
	hint: string;
	children: ReactNode;
}) {
	return (
		<>
			<span className="mt-0.5 self-start text-muted-foreground">{children}</span>
			<span className="flex min-w-0 flex-col">
				<span className="truncate font-medium">{title}</span>
				<span className="truncate text-muted-foreground text-xs">{hint}</span>
			</span>
		</>
	);
}

export default function DropdownMenuDescribed() {
	return (
		<ButtonGroup aria-label="Copy prompt">
			<Button variant="secondary" roundness="full">
				<Icon name="spark" />
				Copy prompt
			</Button>
			<ButtonGroupSeparator />
			<DropdownMenu>
				<DropdownMenuTrigger
					render={
						<Button
							variant="secondary"
							roundness="full"
							size="icon"
							aria-label="More prompt actions"
						/>
					}
				>
					<Icon name="chevron" />
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-80">
					<DropdownMenuItem className="justify-start gap-3 px-3 py-2">
						<Row title="Copy page" hint="Copy page as Markdown for LLMs">
							<Icon name="copy" className="size-4" />
						</Row>
					</DropdownMenuItem>
					<DropdownMenuItem
						className="justify-start gap-3 px-3 py-2"
						render={<a href="/docs.md" target="_blank" rel="noopener" />}
					>
						<Row title="View as Markdown" hint="View page as Markdown format">
							<Icon name="file" className="size-4" />
						</Row>
						<Icon
							name="out"
							className="ml-auto size-3.5 shrink-0 text-muted-foreground/70"
						/>
					</DropdownMenuItem>
					<DropdownMenuItem className="justify-start gap-3 px-3 py-2">
						<Row title="Copy link" hint="Share this page with a teammate">
							<Icon name="link" className="size-4" />
						</Row>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</ButtonGroup>
	);
}
