// Every page is built from the registry and the docs, so none of it needs a request.
// Prerendering also keeps Shiki off the Worker, where CPU time is metered.
export const prerender = true;
