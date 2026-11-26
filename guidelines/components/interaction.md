# interaction

Trích từ tài liệu Astryx (tiếng Anh). Tên prop là của Astryx; khi viết bằng shadcn thì giữ ý của luật. Nếu trái với `../design-rules.md` thì theo design-rules.

## createDragToSnapPoints

Lets a drag move an element along one axis and settles it on snap points when the finger lifts, the way an iOS sheet settles on its detents: on the nearest snap point to where it is, on the next one in its direction after a quick flick, and back where it started when the finger was moving back. The settle continues the release's velocity. For a bottom sheet, use BottomSheet's `snapPoints`; for a scrolling row, Carousel's `hasSnap`. Use the `useDragToSnapPoints` hook in React.

**Nên**

- Offer the same positions without a drag: buttons or keys that call `settleTo`.
- Keep the snap points few and far apart, so a release clearly picks one.

**Không nên**

- Use it for a sheet or a carousel: their own props already settle the way people expect.

## createReorderable

Makes a collection's rows reorderable. On a touch screen a finger held still on a row's handle for a moment picks it up (a flick on the handle still scrolls): the row stays in its place, dimmed, while a copy of it follows the finger and an accent line marks where it would land; the other rows stay still, the page scrolls near its edges, and on release the rows rearrange. A pen held still on a handle where the primary pointer is coarse picks the row up as a finger does. A mouse, or a pen where the primary pointer is fine, drags a handle at once the same way, and the rows take their places without motion; a cancelled drag puts everything back at once. Without a drag, the handle toggles reorder mode for its row (a click, Space or Enter): each arrow key moves the row a place at once, and Escape or another activation ends the mode, keeping the moves; screen readers hear each move with the row's place and neighbours, and a hint shows the moves and Done as buttons, for taps alone. The reorder code ships with this function: a collection without the prop loads none of it.

**Nên**

- Give each row a stable key from your data, a string or a number (`itemKey={item.id}`), and apply each move by rendering the items in their new order in the same task.
- Use `isReorderable` for rows that must stay put, such as a pinned first row.
- Offer reorder mode from your own UI too, such as a row's context menu, with `reorderable.start(item.id)`.

**Không nên**

- Use React's `key` as the reorder key, or index-based keys: a move changes every index after it.

## createSwipe

Gives a list row the verbs a sideways swipe uncovers, the way a mail row reveals Archive and Delete on a phone: `const mail = createSwipe({trailing: [{id: 'archive', label: 'Archive', onActivate: ({itemKey}) => archive(itemKey)}]})`, then `<ListItem label="Inbox" itemKey={message.id} swipe={mail} />`. A finger, a pen or a trackpad’s two-finger swipe drags the row; a mouse never does. A plain function, not a hook, pure and cheap: define the swipe once at module scope, where each handler reads the row from `itemKey`, or in `useMemo` when its handlers need component state. A new value with the same ids neither closes an open row nor restarts its settle, and it does no DOM work. The swipe’s code comes with this function, so a row given `swipe` is swipeable at its first paint and an app that never imports it ships none of it.

**Nên**

- Give every swipe action a second home in the row, such as a menu or a button in endContent: a verb reachable only by swipe is unreachable by keyboard and by mouse.
- Put the rows in a List, which clips them in the inline axis; any other container sets overflow-inline: clip once.

**Không nên**

- Give a `commit` side more than one entry: it fires none of them.

## useClickableContainer

Makes a container element clickable while preserving nested interactive element behavior. Solves the "nested interactive elements" problem: when a card is clickable but contains buttons/links, clicking those should NOT trigger the card's action. Detects interactive ancestors between the click target and the container, and ignores text selections. Supports href navigation (including middle-click and Ctrl/Cmd+click for new tabs).

**Nên**

- Attach onClick, onMouseUp and onPointerDown to the container element: full click handling including middle-click, and no touch pressed state for a press on a nested control.
- Use inside ClickableCard or SelectableCard for the standard card interaction pattern.
- For a pressable surface without Card chrome, such as a quoted message that jumps on press, compose it yourself: this hook on the surface; `usePressFeedback()` and `interactionOverlayStyles.backgroundColor` (from `@astryxdesign/core/utils`) on the same element for the hover tint and touch press; a native `<button>` (or an `<a>` for a destination) inside `VisuallyHidden` as the named control and interactiveRef; and `focusOutlineStyles.focusWithin` (from `@astryxdesign/core/utils`) on the surface for the shared focus ring, the one ClickableCard draws. The `Core/Hooks/useClickableContainer` story has the full recipe.

**Không nên**

- Use when the entire container is a single interactive element; just use a <button> or <a> directly.

## useClipboard

Copy-to-clipboard behavior: the clipboard write, a transient isCopied flag with its own reset timer, and an optional polite screen-reader announcement. Extracted so every copy affordance is a thin control over one implementation instead of re-deriving the timer and announcement. Rapid re-copies restart the reset timer so the confirmation always lasts the full duration, and the timer is cleaned up on unmount. It also copies inside a sandboxed frame that refuses the async Clipboard API, with the browser copy command, inside the reader’s click or key press. CodeBlock and Timestamp build their built-in copy buttons on it; reach for it directly when building a copy affordance that is not a plain icon button (a menu item, a labeled text button, a copy-on-click value chip).

**Nên**

- Drive the copied confirmation (copy → check icon, label swap) off the returned isCopied flag rather than tracking your own state.
- Pass a localized announce message so the copy is spoken by screen readers; swapping the button aria-label alone is not reliably announced.
- For the common compact icon copy button, render a ghost IconButton with a "Copy" tooltip and wire onClick to copy(); the tooltip stays "Copy" and the icon flip is the confirmation.

**Không nên**

- Track a separate copied useState alongside the hook; isCopied already reflects the copied window and resets itself.

## useCollapsible

Reusable hook that encapsulates the collapsible state machine. Supports three modes: group-controlled (inside CollapsibleGroup), controlled (isOpen + onOpenChange), and uncontrolled (self-managed with defaultIsOpen). Used internally by Card and Section.

**Nên**

- Use the hook directly when building custom collapsible components that need Astryx collapsible behavior without Collapsible wrapper.
- For accordion behavior, wrap items in CollapsibleGroup and pass unique value props.

**Không nên**

- Pass local isOpen, defaultIsOpen, or onOpenChange expecting them to run for a value-bound group item; the group owns that state and notification path.
- Implement your own open/close state when useCollapsible already provides it; the hook handles group coordination automatically.

## useContainerReveal

A headless hover/focus reveal primitive. Gives a container a scoped trigger that reveals (or conceals) content inside it when the container is hovered or receives keyboard focus: the classic "row actions appear on hover" pattern. The reveal is CSS-only: no hover state lives in React and hovering never triggers a re-render. The caller authors no StyleX for the reveal itself; the hook hands out the container and content styles, and a nested container shadows its ancestor, so nested containers never leak hover/focus into one another. Accessible by construction: revealed content is visually hidden at rest with position and opacity (never display:none), so it stays mounted, keeps its place in the tab order, and is announced to assistive technology; it reveals on :focus-within so keyboard users see it when tabbing in, stays visible under a coarse primary pointer (never gated behind hover there), and honors prefers-reduced-motion.

**Nên**

- Destructure getContainerProps and getContentRevealProps; spread getContainerProps() on the container (via mergeProps with your own stylex.props) and getContentRevealProps() on the content to reveal.
- Use for secondary affordances: reveal-on-hover row actions (edit/copy/remove on list or table rows) and overlay controls on a card or media tile (e.g. Thumbnail's remove button).
- Gate the reveal with isEnabled when a consumer prop decides whether content is revealed on hover or always shown; it can change at any time.
- Pass isLayoutPreserved for absolutely-positioned or overlay content to reserve its box and avoid layout shift when it appears.
- Set a hoverDelay (100-250ms) on rows in a long list, so a cursor travelling across the list does not light up every row it passes; keyboard and touch still reveal immediately.
- Reach for forceState when something other than the pointer owns the interaction (a drag, a scroll or motion gate, an open row menu), and forceVisibility when just one element should ignore the container.

**Không nên**

- Reach past the API into the hook's private custom properties (--_reveal-opacity and friends) to suppress a reveal; use forceState / forceVisibility, which survive a rename.
- Use it to hide content that must always be discoverable; keep essential actions visible instead of gating them behind hover.

## useDragToSnapPoints

Lets a drag move an element along one axis and settles it on snap points when the finger lifts, the way an iOS sheet settles on its detents: on the nearest snap point to where it is, on the next one in its direction after a quick flick, and back where it started when the finger was moving back. The settle continues the release's velocity. For a bottom sheet, use BottomSheet's `snapPoints`; for a scrolling row, Carousel's `hasSnap`. Outside React, use `createDragToSnapPoints`.

**Nên**

- Offer the same positions without a drag: buttons or keys that call `settleTo`.
- Keep the settled index in state from `onSettle`, and render what the position means from it.

**Không nên**

- Use it for a sheet or a carousel: their own props already settle the way people expect.

## useHotkeys

Registers global keyboard shortcuts with a single window keydown listener per hook instance. Handlers live in a ref, so re-renders never re-subscribe. Skips events from typing targets (input, textarea, select, contenteditable) unless allowInInputs, skips defaultPrevented events, and calls preventDefault() on match. SSR-safe.

**Nên**

- Use for app-level shortcuts like command palettes (mod+k), help overlays ("?"), and navigation keys.
- Pair with the Kbd component to display the same combo you register; both resolve "mod" per platform identically.
- Use isDisabled to suspend shortcuts while a modal or wizard owns the keyboard, instead of unmounting the hook.

**Không nên**

- Use for focus-scoped keyboard navigation inside a widget; use useListFocus or useGridFocus instead.

## useHoverCard

Headless hook for hover-triggered floating cards. Builds on useLayer with hover/focus intent detection, configurable delays, safe hover behavior, and accessible aria-describedby linking. Use for rich previews on hover when you need full control over the trigger or rendered content.

**Nên**

- Use for rich content previews such as user profiles, entity summaries, and link previews.
- Prefer the HoverCard component for standard trigger-content pairs; use the hook for custom trigger patterns.

**Không nên**

- Use for simple text hints: use Tooltip or useTooltip instead.

## useInputContainer

Makes an input container wrapper clickable, delegating focus to the inner input/textarea when the user clicks non-interactive areas (icons, padding, status indicators). Built on top of useClickableContainer, so nested interactive elements (clear buttons, calendar toggles, links) are handled safely; clicking them does NOT steal focus from the input. Automatically detects input type: text-like inputs receive .focus(), while other types (checkbox, radio, file) receive .click().

**Nên**

- Use inside input wrapper components (TextInput, NumberInput, TimeInput, TextArea) to make the full container area clickable.
- Attach both onClick and onMouseUp to the wrapper div for full interaction handling.

**Không nên**

- Use on bare inputs without a wrapper; there is no benefit if the input already fills the full clickable area.

## useInputStatusIcon

Builds the on-field status affordance for a bordered input and its accessibility wiring, so every input in the family behaves the same for a given status. The attached variant renders a plain glyph and leaves the text to the message box; the detached variant renders nothing here, because the message box already carries its own icon; the tooltip variant renders a real focusable button whose tooltip is reachable by keyboard, pointer, touch and assistive tech. Use it when building a bordered input, not for field-level messaging.

**Nên**

- Render statusIcon inside the input container and merge describedBy into the control's aria-describedby list.
- Let it decide when nothing should render; pass isInGroup and the variant through rather than branching at the call site.

**Không nên**

- Use it to convey the status by icon alone; the tooltip variant is the only one that carries the message, so the others still need a message box.

## useInteractiveRole

Resolves what a polymorphic component should render as, in one place: href wins, then onClick, then an interactive trigger context supplied by a parent (Popover, DropdownMenu and friends), then inert. Use it in any component that is sometimes a link, sometimes a button, and sometimes plain content; Token, Thumbnail, Item and ClickableCard all do. Because context is part of the resolution, a component built on it becomes a valid trigger for new surfaces without changing.

**Nên**

- Switch on the returned role to pick the element, and render an anchor only for "link" so keyboard and middle-click behavior come from the platform.
- Pass isDisabled through rather than dropping the href yourself; the hook already keeps disabled links out of the tab order.

**Không nên**

- Add another ad-hoc href/onClick precedence check in a component; new trigger contexts are added here so every consumer inherits them.

## useLayer

Core positioning hook for rendering overlay content using CSS Anchor Positioning and the Popover API. Use it as the foundation for custom popovers, hover cards, tooltips, and fixed-position layers when higher-level components are not enough. Both modes use theme body text defaults and end ancestor surface/group membership as a whole, including group-owned state. Explicit props and unrelated contexts remain unchanged. Apply intentional formatting through render styles or content, and establish complete content-local providers inside the rendered layer.

**Nên**

- Use context mode for anchor-positioned overlays relative to a trigger element, and fixed mode for manually positioned overlays at specific coordinates.
- Build on higher-level components like Popover, HoverCard, and Tooltip for common overlay patterns.
- Rely on the Popover API top layer to escape ancestor clipping and stacking, and host the layer near its trigger rather than in the body so it inherits the trigger's theme cascade and keeps a natural focus order.

**Không nên**

- Implement ARIA patterns directly in a Layer unless you also own the full accessibility behavior.

## useLightbox

State management and accessible trigger wiring for Lightbox. Eliminates boilerplate for managing open state and current index. Returns trigger props with button role, tabIndex={0}, aria-haspopup="dialog", and keyboard activation handlers, along with a pre-wired Lightbox element that handles dismissal, next/previous navigation, and focus restoration.

**Nên**

- Spread getTriggerProps(index) onto image or thumbnail elements to give them accessible button semantics and keyboard activation.
- Render lightbox.element once in your component JSX tree alongside the triggers.

**Không nên**

- Manage separate isOpen or index state alongside useLightbox; the hook already tracks both.
- Add custom click or keydown handlers to open the lightbox when using triggerProps or getTriggerProps.

## useLongPress

Detects a single-finger press-and-hold and reports where it happened, so touch users can reach affordances that a pointer gets from right-click. iOS Safari never synthesizes a contextmenu event on long-press, which makes this the only touch route into a cursor-positioned surface such as ContextMenu. The press cancels on movement, lift, multi-touch or unmount. The hold is timed on the touch events’ own timestamps: when a busy page handles the lift late, a finger held for the full delay still reports its long press, before the lift acts.

**Nên**

- Use the reported point to position the surface you open, so it appears under the finger.
- Pair it with the pointer contextmenu handler rather than replacing it; this hook only covers touch.

**Không nên**

- Use it for the primary action of a control; press-and-hold is undiscoverable as the only way to do something.

## useMenuPress

The press model of macOS and iOS menus, for any pointer: the row under the pointer when it is RELEASED is the row that acts, the highlight follows the pointer while it is held, a mouse opens the menu on press and can drag straight into it, and a finger or a pen opens it while still down: as it presses with no delay given, picking a row only after moving 10 px, or else once it is held for the delay. The pointer is tracked at document level by pointerId, so a finger that slid off the row it landed on is still followed; the click the browser reports at the end of a touch, aimed at the row where the touch began, is swallowed so nothing acts twice. DropdownMenu, ContextMenu, DropdownMenuSubMenu, Selector and the menu bottom sheet already mount it; reach for it directly only when building a menu-like surface of your own.

**Nên**

- Pass a selector for ENABLED rows only, so a disabled row or a divider under the pointer clears the highlight instead of lighting up.
- Let the default highlight move focus in a menu; supply onHighlight only for a listbox that must keep focus on its combobox and highlight through aria-activedescendant.
- Declare touch-action on the menu root: pinch-zoom when its rows fit, pan-y pinch-zoom when it scrolls, so the browser — not the hook — decides when a finger is scrolling, and a two-finger pinch still zooms the page.

**Không nên**

- Act on a row from its own pointerdown or pointerup handler as well; the hook already activates the row under the release, and a second path acts twice.
- Read a row click with detail 0 as a keyboard activation; the hook dispatches its pointer activation with detail 0 too. Use isMenuPressActivation() to tell them apart.

## useOverlay

Adds overlay behavior to a container you already render, such as a Card or a custom media frame, without the wrapper Overlay adds. Spread containerRef and containerProps on the container, then render element (or renderOverlay(children)) once inside it. The scrim is absolutely positioned, so it covers the nearest positioned ancestor: the container itself, or a positioned section inside it such as an image area. Visibility is CSS-driven from the container's :hover and :focus-within, so with showOn 'hover' a keyboard user reveals the content by moving focus into the container. Hidden content is not focusable, so the container needs a focusable element before the overlay content in tab order. A revealed scrim takes pointer input over the area it covers, so put that element outside the scrim, or use a top or bottom strip and keep it in the part the strip leaves uncovered.

**Nên**

- Use showOn 'hover' for actions on media cards: it also reveals on keyboard focus within the container.
- Put a focusable element (a link or the card title) before the overlay content in the container, so Tab reveals the content and the next Tab reaches it.
- Use the Overlay component when you do not already have a container element to attach to.

**Không nên**

- Put the only way to reach an action behind hover with nothing focusable before it; keyboard users cannot focus content that is hidden.

## usePopover

Headless hook for click-triggered popovers with focus trapping. Combines useLayer with useFocusTrap, auto-focus, light dismiss, Escape handling, and an optional hidden close button for accessible dialog-like popover behavior. Every painted surface emits the canonical popover target. A custom composition needing a distinct stable seam should pass and document its own surfaceTarget.

**Nên**

- Use for interactive content such as menus, pickers, forms, and command panels that need focus management.
- Prefer the Popover component for standard trigger-content pairs; use the hook for custom trigger patterns.
- Do not add your own focus return: the hook returns focus as the popover closes, to the opener or a stand-in, and has no option to turn that off.
- Use popover as the broad canonical surface target.
- When a custom composition needs its own theme refinement, pass and document an owned surfaceTarget such as selector-popup. It refines the Popover surface rather than creating another anatomy part.

**Không nên**

- Use for non-interactive hover previews: use useHoverCard or useTooltip instead.

## useToast

Hook for showing toast notifications from anywhere in your component tree; it needs no provider or mounted ToastViewport: inside LayerProvider (or a ToastViewport) it uses that viewport, and otherwise the first toast mounts a fallback viewport on document.body with a development warning. Returns the show function itself (not an object): `const showToast = useToast()`; call it with toast options to show the notification.

**Nên**

- Use for transient success/error feedback that does not require user action.
- Set uniqueID to deduplicate toasts from rapid user actions.
- For an undo action, pass endContent: <Button label="Undo" variant="ghost" onClick={...} />, and call the dismiss function that showToast returns from that onClick.

**Không nên**

- Use for critical errors that require acknowledgment; use AlertDialog instead.
- Call useToast in the same component that renders LayerProvider; it must be called from a child component inside the provider.

## useTooltip

Headless hook for hover/focus-triggered tooltips. Builds on useLayer with hover intent, keyboard focus handling, and accessible aria-describedby linking. Use for custom trigger elements that need tooltip behavior without the wrapper component.

**Nên**

- Use for brief text labels that describe icon buttons, truncated text, abbreviations, or compact controls.
- Prefer the Tooltip component for standard wrapping; use the hook when the trigger is not a simple child.
- For a toggle-style trigger, have your own button call show() and hide() on each press. Give it aria-describedby and aria-controls set to describedBy, and aria-expanded (true while show() holds the tooltip, false after hide() or onHide), and keep its own accessible name. For an info icon, use InfoTip instead.

**Không nên**

- Put interactive content inside tooltips: use Popover or HoverCard instead.
