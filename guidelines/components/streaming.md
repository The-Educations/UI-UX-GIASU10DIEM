# streaming

Trích từ tài liệu Astryx (tiếng Anh). Tên prop là của Astryx; khi viết bằng shadcn thì giữ ý của luật. Nếu trái với `../design-rules.md` thì theo design-rules.

## useStreamingText

Smooths bursty streamed text into a steady character-by-character reveal using requestAnimationFrame. Decouples arrival rate from display rate. Advances on word and syntax boundaries to avoid slicing mid-markdown or mid-word, preventing visual glitches with markdown renderers. Animation timing derives from Astryx motion tokens via useTheme when available, with sensible fallbacks outside a theme provider. Snaps to full text when isStreaming becomes false.

**Nên**

- Pass the accumulated text (not individual chunks) as targetText; the hook handles incremental reveal internally.
- Set isStreaming to false when the stream completes to snap to the final text.
- Use speed='instant' for non-animated contexts like search results or when reduced motion is preferred.

**Không nên**

- Use for static text that does not change; the hook adds unnecessary overhead for non-streaming content.
