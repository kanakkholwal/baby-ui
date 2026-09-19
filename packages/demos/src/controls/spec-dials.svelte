<script lang="ts">
import type { ComponentSpec } from "@baby-ui/registry-schema";
import type { DialConfig } from "dialkit/store";
import { createDialKitController, DialRoot } from "dialkit/svelte";
import { untrack } from "svelte";

let {
	spec,
	values = $bindable(),
}: { spec: ComponentSpec; values: Record<string, unknown> } = $props();

/** Maps our Control union onto DialKit's config shorthand. */
function toDialConfig(target: ComponentSpec): DialConfig {
	const config: DialConfig = {};
	for (const prop of target.props) {
		const control = prop.control;
		if (control.kind === "none") continue;
		if (control.kind === "boolean") config[prop.name] = Boolean(prop.default);
		else if (control.kind === "number") {
			config[prop.name] = [
				Number(prop.default ?? control.min ?? 0),
				control.min ?? 0,
				control.max ?? 100,
			];
		} else if (control.kind === "select") {
			config[prop.name] = { type: "select", options: [...control.options] };
		} else if (control.kind === "color")
			config[prop.name] = String(prop.default ?? "#a78bfa");
		else config[prop.name] = String(prop.default ?? "");
	}
	return config;
}

// The parent keys this component on the slug, so reading spec once is the intent.
const dial = untrack(() => createDialKitController(spec.name, toDialConfig(spec)));

$effect(() => {
	values = { ...(dial.values as Record<string, unknown>) };
});
</script>

<DialRoot mode="inline" theme="dark" productionEnabled />
