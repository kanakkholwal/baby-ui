"use client";

import { useState } from "react";
import { TagInput } from "@baby-ui/react";

export function Example() {
	const [tags, setTags] = useState(["react", "svelte"]);

	return <TagInput tags={tags} onTagsChange={setTags} label="Topics" max={6} />;
}
