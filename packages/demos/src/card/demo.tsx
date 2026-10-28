"use client";

import {
	Badge,
	Button,
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function CardDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Card>>(props);
	return (
		<Card
			interactive={p.interactive !== false}
			variant={p.variant ?? "default"}
			className="w-full max-w-md"
		>
			<CardHeader>
				<CardTitle className="text-base">baby-ui</CardTitle>
				<CardDescription>baby-ui.nexonauts.com</CardDescription>
				<CardAction>
					<Badge variant="secondary">Next.js</Badge>
				</CardAction>
			</CardHeader>
			<CardContent className="flex flex-col gap-3 text-sm">
				<div className="flex items-center gap-2">
					<span className="size-2 rounded-full bg-success" aria-hidden />
					<span className="font-medium text-foreground">Ready</span>
					<span className="ml-auto text-muted-foreground">Production</span>
					<span className="text-muted-foreground">Deployed 2h ago</span>
				</div>
				<div className="flex items-center gap-2 rounded-lg bg-foreground/[0.04] px-3 py-2">
					<svg
						viewBox="0 0 16 16"
						fill="none"
						aria-hidden
						className="size-4 shrink-0 text-muted-foreground"
					>
						<path
							d="M5 3v10M5 6a3 3 0 0 0 6 0"
							stroke="currentColor"
							strokeWidth="1.4"
							strokeLinecap="round"
						/>
						<circle cx="5" cy="3" r="1.5" stroke="currentColor" strokeWidth="1.4" />
						<circle cx="11" cy="4" r="1.5" stroke="currentColor" strokeWidth="1.4" />
						<circle cx="5" cy="13" r="1.5" stroke="currentColor" strokeWidth="1.4" />
					</svg>
					<span className="font-medium text-foreground">main</span>
					<span className="truncate text-muted-foreground">
						feat(select): unfold from the trigger edge
					</span>
					<span className="ml-auto shrink-0 font-mono text-muted-foreground text-xs">
						20a9de6
					</span>
				</div>
			</CardContent>
			<CardFooter className="justify-end">
				<Button size="sm" variant="outline">
					Visit
				</Button>
				<Button size="sm">View deployment</Button>
			</CardFooter>
		</Card>
	);
}
