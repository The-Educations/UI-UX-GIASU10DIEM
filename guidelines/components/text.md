# text

Trích từ tài liệu Astryx (tiếng Anh). Tên prop là của Astryx; khi viết bằng shadcn thì giữ ý của luật. Nếu trái với `../design-rules.md` thì theo design-rules.

## useTruncation

Detects whether an element's text is cut off — single-line overflow or clamped to several lines — and gives back the full text, updating when the size or the content changes. Built on a shared ResizeObserver and a shared MutationObserver, so hundreds of table cells create one observer of each kind, and a first measurement runs batched in a microtask after the commit instead of forcing a layout pass per text during mount. Use it wherever a truncated cell should show its full content only when it is actually truncated: compose a Tooltip off isTruncated and fullText instead of always rendering one. Text and Heading build their truncation tooltips on it; reach for it directly when composing truncation feedback into your own component.

**Nên**

- Render the full-content Tooltip only when isTruncated is true, and read the tooltip text from fullText: a cell that fits shows no tooltip, and the text always matches what was measured.
- Apply the matching clamp yourself next to the hook — white-space: nowrap for maxLines 1, -webkit-line-clamp for more — so what the user sees and what the hook measures stay the same shape.
- Reuse one useTruncation instance per measured element; the ref callback cleans up its own observers, so swapping elements is safe.

**Không nên**

- Compare scrollHeight to offsetHeight yourself for clamped text: with -webkit-line-clamp active browsers report the clamped size, which is exactly the case the Range measurement exists for.
