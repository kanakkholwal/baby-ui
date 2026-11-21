import {
	ComposerInput,
	ComposerSubmit,
	ComposerToolbar,
	ImageComposer,
	ImageComposerModel,
	ImageComposerShapes,
	ImageComposerTools,
} from "@baby-ui/react";

export function Example() {
	return (
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
	);
}
