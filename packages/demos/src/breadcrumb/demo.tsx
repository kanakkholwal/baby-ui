"use client";

import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@baby-ui/react";
import { type ComponentProps, Fragment } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

// The levels the ellipsis folds away; each stays one click from the menu.
const BREADCRUMB_HIDDEN = [
	{ href: "/components", label: "Components" },
	{ href: "/components/base", label: "Base" },
];

export function BreadcrumbDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Breadcrumb>>(props);
	const collapsed = props.collapsed !== false;
	return (
		<Breadcrumb variant={p.variant ?? "default"} size={p.size ?? "default"}>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="/">Home</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				{collapsed ? (
					<>
						<BreadcrumbItem>
							<DropdownMenu>
								<DropdownMenuTrigger aria-label="Show more levels">
									<BreadcrumbEllipsis />
								</DropdownMenuTrigger>
								<DropdownMenuContent align="start">
									{BREADCRUMB_HIDDEN.map((level) => (
										<DropdownMenuItem
											key={level.href}
											render={<a href={level.href}>{level.label}</a>}
										/>
									))}
								</DropdownMenuContent>
							</DropdownMenu>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
					</>
				) : (
					BREADCRUMB_HIDDEN.map((level) => (
						<Fragment key={level.href}>
							<BreadcrumbItem>
								<BreadcrumbLink href={level.href}>{level.label}</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
						</Fragment>
					))
				)}
				<BreadcrumbItem>
					<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	);
}
