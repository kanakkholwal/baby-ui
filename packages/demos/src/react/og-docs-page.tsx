"use client";

import {
	OgDocsPage,
	type OgDocsPageMode,
	type OgDocsPageMotif,
	type OgDocsPageTone,
} from "@baby-ui/react";
import { OG_DOCS_PAGE, OG_DOCS_SNIPPETS } from "../data/og-samples";
import { OgFrame } from "./og-frame";

type Props = Record<string, unknown>;

const { code, shell, filename } = OG_DOCS_SNIPPETS.react;

export function OgDocsPageDemo({ props }: { props: Props }) {
	const motif = (props.motif as OgDocsPageMotif) ?? "code";
	return (
		<OgFrame>
			<OgDocsPage
				{...OG_DOCS_PAGE}
				title={(props.title as string) || "Dialog"}
				site={(props.site as string) || "baby ui"}
				description={(props.description as string) ?? undefined}
				snippet={motif === "terminal" ? shell : code}
				filename={motif === "terminal" ? "zsh" : filename}
				mode={(props.mode as OgDocsPageMode) ?? "light"}
				tone={(props.tone as OgDocsPageTone) ?? "chart"}
				motif={motif}
			/>
		</OgFrame>
	);
}
