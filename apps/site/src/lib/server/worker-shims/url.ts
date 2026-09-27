// postcss only turns source-map paths into URLs, which the Worker never produces.
export const fileURLToPath = (url: string | URL) => new URL(url).pathname;
export const pathToFileURL = (path: string) => new URL(`file://${path}`);
