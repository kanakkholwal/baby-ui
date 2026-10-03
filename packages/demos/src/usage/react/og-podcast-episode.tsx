import { OgPodcastEpisode } from "@baby-ui/react";

export function Example() {
	return (
		<OgPodcastEpisode
			title="Why every design system rewrites its tokens"
			show="Tokens and Tea"
			episode="EP 142"
			guest={{ name: "Ada Park" }}
			duration="48:12"
		/>
	);
}
