import { tv, type VariantProps } from "tailwind-variants";

export const fileUpload = tv({
	slots: {
		root: "flex w-full min-w-0 flex-col gap-3",
		zone: [
			"group/zone relative flex w-full cursor-pointer overflow-hidden rounded-2xl border border-border border-dashed bg-background outline-none",
			"transition-[border-color,scale] duration-(--duration-base) ease-(--ease-ui-out) active:scale-[0.99] motion-reduce:transition-none",
			"hover:border-foreground/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
			"data-[dragging=true]:border-foreground",
			"disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-55",
			// A refused drop shakes the zone, the same shake InputOTP uses.
			"data-[nudge=true]:animate-[otp-shake_240ms_var(--ease-ui-out)] motion-reduce:animate-none",
			// Once the list is long the zone folds to a slim bar.
			"data-[compact=true]:min-h-0 data-[compact=true]:flex-row data-[compact=true]:items-center data-[compact=true]:justify-start data-[compact=true]:gap-4 data-[compact=true]:p-3 data-[compact=true]:text-left",
		],
		zoneIcon: [
			"grid shrink-0 place-items-center rounded-full bg-muted text-foreground [&_svg]:size-6",
			"transition-[translate] duration-(--duration-fast) ease-(--ease-ui-out) motion-reduce:transition-none",
			"group-data-[dragging=true]/zone:-translate-y-0.5",
			"group-data-[compact=true]/zone:size-9 group-data-[compact=true]/zone:[&_svg]:size-4",
		],
		zoneCopy: "min-w-0",
		zoneTitle: "block font-medium text-foreground",
		zoneHint: "block text-muted-foreground text-xs",
		// The pill that says what the zone does.
		zoneBrowse:
			"shrink-0 rounded-full border border-border font-medium text-foreground text-xs transition-colors duration-(--duration-fast) group-hover/zone:bg-muted motion-reduce:transition-none",
		list: "flex flex-col gap-2",
		// A row arrives from 8px below as it opens from 0fr, and leaves 6px up as it folds back.
		item: [
			"grid grid-rows-[1fr] transition-[grid-template-rows,opacity,translate] duration-(--duration-base) ease-(--ease-ui-out) starting:translate-y-2 starting:grid-rows-[0fr] starting:opacity-0",
			"data-[leaving=true]:-translate-y-1.5 data-[leaving=true]:grid-rows-[0fr] data-[leaving=true]:opacity-0 data-[leaving=true]:duration-(--duration-fast) motion-reduce:transition-none",
		],
		row: "relative flex min-w-0 items-center gap-3 overflow-hidden rounded-2xl border border-border bg-background p-3",
		// The round file icon: its kind, or a picture of the file when it is an image.
		thumb:
			"grid size-11 shrink-0 place-items-center overflow-hidden rounded-full bg-muted text-muted-foreground [&_svg]:size-5",
		thumbImage: "size-full object-cover",
		body: "min-w-0 flex-1",
		line: "flex items-start justify-between gap-3",
		copy: "min-w-0",
		name: "block truncate font-medium text-foreground text-sm",
		meta: "mt-0.5 block text-muted-foreground text-xs",
		// 24px swap slot for the state: a file, a spinner, a check or a warning.
		status:
			"grid size-6 place-items-center [&_svg]:size-4 [&_svg]:transition-[opacity,translate] [&_svg]:duration-(--duration-fast) [&_svg]:ease-(--ease-ui-out) motion-reduce:[&_svg]:transition-none",
		progress: "mt-3 block h-1.5 overflow-hidden rounded-full bg-muted",
		bar: "block h-full origin-left rounded-full transition-[scale] duration-(--duration-slow) ease-(--ease-ui-out) motion-reduce:transition-none",
		actions: "flex shrink-0 items-center gap-1",
		action:
			"grid size-7 place-items-center rounded-full text-muted-foreground outline-none transition-[color,background-color,scale] duration-(--duration-fast) ease-(--ease-ui-out) hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring active:scale-95 disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none [&_svg]:size-3.5",
	},
	variants: {
		/** `default` is the stacked, centred block; `inline` is a row. */
		variant: {
			default: {
				zone: "min-h-56 flex-col items-center justify-center gap-3 p-7 text-center",
				zoneIcon: "size-16 border border-border",
				zoneCopy: "max-w-xs",
				zoneTitle: "text-base",
				zoneHint: "mt-1 leading-5",
				zoneBrowse: "mt-1 px-4 py-2",
			},
			inline: {
				zone: "items-center gap-4 p-5 text-left",
				zoneIcon: "size-14",
				zoneCopy: "flex-1",
				zoneTitle: "text-sm",
				zoneHint: "mt-0.5",
				zoneBrowse: "px-3.5 py-2",
			},
		},
		size: {
			sm: {
				zone: "data-[compact=false]:min-h-40 data-[compact=false]:p-5",
				zoneIcon: "size-12",
				thumb: "size-9 [&_svg]:size-4",
			},
			default: {},
		},
		/** One file's state; the item reads it for its colours and its bar. */
		status: {
			queued: { status: "text-muted-foreground", progress: "hidden" },
			uploading: { status: "text-foreground", bar: "bg-primary" },
			done: { status: "text-success-strong", bar: "bg-success" },
			error: {
				status: "text-destructive",
				meta: "text-destructive-strong",
				progress: "hidden",
			},
		},
	},
	defaultVariants: { variant: "default", size: "default", status: "queued" },
});

export type FileUploadVariant = NonNullable<VariantProps<typeof fileUpload>["variant"]>;
export type FileUploadSize = NonNullable<VariantProps<typeof fileUpload>["size"]>;
export type FileUploadStatus = NonNullable<VariantProps<typeof fileUpload>["status"]>;

/** The kinds of file that get their own glyph on a row. */
export type FileKind =
	| "image"
	| "video"
	| "audio"
	| "archive"
	| "sheet"
	| "text"
	| "code"
	| "file";

/** The glyph for a file, from its type and extension. */
export function fileKind(name: string, type: string): FileKind {
	const ext = name.includes(".") ? (name.split(".").pop() ?? "").toLowerCase() : "";
	if (type.startsWith("image/")) return "image";
	if (type.startsWith("video/")) return "video";
	if (type.startsWith("audio/")) return "audio";
	if (
		type.includes("zip") ||
		type.includes("compressed") ||
		["zip", "rar", "7z", "tar", "gz"].includes(ext)
	)
		return "archive";
	if (
		type.includes("spreadsheet") ||
		type.includes("excel") ||
		["csv", "xls", "xlsx"].includes(ext)
	)
		return "sheet";
	if (
		type.includes("pdf") ||
		type.startsWith("text/") ||
		["pdf", "doc", "docx", "md", "txt"].includes(ext)
	)
		return "text";
	if (
		[
			"css",
			"html",
			"js",
			"jsx",
			"json",
			"mdx",
			"ts",
			"tsx",
			"xml",
			"yaml",
			"yml",
		].includes(ext)
	)
		return "code";
	return "file";
}

/** The upper-case extension that labels a row, falling back to the MIME subtype. */
export function fileLabel(name: string, type: string): string {
	const ext = name.includes(".") ? name.split(".").pop() : undefined;
	if (ext) return ext.toUpperCase();
	return type ? (type.split("/").pop() ?? "FILE").toUpperCase() : "FILE";
}

/** Inner strokes drawn over the shared sheet outline, on a 24px grid. */
export const FILE_GLYPHS: Record<FileKind, string> = {
	image: "m8 18 3-3 2 2 3-3 2 2",
	video: "m10 12 5 3-5 3z",
	audio:
		"M10 18v-6l5-1v6M10 18a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM15 17a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z",
	archive: "M10 12h2M10 15h2M10 18h2",
	sheet: "M8 13h8M8 17h8M12 11v8",
	text: "M8 13h8M8 17h5",
	code: "m10 13-2 2 2 2M14 13l2 2-2 2",
	file: "",
};

export const FILE_SHEET =
	"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6";
