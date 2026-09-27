"use client";

import { type ComponentProps, useEffect, useRef } from "react";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "../input-group/input-group";
import { cn } from "../lib/cn";
import { Shortcut } from "../shortcut/shortcut";
import { Spinner } from "../spinner/spinner";
import { type SearchInputSize, searchInput } from "./variants";

export type { SearchInputSize };

export interface SearchInputProps
	extends Omit<ComponentProps<"input">, "value" | "onChange" | "size" | "type"> {
	/** Controlled query. */
	value: string;
	onValueChange: (value: string) => void;
	/** Fires once typing pauses for `debounceMs`, and at once on clear or Enter. */
	onSearch?: (query: string) => void;
	debounceMs?: number;
	/** Swaps the leading icon for a spinner while results load. */
	loading?: boolean;
	/** Focuses the field, e.g. `"mod+k"`. The hint shows while the field is empty. */
	shortcut?: string;
	size?: SearchInputSize;
	clearLabel?: string;
	loadingLabel?: string;
}

export function SearchInput({
	value,
	onValueChange,
	onSearch,
	debounceMs = 250,
	loading = false,
	shortcut,
	size = "md",
	clearLabel = "Clear search",
	loadingLabel = "Searching",
	placeholder = "Search…",
	className,
	onKeyDown,
	"aria-label": ariaLabel = "Search",
	...props
}: SearchInputProps) {
	const s = searchInput({ size });
	const input = useRef<HTMLInputElement>(null);
	const search = useRef(onSearch);
	search.current = onSearch;
	const skip = useRef(true);

	// Debounced; the first run is skipped so mounting with a value doesn't search.
	useEffect(() => {
		if (skip.current) {
			skip.current = false;
			return;
		}
		const timer = setTimeout(() => search.current?.(value), debounceMs);
		return () => clearTimeout(timer);
	}, [value, debounceMs]);

	function clear() {
		onValueChange("");
		search.current?.("");
		input.current?.focus();
	}

	return (
		<InputGroup size={size} data-slot="search-input" className={cn(s.root(), className)}>
			<InputGroupAddon>
				{loading ? (
					<Spinner size="sm" label={loadingLabel} />
				) : (
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-hidden
						className={s.icon()}
					>
						<path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
						<path d="M21 21l-6 -6" />
					</svg>
				)}
			</InputGroupAddon>
			<InputGroupInput
				ref={input}
				type="search"
				value={value}
				placeholder={placeholder}
				aria-label={ariaLabel}
				className={s.input()}
				onChange={(e) => onValueChange(e.currentTarget.value)}
				onKeyDown={(e) => {
					if (e.key === "Escape" && value) {
						e.preventDefault();
						clear();
					} else if (e.key === "Enter") onSearch?.(value);
					onKeyDown?.(e);
				}}
				{...props}
			/>
			{value ? (
				<InputGroupAddon align="inline-end">
					<InputGroupButton
						size="icon-xs"
						aria-label={clearLabel}
						className={s.clear()}
						onClick={clear}
					>
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							aria-hidden
						>
							<path d="M18 6 6 18M6 6l12 12" />
						</svg>
					</InputGroupButton>
				</InputGroupAddon>
			) : null}
			{shortcut ? (
				// Kept mounted while hidden so the shortcut still focuses a non-empty field.
				<InputGroupAddon align="inline-end" className={value ? "hidden" : undefined}>
					<Shortcut
						shortcut={shortcut}
						size="sm"
						joined
						onTrigger={() => input.current?.focus()}
					/>
				</InputGroupAddon>
			) : null}
		</InputGroup>
	);
}
