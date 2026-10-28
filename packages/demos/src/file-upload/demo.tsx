import {
	FileUpload,
	FileUploadDropzone,
	FileUploadError,
	FileUploadItem,
	FileUploadList,
	type UploadFile,
} from "@baby-ui/react";
import { type ComponentProps, useEffect, useRef, useState } from "react";
import { controlProps } from "../data/preview-props";
import { AVATAR_MAX_BYTES, sampleUploads, UPLOAD_TICK_MS } from "../data/utility-inputs";

type Props = Record<string, unknown>;

export function FileUploadDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof FileUpload>>(props);
	const [files, setFiles] = useState<UploadFile[]>(sampleUploads);
	const timers = useRef(new Map<string, ReturnType<typeof setInterval>>());
	const retried = useRef(new Set<string>());

	// Once on mount: start the queued samples.
	useEffect(() => {
		const map = timers.current;
		for (const f of sampleUploads()) if (f.status === "queued") upload(f.id);
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
				accept="image/*,.pdf,.csv"
				maxSize={AVATAR_MAX_BYTES}
				maxFiles={5}
				compactAt={3}
				variant={p.variant ?? "default"}
				size={p.size ?? "default"}
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
			>
				<FileUploadDropzone />
				<FileUploadError />
				<FileUploadList>
					{files.map((file) => (
						<FileUploadItem
							key={file.id}
							file={file}
							onRetry={() => {
								retried.current.add(file.id);
								upload(file.id);
							}}
							onRemove={() => {
								clearInterval(timers.current.get(file.id));
								setFiles((list) => list.filter((f) => f.id !== file.id));
							}}
						/>
					))}
				</FileUploadList>
			</FileUpload>
		</div>
	);
}
