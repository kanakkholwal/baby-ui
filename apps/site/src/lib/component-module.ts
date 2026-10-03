import { components } from "@baby-ui/demos/svelte";
import type { Component } from "svelte";
import { proComponents } from "#lib/pro.js";

export type AnyProps = Record<string, unknown>;

const isComponent = (value: unknown): value is Component<AnyProps> =>
	typeof value === "function";

/** A registry component's Svelte export by slug and entry name, public or Pro. */
export async function loadComponent(
	slug: string,
	entry: string,
): Promise<Component<AnyProps> | undefined> {
	const mod = await (components[slug] ?? proComponents[slug])?.();
	const value = mod?.[entry];
	return isComponent(value) ? value : undefined;
}
