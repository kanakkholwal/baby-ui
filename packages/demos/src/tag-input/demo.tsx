"use client";

import { TagInput } from "@baby-ui/react";
import { type ComponentProps, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function TagInputDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof TagInput>>(props);
	const [tags, setTags] = useState(["svelte", "react"]);
	return (
		<div className="w-full max-w-80">
			<TagInput
				tags={tags}
				onTagsChange={setTags}
				placeholder={p.placeholder || "Add a tag…"}
				max={p.max ?? 6}
				disabled={p.disabled ?? false}
				invalid={p.invalid ?? false}
				size={p.size ?? "default"}
				label="Tags"
			/>
		</div>
	);
}
