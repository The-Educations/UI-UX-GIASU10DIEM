# media

Trích từ tài liệu Astryx (tiếng Anh). Tên prop là của Astryx; khi viết bằng shadcn thì giữ ý của luật. Nếu trái với `../design-rules.md` thì theo design-rules.

## useImageMode

Detects whether an image is predominantly dark or light by sampling pixels via OffscreenCanvas. Uses APCA perceptual lightness (sRGB linearization + power curve) for accurate detection, especially on saturated colors. Runs entirely off the paint path: no visible canvas, no layout thrash. Supports regional sampling for detecting luminance where text overlays will appear. Returns null while loading and falls back gracefully on CORS or network errors.

**Nên**

- Pair with MediaTheme to automatically adapt text color over dynamic background images.
- Use the region option to sample only the area where text overlays will appear for more accurate results.

**Không nên**

- Use for images that change rapidly (e.g., video frames); each src change triggers a new fetch and analysis.

## useMediaQuery

SSR-safe media query hook that subscribes to window.matchMedia changes. Returns whether the given media query matches. Always returns false on first render for SSR compatibility. Where `window.matchMedia` is missing, it returns its server default and never throws.

**Nên**

- Use for responsive layout switching based on viewport width, color scheme, or motion preferences.
- Prefer Astryx responsive tokens and component props over manual breakpoint logic when possible.

**Không nên**

- Use for server-rendered content that must match on first paint; the hook always returns false initially.
