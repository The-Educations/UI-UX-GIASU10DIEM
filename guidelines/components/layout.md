# layout

Trích từ tài liệu Astryx (tiếng Anh). Tên prop là của Astryx; khi viết bằng shadcn thì giữ ý của luật. Nếu trái với `../design-rules.md` thì theo design-rules.

## useAppShellMobile

Hook for reading and controlling AppShell mobile navigation state from descendants of AppShell. Use it for custom mobile nav triggers, closing the drawer after route changes, or coordinating AppShell-adjacent mobile experiences with the same breakpoint used by mobile nav.

**Nên**

- Use inside the AppShell tree when building custom mobile navigation controls, route-aware nav items, or UI that should update at the same breakpoint as AppShell mobile nav.
- Prefer MobileNavToggle for the standard hamburger trigger: use this hook when you need custom placement, styling, or extra behavior.
- Call closeMobileNav after a custom mobile nav item changes route so the drawer dismisses cleanly.

**Không nên**

- Use as a general responsive primitive when the UI is not inside AppShell or does not need to align with AppShell mobile nav: use useMediaQuery instead.
- Assume it throws outside AppShell. The hook returns safe defaults and no-op callbacks when no provider is present.

## useOverflow

Measures children rendered in a hidden container to determine how many fit in the available width without flickering. Uses ResizeObserver to react to container and measured-child size changes. The measurement container should hold all items plus an optional overflow indicator element (identified by a data-overflow-indicator attribute).

**Nên**

- Render all items into the measureRef container (hidden) and only the first visibleCount items into the containerRef container (visible).
- Include an overflow indicator (e.g., "+N more" button) as the last child of the measurement container with a data-overflow-indicator attribute.

**Không nên**

- Use for vertical overflow; this hook measures horizontal width only.

## useResizable

Hook for adding drag-to-resize behavior to layout regions. Supports single-region and multi-region configurations with snap points, collapsible panels, localStorage persistence, and cascade resize ordering.

**Nên**

- Use percent(40, {min: pixel(333)}) for a 40% size with a 333px floor, or percent(10, {max: pixel(400)}) for a 10% size with a 400px ceiling. The options argument is required and carries a floor XOR a ceiling.
- A structured default is an initial choice only; a structured minSize or maxSize remains live. State, persistence, callbacks, resize(), paint, and ARIA all use resolved pixel numbers.
- Import percent and Table’s same pixel binding from @astryxdesign/core/Resizable/utils when constructing configuration in a Server Component; the root package exposes one pixel symbol and one percent symbol without collision.
- Use with Layout or AppShell sidebar for resizable navigation panels.
- Set autoSaveId to persist user-chosen sizes across page reloads.

**Không nên**

- Set minSize too small; content becomes unreadable. Prefer collapsible for panels that can hide entirely.

## useScrollableArea

Adds canonical axis-aware scroll behavior to structure owned by the caller. An axis is effective only when its computed overflow is scroll-capable and geometry exceeds the shared 1px tolerance. Both viewport and content boxes are observed.

**Nên**

- Pass already-resolved props and refs through both prop getters, then spread each returned object once.
- Use viewport keyboard ownership only when the viewport itself should enter the tab order; provide a concise accessible label.
- Use contentOrViewport to delegate forward Tab entry to the first sequential native link or button when it preserves native scroll keys. Inputs, composite widgets, and nested scroll areas retain the named viewport stop. Shift+Tab from the delegated first child skips the viewport; pointer and programmatic focus stay on it.
- Use content keyboard ownership when your integration already supplies keyboard access to the full scroll range. Automatic delegation checks current content at each keyboard entry without continuously tracking its focusability.
- Pass caller `xstyle` through `getViewportProps`; the getter composes it with fitting clip, active overflow, and Sticky containment.
- Give a viewport-owned tab stop a visible focus indicator; compose `focusOutlineStyles.focusVisible` (or an equivalent) into the viewport `xstyle`, as ScrollableArea does.

**Không nên**

- Attach only the viewport getter. A real observed content box is required for live overflow changes.
- Declare overflow through caller props on the viewport; the getter owns overflow declarations and strips conflicting inline values.

## useScrollLock

Locks page scroll while active and keeps the page where it is. The page gets overflow: hidden (on the root, or on body when its own overflow is the one the viewport uses), which stops wheel, keyboard and scrollbar scrolling, and overscroll-behavior-y: none on the root and body, which stops the overscroll bounce while the lock holds. Where the primary pointer is coarse (phones and tablets), a one-finger pan that would scroll the page is cancelled, because iOS Safari scrolls an overflow: hidden page under a finger; pans that a scroller inside the overlay can take, drags on a native range input, pinch-zoom, and one-finger drags on a pinch-zoomed page (which pan the zoomed view) still work. The scroll offset never changes, so nothing jumps when the lock starts or ends, and iOS Safari keeps its toolbar as it was. Where the hidden scrollbar takes layout space (desktop), the hook holds its gutter open with scrollbar-gutter: stable, so the page, including any position: fixed chrome, does not shift sideways.

**Nên**

- Use when opening full-screen modals or dialogs to prevent background content from scrolling.
- Pass the same boolean that controls dialog visibility (e.g., isOpen) as the isLocked parameter.

**Không nên**

- Use for non-modal overlays like popovers or tooltips; users should be able to scroll away from those.

## useScrollOverflow

Tracks scroll overflow state for a horizontally scrollable container. Returns a ref callback and state booleans that update as the user scrolls, the container resizes, or its content changes (a child added, removed or resized, or a new gap or padding). Uses scroll event listeners, ResizeObserver and MutationObserver for reactive updates. Tolerance of 1px is applied to avoid sub-pixel false positives.

**Nên**

- Use to show/hide scroll navigation buttons or fade edges on carousels and horizontal lists.
- Apply the scrollRef to a container with overflow-x: auto or overflow-x: scroll.

**Không nên**

- Use for vertical scroll tracking; this hook only measures horizontal overflow.
