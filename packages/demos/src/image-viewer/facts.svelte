<script lang="ts">
import { ImageViewerTitle, useImageViewer } from "@baby-ui/svelte";

const viewer = useImageViewer();
</script>

<ImageViewerTitle class="text-sm font-medium">{viewer.image?.alt}</ImageViewerTitle>
<dl class="grid gap-2 text-sm">
	<div class="flex justify-between gap-3">
		<dt class="opacity-60">Picture</dt>
		<dd class="tabular-nums">{viewer.index + 1} of {viewer.count}</dd>
	</div>
	<div class="flex justify-between gap-3">
		<dt class="opacity-60">Size</dt>
		<dd class="tabular-nums">{viewer.image?.width} × {viewer.image?.height}</dd>
	</div>
</dl>
