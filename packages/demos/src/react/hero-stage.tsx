"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Gauge,
	HeroStage,
	type HeroStageMotion,
	HeroStageSlot,
	Progress,
} from "@baby-ui/react";

type Props = Record<string, unknown>;

export function HeroStageDemo({ props }: { props: Props }) {
	return (
		<div className="w-full max-w-md py-6">
			<HeroStage motion={(props.motion as HeroStageMotion) ?? "scroll"}>
				<div className="grid grid-cols-2 gap-3">
					<HeroStageSlot index={0} x={-40} y={24} rotate={-6} className="col-span-2">
						<Card className="gap-1 py-4">
							<CardHeader className="px-4">
								<CardDescription>Monthly revenue</CardDescription>
								<CardTitle className="text-2xl tabular-nums">$48,210</CardTitle>
							</CardHeader>
						</Card>
					</HeroStageSlot>
					<HeroStageSlot index={1} x={50} y={-30} rotate={8}>
						<Card className="items-center py-4">
							<Gauge value={72} label="Uptime" />
						</Card>
					</HeroStageSlot>
					<HeroStageSlot index={2} x={-20} y={40} rotate={-4}>
						<Card className="justify-center py-4">
							<CardContent className="px-4">
								<Progress value={64} label="Deploys" showValue />
							</CardContent>
						</Card>
					</HeroStageSlot>
				</div>
			</HeroStage>
		</div>
	);
}
