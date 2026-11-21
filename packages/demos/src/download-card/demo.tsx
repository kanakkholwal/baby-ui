"use client";

import {
	DownloadCard,
	DownloadCardCancel,
	DownloadCardDetail,
	DownloadCardFooter,
	DownloadCardHeader,
	DownloadCardIcon,
	DownloadCardPercent,
	DownloadCardProgress,
	DownloadCardStats,
	DownloadCardText,
	DownloadCardTitle,
} from "@baby-ui/react";
import { type ComponentProps, useEffect, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;
const TOTAL = 1.8 * 1024 ** 3;
const SPEED = 24 * 1024 ** 2;

export function DownloadCardDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof DownloadCard>>(props);
	const [downloaded, setDownloaded] = useState(0.34 * TOTAL);

	// The demo plays the download; the component only renders what it is given.
	useEffect(() => {
		const id = setInterval(
			() => setDownloaded((d) => (d + SPEED / 2 >= TOTAL ? 0 : d + SPEED / 2)),
			500,
		);
		return () => clearInterval(id);
	}, []);

	const compact = p.variant === "compact";
	return (
		<div className="w-full max-w-sm">
			<DownloadCard
				downloaded={p.phase === "checking" ? TOTAL : downloaded}
				total={TOTAL}
				bytesPerSecond={SPEED}
				phase={p.phase}
				variant={p.variant}
			>
				{compact ? null : (
					<DownloadCardHeader>
						<DownloadCardIcon />
						<DownloadCardText>
							<DownloadCardTitle>Llama 3.2 3B Instruct</DownloadCardTitle>
							<DownloadCardDetail>Q4 quantised, runs on 8 GB</DownloadCardDetail>
						</DownloadCardText>
						<DownloadCardPercent />
					</DownloadCardHeader>
				)}
				<DownloadCardProgress label="Llama 3.2 3B Instruct" />
				<DownloadCardFooter>
					<DownloadCardStats />
					<DownloadCardCancel onClick={() => setDownloaded(0)} />
				</DownloadCardFooter>
			</DownloadCard>
		</div>
	);
}
