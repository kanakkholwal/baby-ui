"use client";

import {
	ComposerInput,
	ComposerSubmit,
	ComposerToolbar,
	ImageComposer,
	ImageComposerModel,
	ImageComposerShapes,
	ImageComposerTools,
} from "@baby-ui/react";
import { type ComponentProps, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function ImageComposerDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof ImageComposer>>(props);
	const [making, setMaking] = useState(false);

	return (
		<div className="w-full max-w-2xl">
			<ImageComposer
				variant={p.variant}
				loading={p.loading ?? making}
				onStop={() => setMaking(false)}
				onSubmit={() => {
					// The demo plays the run; the component only renders the loading state it is given.
					setMaking(true);
					setTimeout(() => setMaking(false), 3000);
				}}
			>
				<ComposerInput placeholder="Describe the picture you want" minRows={2} />
				<ComposerToolbar>
					<ImageComposerShapes />
					<ImageComposerTools>
						<ImageComposerModel>SDXL Turbo</ImageComposerModel>
						<ComposerSubmit />
					</ImageComposerTools>
				</ComposerToolbar>
			</ImageComposer>
		</div>
	);
}
