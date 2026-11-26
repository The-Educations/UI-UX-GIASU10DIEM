# link

Trích từ tài liệu Astryx (tiếng Anh). Tên prop là của Astryx; khi viết bằng shadcn thì giữ ý của luật. Nếu trái với `../design-rules.md` thì theo design-rules.

## useLinkify

Finds URLs, email addresses and custom patterns in plain text and returns React nodes with a Link for each match; the links respect LinkProvider for client-side routing. Use it wherever user- or tool-authored plain text should grow safe, styled links without pre-parsing it into markup: activity feeds, comment threads, description fields. Custom patterns turn project-specific references (issue numbers like #123, ticket IDs) into links by supplying a regex plus an href builder — e.g. an issue tracker pattern that maps captures onto its URL scheme. When matches overlap, the earliest one wins, and at the same start a custom pattern wins over the built-in ones, so a custom #123 pattern coexists with URL detection in the same string.

**Nên**

- Render the returned nodes directly inside a text container (<p>{nodes}</p>); the hook already interleaves the unmatched plain text.
- Wrap the app (or the region) in LinkProvider so detected links route client-side instead of full-page navigating.
- Give a custom pattern the global flag (g). Without it the scan never advances, and when the text contains a match the render never finishes.

**Không nên**

- Pre-parse the text into your own markup before linkifying — the hook exists so the plain string can be rendered as-is with links composed in.
