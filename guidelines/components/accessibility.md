# accessibility

Trích từ tài liệu Astryx (tiếng Anh). Tên prop là của Astryx; khi viết bằng shadcn thì giữ ý của luật. Nếu trái với `../design-rules.md` thì theo design-rules.

## useAnnounce

Imperatively announces a message to screen readers through a visually-hidden live region. Use it for state that is only conveyed visually; search result counts, "no results", loading and saved confirmations, validation errors (WCAG 4.1.3 Status Messages). The polite and assertive regions are created empty on first use and stay mounted, which is what makes announcements reliable: most screen readers ignore a live region that is inserted together with its content. Each message is cleared a couple of seconds after it is announced so stale status does not linger in the accessibility tree. A message is delivered where its caller is: from inside an open Astryx modal it goes to a region inside that modal and is heard there with no change to the calling code; a message sent just as the modal is dismissed is delivered through whatever is exposed afterwards rather than lost. A call made outside the modal, even by the component that renders it, uses the page-body region.

**Nên**

- Reach for this instead of hand-rolling an aria-live div; a region rendered with its content usually does not announce at all.
- Keep "polite" for status and result counts; reserve "assertive" for errors and time-sensitive alerts, since it interrupts whatever the screen reader is saying.
- Announce the outcome, not the interaction; "12 results" rather than "search ran".
- Send a value that keeps changing, such as a result count as the user types, through its own useAnnounce({hasReplace: true}) instance, so input faster than a frame says only the latest count.

**Không nên**

- Announce content that is already visible and correctly labeled in the DOM; that doubles up for screen reader users.
