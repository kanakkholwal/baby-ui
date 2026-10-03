/** Page to worker: warm the WASM and fonts, or rasterise one card's HTML. */
export type OgRequest =
	| { id: number; type: "warm" }
	| {
			id: number;
			type: "render";
			html: string;
			css: string;
			width: number;
			height: number;
	  };

/** Worker to page: the PNG bytes (transferred, not copied), or why a request failed. */
export type OgReply =
	| { id: number; type: "done"; png: ArrayBuffer | null }
	| { id: number; type: "error"; message: string };
