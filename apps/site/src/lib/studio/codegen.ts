import type { Framework } from "@baby-ui/registry-schema";

type Values = Record<string, unknown>;

/** Props that differ from the spec defaults, so the copied code only states real choices. */
export function changedProps(values: Values, defaults: Values): Values {
	return Object.fromEntries(
		Object.entries(values).filter(
			([key, value]) =>
				value !== undefined &&
				value !== "" &&
				JSON.stringify(value) !== JSON.stringify(defaults[key]),
		),
	);
}

function attribute(name: string, value: unknown, framework: Framework): string {
	if (typeof value === "string") return `${name}=${JSON.stringify(value)}`;
	if (value === true && framework === "react") return name;
	return `${name}={${JSON.stringify(value)}}`;
}

/** A positioned section holding the background, in the reader's framework. */
export function backgroundCode({
	framework,
	entry,
	importLine,
	props,
}: {
	framework: Framework;
	entry: string;
	importLine: string;
	props: Values;
}): string {
	const attrs = Object.entries(props).map(([name, value]) =>
		attribute(name, value, framework),
	);
	const tag =
		attrs.join(" ").length > 60
			? `<${entry}\n\t\t\t\t${attrs.join("\n\t\t\t\t")}\n\t\t\t/>`
			: `<${entry}${attrs.length ? ` ${attrs.join(" ")}` : ""} />`;
	if (framework === "react")
		return [
			importLine,
			"",
			"export function Hero() {",
			"\treturn (",
			'\t\t<section className="relative h-[560px] overflow-hidden">',
			`\t\t\t${tag}`,
			"\t\t</section>",
			"\t);",
			"}",
			"",
		].join("\n");
	return [
		'<script lang="ts">',
		importLine,
		"</script>",
		"",
		'<section class="relative h-[560px] overflow-hidden">',
		`\t${tag.replaceAll("\n\t\t\t", "\n\t")}`,
		"</section>",
		"",
	].join("\n");
}
