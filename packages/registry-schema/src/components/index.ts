import type { ComponentSpec } from "../index.js";
import { button } from "./button.js";
import { dock } from "./dock.js";

export const specs: ComponentSpec[] = [button, dock];

export function getSpec(slug: string): ComponentSpec | undefined {
	return specs.find((s) => s.slug === slug);
}
