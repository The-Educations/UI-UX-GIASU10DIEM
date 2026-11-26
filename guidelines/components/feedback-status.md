# Feedback & Status

Trích từ tài liệu Astryx (tiếng Anh). Tên prop là của Astryx; khi viết bằng shadcn thì giữ ý của luật. Nếu trái với `../design-rules.md` thì theo design-rules.

## Badge

Badge highlights a status or category at a glance. Use it sparingly: only when a value represents a distinct state (Active, Failed) or a grouping tag (Engineering, Design). Most metadata (dates, durations, counts, descriptions) should be plain description text, not badges.

**Nên**

- Every status badge steals attention. Only badge states where the user needs to notice or act: errors, warnings, items requiring follow-up. If no action is needed, plain text is fine.
- Use success, warning, and error variants only for system status that demands attention: "Failed", "Degraded", "Action Required". These have bold solid backgrounds designed to stand out.
- Use color variants (blue, purple, teal, etc.) for category tags that group or classify items: team names, content types, priority levels.
- Keep labels to one or two words. If you need more detail, put it in surrounding text instead of the badge.
- Add an icon when it helps identify the badge type quickly, but always include a text label alongside it.
- A string or number label keeps its character order under right-to-left, so `+3` and `@alice` read as written. When a rich label mixes directions, mark the direction on your own content, for example with `dir` or `<bdi>`.

**Không nên**

- Apply a "success" badge to every healthy/active/normal item. If all rows show green "Active" badges, none stand out; the badge adds noise, not information. Show only the states that need user attention (errors, warnings, pending actions).
- Use badges for metadata. Durations ("6h window"), counts ("12 trigger types"), dates, and descriptions are not statuses or categories; use description text (Text with type="supporting") instead.
- Use semantic status variants (success, warning, error, info) for categories or informational content. These are visually loud and should only indicate system state.
- Repeat the same badge in every row of a table or list. If the same value appears in most rows, it's not adding information; use plain text for common states and reserve badges for the exceptional ones.
- Make badges clickable; they are read-only indicators. Use a button or link if the user needs to take action.

## Banner

Banner shows a persistent message at the top of a page or section. Use it for form errors, system updates, maintenance notices, or success confirmations that the user needs to see until they act on it.

**Nên**

- Pick a status that matches the message: info for updates, warning for caution, error for problems, success for confirmations.
- Use the card container inside page content and the section container for full-width messages that span the entire page.
- Make info and success banners dismissable. Keep error banners visible until the user fixes the issue.
- Keep titles short and scannable: "Payment failed" not "There was a problem processing your most recent payment."
- Set collapsible={false} when the user needs the content to act on the message, like the list of fields that failed validation. Keep the default toggle when the detail is long enough to bury the banner's own message.
- Banner status controls color and icon only; it does not create a live region. Announce async outcomes from the transition handler with useAnnounce. Pass role="alert" only for an urgent message the person must act on now: Banner puts it on the title and description, so controls, endContent and supporting content are not read as part of the alert. Do not also announce that message with useAnnounce.

**Không nên**

- Use Banner for short-lived messages that disappear on their own; use Toast instead.
- Stack multiple banners with the same status; combine related messages into one banner.
- Rely on the status color or icon alone to carry meaning; say which status it is in the title text, because the icon is decorative to a screen reader.

## InfoTip

An info icon that reveals help: a small "i" button. Hover and keyboard focus preview the help, and a click, tap, Enter, or Space pins it open until Escape, a second press, a press outside, or focus leaving. Use it next to labels, values, and metrics for permission notes, metric definitions, and field help. Its value over hand-composing Icon inside Tooltip is the pre-wired accessible trigger: a real button with an aria-label, Tab-reachable, tooltip on hover AND focus AND tap, and Escape dismissal. It follows the toggletip pattern: the button reports `aria-expanded="true"` while the help is pinned, and a screen reader hears the help once when it pins. Host `data-*` attributes reach the button; its name and disclosure attributes stay component-owned.

**Nên**

- Keep tooltip content concise, plain, and non-interactive; use Popover or HoverCard for links and buttons.
- Override label when "More information" is too generic, e.g. "About this metric".
- Rely on InfoTip rather than a hand-rolled info button on touch: it pins its help on a press, so a tap, a click, Enter, or Space pins the tooltip even though the trigger is a button, and a tap outside dismisses it.

**Không nên**

- Hand-compose Icon inside Tooltip for info affordances; the bare Icon is aria-hidden and unfocusable, so keyboard and screen-reader users never see it.
- Use InfoTip for essential information users must see to complete a task; put that text inline instead.

## ProgressBar

A horizontal bar showing the completion progress of a task. Use it for operations where the duration is known, or as an animated indicator when progress can't be calculated. Supports semantic color variants, value labels, and custom formatting. Under a finger a new value animates as on iOS: linearly, in proportion to how far it moves (a full track takes one second at the theme's default tempo), and the fill keeps a minimum visible length above zero.

**Nên**

- Use a determinate bar when the total amount of work is known, and indeterminate when it's not.
- Choose a color variant that matches the context: accent for general progress, success for completion, warning or error for alerts.
- Always provide a label, even if hidden; screen readers need it to announce what's loading.

**Không nên**

- Place icons or labels inside the bar; compose them alongside it using layout components.
- Use a progress bar for instant actions; it's meant for operations that take noticeable time.
- Use multiple progress bars stacked together for the same operation; use one bar with a value label instead.

## Skeleton

An animated shimmer placeholder that previews the shape of content while it loads. Use it to build loading screens that match the layout of the real content. For content with unknown dimensions, use Spinner instead.

**Nên**

- Match the size and shape of the content being loaded to create a realistic placeholder.
- Stagger multiple skeletons with the `index` prop for a natural wave animation.

**Không nên**

- Use when the content dimensions are unknown; use Spinner instead.
- Combine with a Spinner on the same content area; pick one loading pattern.
- Show skeletons indefinitely; if loading takes too long, show an error or empty state instead.

## Spinner

An animated loading indicator for processes with unknown duration, such as data fetching or form submission. Supports visible labels, multiple sizes, and a dark background variant. For content with known dimensions, use Skeleton instead.

**Nên**

- Provide a meaningful label to describe what is loading for screen reader users.
- Use the "onMedia" shade when placed on dark or accent-colored backgrounds.

**Không nên**

- Use for content areas with known dimensions; use Skeleton to preserve layout instead.
- Stack multiple spinners in the same view; use one to represent the overall loading state.

## StatusDot

A small colored dot that communicates status like online/offline presence or severity levels. Supports five semantic variants and an optional pulse animation. Always pair with a visible text label, as color alone should not carry meaning.

**Nên**

- Use StatusDot as a binary present/absent signal; avoid encoding many distinct states in a single dot, since color and size alone cannot reliably distinguish them.
- Always pair with a visible text label so status is not conveyed by color alone.
- Provide a descriptive `label` prop for screen reader accessibility.
- Pair the dot with an icon that carries the status as a distinct shape when it must stand on its own without adjacent text, so meaning survives without color.
- If you can't add a label or an icon, make sure the status is conveyed elsewhere accessibly (e.g. adjacent text, a table column, or a live region).

**Không nên**

- Rely on color alone to communicate status; StatusDot is not fully accessible in isolation, so the builder must make the status distinguishable in context via a label, an icon, or an accessible alternative.
- Use the pulse animation for purely decorative purposes; reserve it for states that require immediate attention.
