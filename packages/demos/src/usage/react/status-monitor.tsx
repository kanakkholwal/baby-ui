import { StatusMonitor, type StatusMonitorItem } from "@baby-ui/react";

export function Example({ statuses }: { statuses: StatusMonitorItem[] }) {
	return <StatusMonitor statuses={statuses} title="API" />;
}
