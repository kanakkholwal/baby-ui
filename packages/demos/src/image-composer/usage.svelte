<script lang="ts">
import {
	ComposerInput,
	ComposerSubmit,
	ComposerToolbar,
	ImageComposer,
	ImageComposerModel,
	ImageComposerShapes,
	ImageComposerTools,
} from "@baby-ui/svelte";
</script>

<ImageComposer onSubmit={(prompt, shape) => console.log(prompt, shape)}>
	<ComposerInput placeholder="Describe the picture you want" />
	<ComposerToolbar>
		<ImageComposerShapes />
		<ImageComposerTools>
			<ImageComposerModel>SDXL Turbo</ImageComposerModel>
			<ComposerSubmit />
		</ImageComposerTools>
	</ComposerToolbar>
</ImageComposer>
