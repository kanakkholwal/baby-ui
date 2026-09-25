"use client";

import {
	StatusMonitor,
	type StatusMonitorSize,
	type StatusMonitorUnit,
} from "@baby-ui/react";
import { STATUSES } from "../data/status";

type Props = Record<string, unknown>;

export function StatusMonitorDemo({ props }: { props: Props }) {
	return (
		<StatusMonitor
			statuses={STATUSES}
			title="API"
			locale="en-US"
			size={(props.size as StatusMonitorSize) ?? "md"}
			unit={(props.unit as StatusMonitorUnit) ?? "days"}
			showUptime={(props.showUptime as boolean) ?? true}
		/>
	);
}
