# Overlay

Trích từ tài liệu Astryx (tiếng Anh). Tên prop là của Astryx; khi viết bằng shadcn thì giữ ý của luật. Nếu trái với `../design-rules.md` thì theo design-rules.

## AlertDialog

AlertDialog asks the user to confirm a destructive or irreversible action before it happens. Use it for things like deleting content, revoking access, or discarding unsaved changes.

It implements the WAI-ARIA APG [Alert Dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/): `role="alertdialog"`, a title linked by `aria-labelledby`, a consequence description linked by `aria-describedby`, focus moved into the dialog on open and returned to the trigger on close, and no dismissal by clicking outside. Escape cancels.

AlertDialog passes its requested width through to Dialog, which clamps the surface to the container and dynamic viewport with token gutters. Generic Dialog footers should wrap, but Dialog does not own action semantics or order; consumer composition controls that. AlertDialog owns its confirmation semantics: above 640px, actions render horizontally and may move onto another row; at 640px and below, the destructive action appears above Cancel and both buttons fill the footer width. Button labels retain their standard single-line behavior. The breakpoint follows available width, not pointer or hover capability. The body scrolls when block space is constrained.

On a touch screen the two actions are tracked as one group under a finger or a pen, the way iOS tracks the actions of an alert: the action under the finger highlights as soon as it is touched, the highlight follows the finger from one action to the other, and lifting the finger runs the action under it. Lifting it off both actions runs nothing. A mouse, the keyboard and assistive technology keep the click of each button.

Under a finger, on a phone or tablet, the alert also appears and leaves the way an iOS alert does: it scales down slightly into place while it and the dimming fade in, on the entrance timing of the theme, and it fades out with the dimming when it closes, on the exit timing of the theme. While it appears a touch does nothing (keys and assistive technology still act). While it leaves nothing reaches it: a touch, a click, a key or an assistive-technology activation does nothing, and a toast it raised stays live. With reduced motion it only cross-fades. With a mouse it keeps the theme entrance and closes at once.

For cases where you want to show an alert without managing open state, use the `useImperativeAlertDialog` hook: call `alert.show(options)` and render `alert.element` in your tree.

**Nên**

- Make the action button label specific: "Delete project" is better than "OK" or "Confirm".
- Describe what will happen in the description so the user knows the consequences before confirming.
- Keep the cancel button as the least-destructive focus target. On narrow screens the destructive action is visually and structurally above Cancel, but Cancel still receives initial focus.
- Use concise, specific action labels. Above 640px, complete buttons may move onto another row; at 640px and below, the destructive action appears above Cancel and both buttons fill the footer width.

**Không nên**

- Use AlertDialog for non-destructive actions; use a standard Dialog instead.
- Rely on color alone to signal danger; the action label itself should say what will happen.
- Close the dialog from onAction before the work finishes; hold it open with isActionLoading and call onOpenChange(false) when the action settles.

## BottomSheet

A mobile touch surface for filters, actions, forms, and detail views that should rise from the bottom of the viewport. For a multi-step flow, give each step its own sheet and one state value that names the open step (see Replacing a sheet); open a second sheet over the first when a step should stay visible beneath it.

Stacking. Every sheet keeps its own isOpen. Open a sheet while another scrim sheet is open and it stacks on top: the sheet beneath stays mounted with its scroll position and inputs, recedes behind the new one (the nearest covered sheet shrinks to 0.96 and lifts 8px, deeper ones to 0.92 and 16px), and is blocked from pointer, keyboard, and assistive technology by the top sheet's modal dialog. The sheets can be siblings, live in separate components, sit inside another sheet's content, or sit inside a BottomSheetSwitcher step; a whole switcher is one level, and switching its step in place does not change its position. Nothing moves in the DOM: each sheet's dialog stays where it is written, and no wrapper component is needed.

Order is open order. The top sheet is the one presented most recently that is still open; a sheet that closes and reopens comes back on top. When several sheets open in one update (a deep link into a flow), there is no open order between them, so tree order decides: a sheet below the sheets rendered in its content, siblings in the order they are written. That order is right in the first painted frame.

One scrim. Only the bottom sheet's backdrop dims the page; the backdrops of the sheets above it are transparent, so a stack never darkens per level. The dim holds steady while sheets push and pop, and if the bottom sheet closes while sheets remain above it, the next sheet's backdrop takes over in the same frame.

Dismissal. Escape, a tap on the scrim, a downward swipe, and a platform close request (Android back, a close watcher) reach only the top sheet, through that sheet's own onOpenChange, and that sheet's purpose applies: required blocks all of them, form blocks the scrim and the swipe. Nothing closes a whole stack at once; set every sheet closed in one update when a flow is done and they leave together.

Closing a covered sheet from code. Sheets rendered inside the closing sheet's content are part of it: they are presented only while it is open and leave with it. Their isOpen stays yours, as with a Dialog rendered in a closed Dialog: nothing is written to it, and a nested sheet that is still open when its host reopens is presented again, on top. Set it closed yourself when the flow is done. Sheets above the closing sheet that are not in its content stay open and keep their order; the closing sheet slides out from beneath them, and if it owned the scrim, the sheet above takes it over.

Replacing a sheet. Close the top sheet and open another in the same update (one state value that names the open step does this) and the new sheet replaces it instead of stacking on it: the new sheet rises above the one it replaces; if the replaced sheet is taller it moves down to meet the new sheet's top edge at the same time; the replaced sheet fades only after both motions finish, and is inert and hidden from assistive technology from the start. The scrim holds steady throughout, with no dip; focus moves into the new sheet; and when the flow closes, focus returns to the element that opened its first sheet, whichever sheet closed last. This is the handoff the deprecated BottomSheetSwitcher ran between its steps; a multi-step flow needs no switcher: give each step its own BottomSheet and one state value. A replace happens only when exactly one sheet closes and one opens in the update, the closing sheet was the top sheet of its stack, and the move was made from inside it (the control last pressed, or with no recent press the focused element, was in the closing sheet, as a step's own Continue or Back button is); a covered sheet closing while a sheet opens, a close and an open in different updates, or a close and an open driven from a control outside the closing sheet (two unrelated owners acting at once) keep the ordinary push and pop motion and their own focus return. A replace over an open stack runs one level up and leaves the sheets beneath covered. Non-modal sheets (hasScrim={false}) replace each other the same way, with no scrim: they are hosted in the browser top layer as manual popovers, so the entering step orders above the retained one with no page-level z-index, and toasts raised before or while the sheet is open stay above it. Below the Popover API support floor (Tier 2 in the browser support guide) the sheet falls back to show() in page stacking order: usable, but with no promise over later page content. A non-modal sheet returns focus to its opener on close only while focus is still inside it; focus taken elsewhere on the live page stays there.

Focus. Opening a sheet, modal or not, focuses its data-autofocus field (a TextInput with hasAutoFocus) in every browser. Without one, focus goes wherever the engine's native dialog focusing steps land: the panel in Chromium, and in Safari on iOS for a modal sheet; the first focusable control in Firefox. So to open on a field in every browser, mark it data-autofocus (a TextInput with hasAutoFocus). A step entering as a replacement also focuses a data-autofocus descendant first, so a flow that opens on a field keeps the keyboard on it. Closing the top sheet returns focus into the sheet it reveals: to the control that opened it when that control is still there, otherwise to the revealed sheet's panel. When the last sheet closes, the standalone rules apply: finalFocusRef, else the element that opened the sheet, with a focus ring only after keyboard input. When every sheet of a stack closes in one update, focus returns once, to the bottom sheet's finalFocusRef or opener, after the last dialog has closed.

Caveats. A Dialog, AlertDialog, or Popover opened from a sheet paints above the sheet and does not make it recede; a sheet opened from inside that Dialog paints above the Dialog and stacks over the sheet beneath. Sheets with hasScrim={false} stay out of the stack entirely (they replace each other, but never stack, recede, or take the scrim). A sheet React hides (a suspended Suspense boundary, Activity mode="hidden") leaves the stack and closes its dialog; when it is shown again it is presented again, on top. Only sheets rendered in the same document stack; a sheet inside an iframe is its own stack.

**Nên**

- Use for mobile-first surfaces (filters, share sheets, quick actions) where the content should rise from the bottom edge.
- For a drill-in, open the next sheet over the current one and keep each sheet's isOpen where its data lives; a detail sheet can sit inside the list sheet that opens it, right next to the row. Close every sheet in one update to close the whole flow.
- Pick the starting height that fits the content: 'hug' for short bounded content, 'capped' for lists, and 'tall' for forms or streaming/resizing content.
- Use purpose='form' to protect entered data from scrim clicks and swipes while keeping Escape available; reserve purpose='required' for flows that must end through an explicit action.

**Không nên**

- Don't make the sheet content overly long. Break it into steps, each its own sheet, with one state value naming the open step; moving on replaces one with the next.
- Don't stack more than two or three sheets: deeper sheets share the second recede step and the user has to pop them one at a time. Replace steps instead (close one, open the next in one update) when they do not need to stay visible.

## BottomSheetSwitcher

Deprecated: write each step as its own BottomSheet with isOpen, controlled by one state value that names the open step. Closing the top sheet and opening the next in the same update, from a control inside the open step, runs the same replace handoff (see BottomSheet, Replacing a sheet), with no sheetId and no switcher; a step changed from a control outside the flow (a page control, or code after focus left the step) closes and opens with ordinary push and pop motion. BottomSheetSwitcher keeps working until a future minor release removes it: a flow used on its own behaves as released (with three fixes: a toast raised from a step renders above the flow and can be pressed, under reduced motion its steps follow the reduced-motion rule, and a step with a hasAutoFocus field opens on that field in every browser), and a flow stacked with other sheets is one level of the stack (it recedes and is blocked when covered, shares the one scrim, and stands down from dismissal while covered). Modal and hasScrim={false} flows migrate the same way. Set activeSheet to a nested BottomSheet's sheetId to open or switch steps, and to null to close.

Stacking. A scrim flow is one level in the stack of open sheets (see BottomSheet, Stacking). Open it while a standalone sheet is open and the flow sits on top of that sheet, which recedes and is blocked; open a standalone sheet while the flow is open, from a step's content or from anywhere else, and that sheet sits on top while the whole flow recedes as one. Switching the step in place never changes the flow's position. Escape, the scrim, a swipe, and a platform close request reach only the top level: the flow's onActiveSheetChange(null) when the flow is on top, the standalone sheet's onOpenChange(false) when that sheet is. A standalone sheet rendered inside a step's content is presented only while that step is the active one: it leaves when the flow switches step or closes, its isOpen stays yours, and it is presented again, on top, if the step returns while it is still open. Only the bottom level's backdrop dims the page. A no-scrim flow stays out of the stack.

**Nên**

- Prefer one standalone BottomSheet per step with one state value naming the open step; the replace handoff is the same and nothing has to be nested under a switcher.
- Migrate an existing flow in place: replace activeSheet / onActiveSheetChange with one step value, give each step isOpen={step === id} and a guarded onOpenChange (clear the step only if it is still the open one) in place of sheetId, remove the wrapper and move its hasScrim onto every step. Map the other switcher props: onCancel becomes a guarded onOpenChange on each step (ignore false while the flow must stay open) — a standalone sheet reports Escape, the platform close, the scrim tap and the swipe all as onOpenChange(false) with no reason, so the guard holds the step against all of them while it applies, and a veto of Escape alone has no equivalent; the only per-path lever is purpose (form keeps Escape and blocks the scrim tap and the swipe; required blocks all three and exposes the step as an alertdialog). A consumer aria-label or aria-labelledby becomes each step label, which names its dialog. ref, id, data-testid, className, style, xstyle and the other dialog props have no dialog-level equivalent: a standalone sheet sends its ref and base props to the panel div and its dialog is implementation, so a test or anchor that needs the dialog queries the panel closest("dialog"), and dialog-level styling is dropped.

**Không nên**

- Don't split information across sheets when people need to compare it; use a full-page layout that keeps the relevant content visible together instead.
- Don't use a step flow when multiple panels must stay interactive or visible together; a flow intentionally selects one interactive step.

## CommandPalette

CommandPalette is a searchable dialog for quick access to commands, navigation, and actions. Use it as a keyboard-driven launcher powered by SearchSource for filtering and selection.

**Nên**

- Provide a searchSource with bootstrap results so users see useful options before typing.
- Use auxiliaryData.group on items to automatically organize results into labeled sections.
- Provide a specific label when more than one command palette can appear in the same product surface.
- Keep renderItem content non-interactive; each rendered row is one option, so buttons and links cannot be nested inside it.

**Không nên**

- Intercept query-field keyboard events without preserving active IME composition and native Home/End caret movement.
- Use CommandPalette for simple dropdowns or menus; use Menu or Selector for inline selections.
- Add too many groups or items; curate results to keep the palette fast and scannable.

## Dialog

Dialog displays a modal overlay that blocks interaction with the page until the user responds. Use it for delete confirmations, edit forms, terms acceptance, or any decision that should not be skipped.

For cases where you want to show a dialog without managing open state, use the `useImperativeDialog` hook: call `dialog.show(content)` and render `dialog.element` in your tree.

**Nên**

- Choose the right purpose: info for dismissable content, form to prevent accidental backdrop dismissal, required when the user must respond.
- Include a clear title in the header so users immediately understand what the dialog is asking.
- Use purpose="form" for dialogs with inputs so the user can't accidentally lose data by clicking the backdrop.
- Keep dialogs focused on a single task; if the content grows beyond what fits, consider a full page instead.

**Không nên**

- Don't add your own focus return or try to turn it off. When the dialog closes, focus goes back to the opener, or to the nearest control that stands in for it (a dialog opened from a menu row returns focus to the menu's trigger), never to the page. To send focus somewhere specific, focus that element after the dialog has closed: in an effect that runs once isOpen is false. The page outside an open dialog is inert, so a focus call in onOpenChange does nothing.
- Use a dialog for simple messages that could be shown inline or as a toast notification.
- Nest dialogs inside other dialogs; restructure the flow into steps within a single dialog instead. The one exception is an AlertDialog that confirms a destructive action: it asks one question, and Escape closes only the alert.
- Use the fullscreen variant for simple confirmations; it is meant for complex content like editors or long forms.

## Drawer

A side panel that floats above page content for inspectors and detail views: the "click a table row, see its details" pattern. Unlike a docked panel it overlays the layout instead of reflowing it. Works on desktop and touch: the width budget applies on desktop and the panel preserves a 56px page reveal below 640px without exceeding the width budget. Escape closes the drawer (unless purpose is required) and focus returns to the element that opened it. Entry/exit slide animation respects prefers-reduced-motion. On a phone or tablet (a coarse primary pointer), a tap or a drag that lands while the drawer is still sliding in reaches nothing (for a drawer without a scrim, only one on the panel: the page stays live), and the drawer finishes sliding in; keys and assistive technology stay live, and a mouse or a trackpad still clicks: at once when it was the last pointer used, otherwise once it moves. Stacking contract: sibling drawers stack last-opened on top, Escape closes only the topmost, and closing peels innermost-first; render them as siblings, never nested.

Like Dialog, the drawer is a container: its content area is inset by --spacing-4 (16px) by default, by the padding prop, or by a theme's padding on drawer. Compose the header, body, and footer the way Dialog does, with a Layout: DrawerHeader in the header slot (it shows a close button when you pass it onOpenChange, like DialogHeader), the body in LayoutContent, and actions in LayoutFooter. The Layout redistributes the inset to those regions so they line up on one content line, and the header is not inset twice. A lone Section child also escapes the inset. Drawer renders no close button of its own, so give every drawer a visible way to close, especially a non-modal one, which has no scrim to click. Put data-autofocus on the control that should receive focus on open.

Choosing a surface: use Dialog for a centered decision or short form, Drawer for full-height side detail that keeps the page in sight, BottomSheet for block-axis sheets on touch, and a docked panel (a layout column) when content should reflow the page instead of floating over it.

Theming: the panel is the single stable target (astryx-drawer, with data-side reflecting side), and the scrim is the panel's native ::backdrop. DrawerHeader exposes astryx-drawer-header targets for its row, slots, and close icon.

**Nên**

- Use for contextual detail views (row inspectors, entity details) where the user should keep the underlying list in sight.
- Keep the caller as the source of truth: derive isOpen from selection state and clear the selection in onOpenChange.
- Use hasScrim={false} for master-detail flows; non-modal drawers do not trap focus and the page behind stays interactive.
- Keep the last-selected item rendered on close: children stay mounted during the exit animation, so nulling content mid-close blanks the panel while it slides out.
- Give every drawer a visible close action, usually DrawerHeader with onOpenChange; a non-modal drawer has no scrim to click.
- Use purpose="form" when a stray scrim click would discard unsaved input.

**Không nên**

- Use a Drawer for short confirmations or small forms; use Dialog or AlertDialog instead.
- Reach for a Drawer when the content should push the page aside; a Drawer floats over content, so use a docked panel or layout column instead.
- Use a Drawer as a bottom or top sheet; it is inline-axis only, so use BottomSheet for block-axis sheets.
- Nest a Drawer inside another Drawer; render drawers as siblings; the last-opened stacks on top and Escape closes it first.

## HoverCard

HoverCard shows additional information when the user hovers or focuses a trigger element. Use it for profile cards, link summaries, or inline definitions where the user needs more context without navigating away.

**Nên**

- Keep content supplementary; hover cards should enhance understanding without blocking the primary workflow.
- Provide a dashed underline on text triggers so users know the element is hoverable.
- Use the hook API (useHoverCard) when you need more control over timing or placement.
- Leave touchTrigger on auto so a tap opens the card on triggers that do nothing else, and stays out of the way on triggers that perform an action.
- Prefer placing HoverCard in a block context rather than directly in a <p>, heading, or link. Those placements are supported when necessary through a corrective portal, but the DOM and tab order may differ.

**Không nên**

- Place critical actions or required information inside a hover card; users may miss content that only appears on hover.
- Use a hover card when a simple Tooltip or Popover would suffice.
- Use a HoverCard for content the user must interact with; it disappears when the cursor leaves.
- Put the trigger inside SVG <foreignObject>. In Chromium it cannot be a CSS anchor, so the card opens at the viewport corner. Render the trigger in an HTML layer positioned over the SVG node instead, and keep the SVG for shapes, edges and labels.

## Lightbox

A fullscreen overlay for viewing images and videos at full resolution. Supports single-item and gallery modes with prev/next navigation and swiping, optional zoom and pan for images, and native video controls.

**Nên**

- Always provide alt text for every image for screen reader accessibility.
- Use gallery mode with onIndexChange for multi-image sets.
- Enable hasZoom only when viewing high-resolution images that benefit from close inspection.

**Không nên**

- Use the lightbox for content other than images and videos; it shows one media item at a time.
- Nest interactive content inside captions; keep them plain text.

## Overlay

Overlay layers action or supporting content over media, cards, video, or other bounded surfaces with an optional scrim and reveal behavior. Host attributes and DOM handlers (id, data-*, aria-*) reach the root element.

**Nên**

- Use overlays for short, contextual actions or labels that belong directly to the underlying media or surface.
- Keep overlay content compact so it remains legible over the scrim and does not obscure important visual information.

**Không nên**

- Do not use Overlay for floating content anchored outside the surface. Use Popover, Tooltip, or Dialog for those patterns.

## Popover

A click-triggered overlay anchored to a button or trigger element. Use it for secondary actions, inline confirmations, or supplementary information that does not warrant a full dialog. For hover previews use HoverCard, for brief helper text use Tooltip. Under a finger (a coarse primary pointer), it is presented like a native popover: it grows out of its trigger and shrinks back into it on the theme’s motion tokens; with reduced motion it cross-fades, opacity only, in 200 ms or less.

**Nên**

- Keep popover content focused on a single task or piece of information.
- Provide a clear way to close: either by clicking outside or with an explicit close button.
- Theme the painted surface through the canonical popover target.

**Không nên**

- Don't add your own focus return or try to turn it off. When the anchored popover closes with focus inside it, focus goes back to the opener, or to the nearest control that stands in for it, never to the page; as a BottomSheet it uses the sheet's own return. To send focus somewhere specific, focus that element in onOpenChange.
- Nest popovers inside other popovers; it creates confusing focus and navigation.
- Assume input complexity alone determines the presentation; evaluate the task's focus, space, and interaction requirements.
- Assume scrolling alone means Popover is the wrong component; a bounded Popover may scroll while a focused anchored interaction remains appropriate.

## Toast

Toast shows a brief, non-blocking notification to confirm an action or present temporary information; show one with `const showToast = useToast()`, which needs no provider or mounted ToastViewport: inside LayerProvider (or a ToastViewport) it uses that viewport, and otherwise the first toast mounts a fallback viewport on document.body with a development warning. Use it for scenarios where the user needs feedback but not a decision, such as saving, deleting, or changing a status.

For production use, prefer the `useToast()` hook; it handles positioning, stacking, auto-dismiss, and deduplication via `ToastViewport`. Only the viewport announces a toast: a `Toast` rendered on its own, as in a preview, is not a live region and announces nothing. Toasts stay within viewport and safe-area gutters, wrap long message content, and enter, exit, or swipe-dismiss toward their configured top or bottom edge. The vertical swipe uses the same spatial model as placement motion: top Toasts leave upward and bottom Toasts leave downward. Swipe waits for dominant edge-directed intent before cancelling native touch movement and reports the existing manual dismissal reason. Pen is supported as direct-contact input; mouse drag is excluded to avoid conflicting with desktop text selection, where the visible close control remains available. Set `isAutoHide: false` explicitly when an action or message must remain available. The `Toast` component renders the visual toast element inline and is useful for previews, documentation, and static showcases where the viewport lifecycle is not needed. Host `data-*` attributes on `Toast` reach the toast element; its role, live-region attributes, and theme attributes stay component-owned.

**Nên**

- Keep messages short: only a few words that tell the user what happened, like "Changes saved" or "Message sent".
- Add a short undo action in the endContent slot for reversible operations. Set isAutoHide to false when the action must remain available.
- Use uniqueID to deduplicate toasts that fire from repeated actions, like clicking a save button multiple times.
- Use error type for failures that need attention but not immediate action; it persists until dismissed so the user won't miss it.

**Không nên**

- Don't use a toast for critical errors that block the user. Use Banner for persistent, in-context messaging that requires acknowledgment.
- Don't put long or multi-line content in a toast; it disappears after 5 seconds and the user may not finish reading.
- Don't show form validation errors as toasts. Use inline field validation so the user can see exactly which field needs fixing.

## Tooltip

A short text hint that appears on hover or focus, anchored to a trigger element. Use it to describe icon-only buttons, show the full text of truncated labels, or provide supplementary context without cluttering the UI.

**Nên**

- Keep tooltip content concise: aim for under 140 characters of plain text.
- Add a tooltip to icon-only buttons and controls that lack a visible label.
- Set touchTrigger to tap when the trigger is a button whose only job is revealing the tooltip: touch has no hover, and auto keeps the tap for triggers that perform an action. For an info icon, use InfoTip, which also pins its help on a press.

**Không nên**

- Place interactive elements like links or buttons inside a tooltip; use HoverCard or Popover instead.
- Use tooltips for essential information that users must see to complete a task.
