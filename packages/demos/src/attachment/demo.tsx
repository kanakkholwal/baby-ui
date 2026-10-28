"use client";

import {
	Attachment,
	AttachmentContent,
	AttachmentMeta,
	AttachmentName,
	AttachmentPreview,
	AttachmentProgress,
	AttachmentRemove,
	AttachmentRetry,
	Attachments,
	Button,
} from "@baby-ui/react";
import { type ComponentProps, useState } from "react";
import { CHAT_ATTACHMENTS } from "../data/attachment";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function AttachmentDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Attachment>>(props);
	const variant = p.variant ?? "chip";
	const all = CHAT_ATTACHMENTS.map((a) => a.id as string);
	const [shown, setShown] = useState(all);
	const [retried, setRetried] = useState<string[]>([]);

	return (
		<div className="flex w-full max-w-md flex-col gap-2 rounded-2xl border border-border bg-background p-2">
			{/* Cards are full width, so `wrap` stacks them; chips and tiles scroll in one line. */}
			<Attachments variant={variant === "card" ? "wrap" : "scroll"}>
				{CHAT_ATTACHMENTS.filter((a) => shown.includes(a.id)).map((file, i) => {
					const status =
						i === 0 && file.id === "shot"
							? (p.status ?? "ready")
							: "failed" in file && !retried.includes(file.id)
								? "error"
								: "ready";
					return (
						<Attachment
							key={file.id}
							name={file.name}
							variant={variant}
							status={status}
							progress={p.progress ?? 40}
						>
							<AttachmentPreview src={"src" in file ? file.src : undefined} />
							<AttachmentContent>
								<AttachmentName />
								<AttachmentMeta>{file.meta}</AttachmentMeta>
								{variant === "card" ? <AttachmentProgress /> : null}
							</AttachmentContent>
							<AttachmentRetry onClick={() => setRetried((r) => [...r, file.id])} />
							<AttachmentRemove
								onClick={() => setShown((s) => s.filter((id) => id !== file.id))}
							/>
						</Attachment>
					);
				})}
			</Attachments>
			<div className="flex items-center justify-between gap-2 px-2 pb-1">
				<span className="text-muted-foreground text-sm">Ask about these files</span>
				{shown.length < all.length ? (
					<Button
						size="xs"
						variant="ghost"
						onClick={() => {
							setShown(all);
							setRetried([]);
						}}
					>
						Reset
					</Button>
				) : null}
			</div>
		</div>
	);
}
