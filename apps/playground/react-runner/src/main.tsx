import { demos } from "@baby-ui/demos/react";
import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { connect, initialState, type RunnerState } from "./runner-state.js";
import "./index.css";

function Runner() {
	const [state, setState] = useState<RunnerState>(initialState);
	useEffect(() => connect("react", setState), []);

	const Demo = demos[state.slug];
	return (
		<div className="grid h-full place-items-center p-8">
			{Demo ? (
				<Demo props={state.props} />
			) : (
				<p className="text-sm text-muted-foreground">No React demo for “{state.slug}”.</p>
			)}
		</div>
	);
}

createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<Runner />
	</StrictMode>,
);
