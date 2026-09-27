// postcss reads prior source maps from disk; a Worker has no disk, so report nothing there.
export const existsSync = () => false;
export const realpathSync = (path: string) => path;
export function readFileSync(): never {
	throw new Error("No filesystem in the Worker");
}
