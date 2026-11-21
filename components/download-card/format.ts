const UNITS = ["B", "KB", "MB", "GB", "TB"];

export function formatBytes(bytes: number): string {
	if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
	const i = Math.min(UNITS.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)));
	const value = bytes / 1024 ** i;
	return `${i >= 2 ? value.toFixed(1) : Math.round(value)} ${UNITS[i]}`;
}

export function formatSpeed(bytesPerSecond: number): string {
	return `${formatBytes(bytesPerSecond)}/s`;
}

/** "42 s left", "5 min left", "1 h 20 min left"; empty when it cannot be known. */
export function formatEta(remainingBytes: number, bytesPerSecond: number): string {
	if (remainingBytes <= 0 || bytesPerSecond <= 0) return "";
	const seconds = Math.ceil(remainingBytes / bytesPerSecond);
	if (seconds < 60) return `${seconds} s left`;
	const minutes = Math.ceil(seconds / 60);
	if (minutes < 60) return `${minutes} min left`;
	return `${Math.floor(minutes / 60)} h ${minutes % 60} min left`;
}

export function percentOf(done: number, total: number): number {
	return total > 0 ? Math.min(100, Math.max(0, (done / total) * 100)) : 0;
}
