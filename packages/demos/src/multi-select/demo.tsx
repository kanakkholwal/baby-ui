import { MultiSelect } from "@baby-ui/react";
import { type ComponentProps, useState } from "react";
import { controlProps } from "../data/preview-props";
import { TEAM_MEMBERS } from "../data/utility-inputs";

type Props = Record<string, unknown>;

export function MultiSelectDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof MultiSelect>>(props);
	const [value, setValue] = useState(["ana", "dev"]);
	return (
		<div className="flex w-full max-w-sm flex-col gap-1.5">
			<span id="reviewers-label" className="font-medium text-sm">
				Reviewers
			</span>
			<MultiSelect
				aria-labelledby="reviewers-label"
				options={TEAM_MEMBERS}
				value={value}
				onValueChange={setValue}
				maxChips={Number(props.maxChips ?? 3)}
				size={p.size ?? "default"}
				disabled={p.disabled ?? false}
				labels={{ placeholder: "Add reviewers…", search: "Search people…" }}
			/>
		</div>
	);
}
