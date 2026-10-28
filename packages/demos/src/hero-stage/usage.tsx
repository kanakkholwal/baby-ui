import { Card, CardHeader, CardTitle, HeroStage, HeroStageSlot } from "@baby-ui/react";

export function Example() {
	return (
		<HeroStage>
			<div className="grid grid-cols-2 gap-3">
				<HeroStageSlot index={0} x={-40} y={24} rotate={-6}>
					<Card>
						<CardHeader>
							<CardTitle>Revenue</CardTitle>
						</CardHeader>
					</Card>
				</HeroStageSlot>
				<HeroStageSlot index={1} x={50} y={-30} rotate={8}>
					<Card>
						<CardHeader>
							<CardTitle>Uptime</CardTitle>
						</CardHeader>
					</Card>
				</HeroStageSlot>
			</div>
		</HeroStage>
	);
}
