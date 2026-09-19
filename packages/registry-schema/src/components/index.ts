import type { ComponentSpec } from "../index.js";
import { accordion } from "./accordion.js";
import { alert } from "./alert.js";
import { avatar } from "./avatar.js";
import { badge } from "./badge.js";
import { bentoGrid } from "./bento-grid.js";
import { button } from "./button.js";
import { card } from "./card.js";
import { checkbox } from "./checkbox.js";
import { dock } from "./dock.js";
import { fileTree } from "./file-tree.js";
import { input } from "./input.js";
import { label } from "./label.js";
import { morphingModal } from "./morphing-modal.js";
import { navbar } from "./navbar.js";
import { progress } from "./progress.js";
import { skeleton } from "./skeleton.js";
import { switchComponent } from "./switch.js";
import { textarea } from "./textarea.js";

export const specs: ComponentSpec[] = [
	accordion,
	alert,
	avatar,
	badge,
	button,
	card,
	checkbox,
	input,
	label,
	progress,
	skeleton,
	switchComponent,
	textarea,
	navbar,
	bentoGrid,
	fileTree,
	morphingModal,
	dock,
];

export function getSpec(slug: string): ComponentSpec | undefined {
	return specs.find((s) => s.slug === slug);
}
