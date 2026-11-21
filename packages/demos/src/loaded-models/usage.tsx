import {
	LoadedModels,
	LoadedModelsContent,
	LoadedModelsEmpty,
	LoadedModelsHeader,
	LoadedModelsList,
	LoadedModelsTrigger,
} from "@baby-ui/react";

const models = [
	{ id: "chat", name: "Llama 3.2 3B", kind: "Chat", state: "ready" as const },
	{ id: "voice", name: "Whisper Small", kind: "Dictation", state: "idle" as const },
];

export function Example() {
	return (
		<LoadedModels
			models={models}
			onUnload={(id) => console.log("unload", id)}
			onLoad={(id) => console.log("load", id)}
		>
			<LoadedModelsTrigger />
			<LoadedModelsContent>
				<LoadedModelsHeader />
				<LoadedModelsList />
				<LoadedModelsEmpty />
			</LoadedModelsContent>
		</LoadedModels>
	);
}
