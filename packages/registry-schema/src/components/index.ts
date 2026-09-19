import type { ComponentSpec } from "../index.js";
import { bentoGrid } from "./bento-grid.js";
import { button } from "./button.js";
import { dock } from "./dock.js";
import { fileTree } from "./file-tree.js";
import { morphingModal } from "./morphing-modal.js";
import { navbar } from "./navbar.js";

export const specs: ComponentSpec[] = [
	button,
	navbar,
	bentoGrid,
	fileTree,
	morphingModal,
	dock,
];

export function getSpec(slug: string): ComponentSpec | undefined {
	return specs.find((s) => s.slug === slug);
}
