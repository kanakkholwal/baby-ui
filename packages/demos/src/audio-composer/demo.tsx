"use client";

import {
	AudioComposer,
	AudioComposerDuration,
	AudioComposerStyle,
	AudioComposerTools,
	ComposerInput,
	ComposerSubmit,
	ComposerToolbar,
} from "@baby-ui/react";
import { type ComponentProps, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;
const PRESETS = ["Cinematic", "Lo-fi", "Ambient", "Foley", "Orchestral"];

export function AudioComposerDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof AudioComposer>>(props);
	const [making, setMaking] = useState(false);

	return (
		<div className="w-full max-w-2xl">
			<AudioComposer
				presets={PRESETS}
				variant={p.variant}
				min={p.min}
				max={p.max}
				step={p.step}
				loading={p.loading ?? making}
				onStop={() => setMaking(false)}
				onSubmit={() => {
					// The demo plays the run; the component only renders the loading state it is given.
					setMaking(true);
					setTimeout(() => setMaking(false), 3000);
				}}
			>
				<ComposerInput placeholder="Describe the sound you want" minRows={2} />
				<ComposerToolbar>
					<AudioComposerDuration />
					<AudioComposerStyle />
					<AudioComposerTools>
						<ComposerSubmit />
					</AudioComposerTools>
				</ComposerToolbar>
			</AudioComposer>
		</div>
	);
}
