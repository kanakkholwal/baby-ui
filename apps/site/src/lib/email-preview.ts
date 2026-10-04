// A frame sized to its content never scrolls, so the preview drops the scrollbar and its gutter.
const PREVIEW_CSS = "<style>html{scrollbar-width:none}</style>";

/** An email's HTML for an on-site preview frame only; copies and downloads use the raw HTML. */
export function previewHtml(html: string): string {
	return html.includes("</head>")
		? html.replace("</head>", `${PREVIEW_CSS}</head>`)
		: `${PREVIEW_CSS}${html}`;
}
