"use client";

import { DocsNav, type DocsNavConnector } from "@baby-ui/react";
import { useState } from "react";
import { DOCS_SECTIONS } from "../data/docs-nav";

type Props = Record<string, unknown>;

export function DocsNavDemo({ props }: { props: Props }) {
	const [current, setCurrent] = useState("#installation");
	return (
		<div className="w-64 max-w-full">
			<DocsNav
				sections={DOCS_SECTIONS}
				current={current}
				connector={(props.connector as DocsNavConnector) ?? "tick"}
				onNavigate={(href, event) => {
					event.preventDefault();
					setCurrent(href);
				}}
			/>
		</div>
	);
}
