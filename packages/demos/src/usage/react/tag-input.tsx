"use client";

import { TagInput } from "@baby-ui/react";
import { useState } from "react";

export function Example() {
	const [tags, setTags] = useState(["react", "svelte"]);

	return <TagInput tags={tags} onTagsChange={setTags} label="Topics" max={6} />;
}
