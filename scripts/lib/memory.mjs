const mb = (bytes) => Math.round(bytes / 1048576);

/** This process's memory for a log line: resident now, its peak so far, and the JS heap. */
export function memoryLine() {
	const { rss, heapUsed } = process.memoryUsage();
	// resourceUsage reports maxRSS in kilobytes.
	const peak = process.resourceUsage().maxRSS * 1024;
	return `memory ${mb(rss)} MB (peak ${mb(peak)} MB, heap ${mb(heapUsed)} MB)`;
}

/**
 * Logs `memoryLine()` now and then every `intervalMs`, but only once resident memory has moved
 * by `threshold` since the last line, so an idle process stays quiet. Returns a stop function.
 */
export function reportMemory(log, { intervalMs = 30_000, threshold = 0.1 } = {}) {
	let last = process.memoryUsage().rss;
	log(memoryLine());
	const timer = setInterval(() => {
		const rss = process.memoryUsage().rss;
		if (Math.abs(rss - last) / last < threshold) return;
		last = rss;
		log(memoryLine());
	}, intervalMs);
	timer.unref();
	return () => clearInterval(timer);
}
