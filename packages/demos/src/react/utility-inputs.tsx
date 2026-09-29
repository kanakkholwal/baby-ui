import {
	FileUpload,
	MultiSelect,
	NumberInput,
	SearchInput,
	type UploadFile,
} from "@baby-ui/react";
import { type ComponentProps, useEffect, useRef, useState } from "react";
import { controlProps } from "../data/preview-props";
import {
	AVATAR_MAX_BYTES,
	SEARCHABLE,
	TEAM_MEMBERS,
	UPLOAD_TICK_MS,
} from "../data/utility-inputs";

type Props = Record<string, unknown>;

export function FileUploadDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof FileUpload>>(props);
	const [files, setFiles] = useState<UploadFile[]>([]);
	const timers = useRef(new Map<string, ReturnType<typeof setInterval>>());
	const retried = useRef(new Set<string>());

	useEffect(() => {
		const map = timers.current;
		return () => {
			for (const timer of map.values()) clearInterval(timer);
		};
	}, []);

	// Stands in for a real upload request reporting progress.
	function upload(id: string) {
		setFiles((list) =>
			list.map((f) =>
				f.id === id ? { ...f, status: "uploading", progress: 0, error: undefined } : f,
			),
		);
		const timer = setInterval(() => {
			setFiles((list) =>
				list.map((f) => {
					if (f.id !== id || f.status !== "uploading") return f;
					const progress = Math.min(100, f.progress + 12 + Math.random() * 14);
					if (progress < 100) return { ...f, progress };
					clearInterval(timers.current.get(id));
					// Every third file fails once, so retry has something to do.
					const fails = f.file.name.length % 3 === 0 && !retried.current.has(id);
					return fails
						? { ...f, progress: 100, status: "error", error: "Network error" }
						: { ...f, progress: 100, status: "done" };
				}),
			);
		}, UPLOAD_TICK_MS);
		timers.current.set(id, timer);
	}

	return (
		<div className="w-full max-w-md">
			<FileUpload
				files={files}
				accept="image/*,.pdf"
				maxSize={AVATAR_MAX_BYTES}
				maxFiles={4}
				size={p.size ?? "md"}
				disabled={p.disabled ?? false}
				onFilesAdded={(added) => {
					const next = added.map((file) => ({
						id: crypto.randomUUID(),
						file,
						progress: 0,
						status: "queued" as const,
					}));
					setFiles((list) => [...list, ...next]);
					for (const item of next) upload(item.id);
				}}
				onRetry={(id) => {
					retried.current.add(id);
					upload(id);
				}}
				onRemove={(id) => {
					clearInterval(timers.current.get(id));
					setFiles((list) => list.filter((f) => f.id !== id));
				}}
			/>
		</div>
	);
}

export function NumberInputDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof NumberInput>>(props);
	const size = p.size ?? "md";
	const [seats, setSeats] = useState<number | null>(5);
	const [budget, setBudget] = useState<number | null>(1200);
	return (
		<div className="flex w-full max-w-60 flex-col gap-5">
			<NumberInput
				label="Seats"
				value={seats}
				onValueChange={setSeats}
				min={1}
				max={50}
				size={size}
				disabled={p.disabled ?? false}
			/>
			<NumberInput
				label="Monthly budget"
				value={budget}
				onValueChange={setBudget}
				min={0}
				step={50}
				largeStep={500}
				formatOptions={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
				size={size}
				disabled={p.disabled ?? false}
			/>
		</div>
	);
}

export function SearchInputDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof SearchInput>>(props);
	const [query, setQuery] = useState("");
	const [results, setResults] = useState(SEARCHABLE);
	const [loading, setLoading] = useState(false);
	const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
	useEffect(() => () => clearTimeout(timer.current), []);

	return (
		<div className="flex w-full max-w-sm flex-col gap-3">
			<SearchInput
				value={query}
				onValueChange={setQuery}
				shortcut="/"
				placeholder="Search components…"
				loading={loading || (p.loading ?? false)}
				size={p.size ?? "md"}
				onSearch={(q) => {
					// Stands in for a request to your search endpoint.
					setLoading(true);
					clearTimeout(timer.current);
					timer.current = setTimeout(() => {
						setResults(
							SEARCHABLE.filter((name) => name.toLowerCase().includes(q.toLowerCase())),
						);
						setLoading(false);
					}, 350);
				}}
			/>
			<ul className="flex flex-col gap-1 text-muted-foreground text-sm">
				{results.slice(0, 5).map((name) => (
					<li key={name}>{name}</li>
				))}
				{results.length === 0 ? <li>No components match.</li> : null}
			</ul>
		</div>
	);
}

export function MultiSelectDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof MultiSelect>>(props);
	const [value, setValue] = useState(["ana", "dev"]);
	return (
		<div className="flex w-full max-w-sm flex-col gap-1.5">
			<span id="reviewers-label" className="font-medium text-sm">
				Reviewers
			</span>
			<MultiSelect
				aria-labelledby="reviewers-label"
				options={TEAM_MEMBERS}
				value={value}
				onValueChange={setValue}
				maxChips={Number(props.maxChips ?? 3)}
				size={p.size ?? "md"}
				disabled={p.disabled ?? false}
				labels={{ placeholder: "Add reviewers…", search: "Search people…" }}
			/>
		</div>
	);
}
