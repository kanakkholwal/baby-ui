<script lang="ts">
import { FileUpload, type UploadFile } from "@baby-ui/svelte";

let files = $state<UploadFile[]>([]);
</script>

<FileUpload
	{files}
	accept="image/*"
	maxSize={5 * 1024 * 1024}
	onFilesAdded={(added) => {
		files = [
			...files,
			...added.map((file) => ({ id: crypto.randomUUID(), file, progress: 0, status: "queued" as const })),
		];
	}}
	onRemove={(id) => (files = files.filter((f) => f.id !== id))}
/>
