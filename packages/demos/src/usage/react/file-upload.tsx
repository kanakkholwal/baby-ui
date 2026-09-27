import { FileUpload, type UploadFile } from "@baby-ui/react";
import { useState } from "react";

export function Example() {
	const [files, setFiles] = useState<UploadFile[]>([]);
	return (
		<FileUpload
			files={files}
			accept="image/*"
			maxSize={5 * 1024 * 1024}
			onFilesAdded={(added) =>
				setFiles((list) => [
					...list,
					...added.map((file) => ({
						id: crypto.randomUUID(),
						file,
						progress: 0,
						status: "queued" as const,
					})),
				])
			}
			onRemove={(id) => setFiles((list) => list.filter((f) => f.id !== id))}
		/>
	);
}
