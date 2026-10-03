import type { ComponentSpec } from "@baby-ui/registry-schema";

/** New values for a spec's select and number dials; text, colour and switches keep theirs. */
export function remix(
	spec: ComponentSpec,
	values: Record<string, unknown>,
	random: () => number = Math.random,
): Record<string, unknown> {
	const next = { ...values };
	for (const prop of spec.props) {
		const { control } = prop;
		// Placement is the page's call, not part of the look.
		if (prop.name === "position") continue;
		if (control.kind === "select" && control.options.length > 1) {
			next[prop.name] = control.options[Math.floor(random() * control.options.length)];
		} else if (control.kind === "number") {
			const min = control.min ?? 0;
			const max = control.max ?? 100;
			const step = control.step ?? 1;
			const steps = Math.round((max - min) / step);
			next[prop.name] = Number((min + Math.round(random() * steps) * step).toFixed(4));
		}
	}
	return next;
}
