"use client";

import { useState } from "react";
import { ReorderList } from "@baby-ui/react";

export function Example() {
	const [items, setItems] = useState([
		{ id: "spec", label: "Write the ComponentSpec" },
		{ id: "svelte", label: "Author the Svelte port" },
		{ id: "react", label: "Author the React port" },
	]);

	return <ReorderList items={items} onItemsChange={setItems} label="Build steps" />;
}
