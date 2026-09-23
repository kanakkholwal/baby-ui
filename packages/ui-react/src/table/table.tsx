"use client";

import { type ComponentProps, createContext, useContext } from "react";
import { cn } from "../lib/cn";
import { type TableDensity, table } from "./variants";

const DensityContext = createContext<TableDensity>("comfortable");

export interface TableProps extends ComponentProps<"table"> {
	density?: TableDensity;
	containerClassName?: string;
}

export function Table({
	density = "comfortable",
	className,
	containerClassName,
	...props
}: TableProps) {
	const { container, root } = table({ density });
	return (
		<DensityContext.Provider value={density}>
			<div data-slot="table-container" className={cn(container(), containerClassName)}>
				<table data-slot="table" className={cn(root(), className)} {...props} />
			</div>
		</DensityContext.Provider>
	);
}

export function TableHeader({ className, ...props }: ComponentProps<"thead">) {
	const { header } = table({ density: useContext(DensityContext) });
	return (
		<thead data-slot="table-header" className={cn(header(), className)} {...props} />
	);
}

export function TableBody({ className, ...props }: ComponentProps<"tbody">) {
	const { body } = table({ density: useContext(DensityContext) });
	return <tbody data-slot="table-body" className={cn(body(), className)} {...props} />;
}

export function TableFooter({ className, ...props }: ComponentProps<"tfoot">) {
	const { footer } = table({ density: useContext(DensityContext) });
	return (
		<tfoot data-slot="table-footer" className={cn(footer(), className)} {...props} />
	);
}

export function TableRow({ className, ...props }: ComponentProps<"tr">) {
	const { row } = table({ density: useContext(DensityContext) });
	return <tr data-slot="table-row" className={cn(row(), className)} {...props} />;
}

export function TableHead({ className, ...props }: ComponentProps<"th">) {
	const { head } = table({ density: useContext(DensityContext) });
	return <th data-slot="table-head" className={cn(head(), className)} {...props} />;
}

export function TableCell({ className, ...props }: ComponentProps<"td">) {
	const { cell } = table({ density: useContext(DensityContext) });
	return <td data-slot="table-cell" className={cn(cell(), className)} {...props} />;
}

export function TableCaption({ className, ...props }: ComponentProps<"caption">) {
	const { caption } = table({ density: useContext(DensityContext) });
	return (
		<caption data-slot="table-caption" className={cn(caption(), className)} {...props} />
	);
}
