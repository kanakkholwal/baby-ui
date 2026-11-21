"use client";

import {
	LoadedModels,
	LoadedModelsContent,
	LoadedModelsEmpty,
	LoadedModelsHeader,
	LoadedModelsList,
	LoadedModelsMemory,
	LoadedModelsTrigger,
} from "@baby-ui/react";
import { type ComponentProps, useState } from "react";
import { DEVICE_MEMORY, LOADED_MODEL_SAMPLES } from "../data/loaded-models";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function LoadedModelsDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof LoadedModels>>(props);
	const [models, setModels] = useState(LOADED_MODEL_SAMPLES);
	const setState = (id: string, state: "loading" | "ready" | "idle") =>
		setModels((all) =>
			all.map((m) => (m.id === id ? { ...m, state, measurement: undefined } : m)),
		);

	return (
		<LoadedModels
			models={models}
			variant={p.variant}
			onUnload={(id) => setState(id, "idle")}
			onLoad={(id) => {
				// The demo plays the load; the component only renders the state it is given.
				setState(id, "loading");
				setTimeout(() => setState(id, "ready"), 1400);
			}}
		>
			<LoadedModelsTrigger />
			<LoadedModelsContent>
				<LoadedModelsHeader />
				<LoadedModelsMemory total={DEVICE_MEMORY} />
				<LoadedModelsList />
				<LoadedModelsEmpty />
			</LoadedModelsContent>
		</LoadedModels>
	);
}
