# motion & gestures

Trích từ tài liệu Astryx (tiếng Anh). Tên prop là của Astryx; khi viết bằng shadcn thì giữ ý của luật. Nếu trái với `../design-rules.md` thì theo design-rules.

## createAnimator

Animates one element with the motion Astryx's own components use, without React. `animate` springs an element to new values on the state-change motion, `decay` flings it with the momentum of a released scroll view, and `set` moves it directly, so a card can follow a finger, snap back and be thrown away. Use the `useAnimator` hook in React. To animate an area's layout as its items change, use `useAnimatedLayout`; for what a component already animates, such as a sheet's detents or a carousel's snapping, use the component's own props.

**Nên**

- Start every `animate` that follows a drag with the release velocity, so the element carries on as it was thrown.
- Reach every state an animation shows without the animation too: a key, a button or a menu item that calls the same code.
- `await` the promise before removing an element you animate out, and call `destroy` once it is gone.

**Không nên**

- Read the element’s position from layout while it moves: `get` gives the value on screen, wherever the motion runs.

## createPanGesture

Reports a drag on an element as values, without React, for a surface the product moves itself: a card that follows the finger, a drawer pulled by its handle. A finger, a mouse and a pen all drive it. A mouse or pen drag that starts on selectable text selects that text, and the pan reports nothing. Give that text `user-select: none`. The drag claims its touch at UIKit’s 10 pt, as `UIPanGestureRecognizer` does, so a tap stays a tap and a press or a long press is never reported as a pan. Use the `usePanGesture` hook in React. Where a component already offers the behavior, use its prop instead: BottomSheet's `snapPoints`, Carousel's `hasSnap`. Its example is on the usePanGesture page: one draggable box, made once with the hook and once with createPanGesture.

**Nên**

- Move the element from `translation` added to where it was when the drag began, so it moves with the finger from the moment the drag claims it.
- At `ended`, hand `velocity` to the animation that settles the element, so a flick carries on at the speed it was released.
- Call `destroy` when the element leaves the page, so no listener outlives it.

**Không nên**

- Read the element’s layout on every `changed` event to place it; `translation` already says where the finger is.

## useAnimatedLayout

Returns a handle to pass to a component whose size changes, such as TreeList or Collapsible. When that component changes size, it and the content after it inside `containerRef` animate together on one shared motion role. Fixed and stuck sticky elements stay put, the glide never scrolls the area, and Reduce Motion is respected. It applies under every pointer, a mouse included. Without the handle a component keeps its jump: content after it takes its place at once. Content after the change may mix Astryx components and your own elements; none of it opts in.

**Nên**

- Create one handle per scroll container or panel and pass the same handle to every component in it whose size changes.
- Pass the ref you already give ScrollableArea as containerRef; ScrollableArea does not register itself.

**Không nên**

- Wrap the content after a disclosure in an extra element to make it move; everything after the change inside the container moves on its own.
- Animate height yourself alongside it; the glide moves content with a compositor translate and never animates height.

## useAnimator

Animates one element with the motion Astryx's own components use. Call `animator.animate` to spring an element to new values on the state-change motion, `animator.decay` to fling it with the momentum of a released scroll view, and `animator.set` to move it directly, so a card can follow a finger, snap back and be thrown away. To animate an area's layout as its items change, use `useAnimatedLayout`; for what a component already animates, such as a sheet's detents or a carousel's snapping, use the component's own props. Outside React, use `createAnimator`.

**Nên**

- Call the animator from event handlers and effects: it lives outside render, so animating never re-renders the component.
- Start every `animate` that follows a drag with the release velocity, so the element carries on as it was thrown.
- Reach every state an animation shows without the animation too: a key, a button or a menu item that calls the same code.

**Không nên**

- Keep the animated values in React state: read them with `animator.get()` when you need them.

## useEntryAnimation

Returns a StyleX style for animating an element on mount. Only animates when the element is dynamically inserted after the initial page paint; elements rendered on page load are not animated. Uses Astryx motion tokens (duration, easing) for consistent animation timing. Server-rendered elements hydrate without the entry style and never animate; elements mounted after hydration animate.

**Nên**

- Use for conditionally rendered elements like validation messages, toasts, or expanding sections.
- Spread the returned style into stylex.props() alongside other styles.

**Không nên**

- Use for elements that should be visible on initial page load; they will not animate.

## usePanGesture

Reports a drag on an element as values, for a surface the product moves itself: a card that follows the finger, a drawer pulled by its handle. A finger, a mouse and a pen all drive it. A mouse or pen drag that starts on selectable text selects that text, and the pan reports nothing. Give that text `user-select: none`. The drag claims its touch at UIKit’s 10 pt, as `UIPanGestureRecognizer` does, so a tap stays a tap, and a press or a long press is never reported as a pan. With `axis`, a scroll across that axis that starts on the element stays the page’s; without it, the pan takes a drag in any direction, so a finger’s scroll that starts on the element moves the element instead of the page. A trackpad scroll still scrolls the page. The hook is a thin layer over `createPanGesture`, the same API for code without React. A drag has no keyboard or assistive-technology path of its own: whatever the drag does needs another way to do it, such as buttons or arrow keys (WCAG 2.5.7). The pan moves nothing itself, so Reduce Motion applies to the motion you drive from it: honor the user’s reduced-motion setting in the animation that moves the element. Where a component already offers the behavior, use its prop instead: BottomSheet’s `snapPoints`, Carousel’s `hasSnap`.

**Nên**

- Move the element from `translation` added to where it was when the drag began, so it moves with the finger from the moment the drag claims it.
- At `ended`, hand `velocity` to the animation that settles the element, so a flick carries on at the speed it was released.
- Give every drag another way to do the same thing from a keyboard and from assistive technology, such as buttons, arrow keys or a menu.
- Use a component's own prop when it covers the job: BottomSheet's `snapPoints` for a sheet, Carousel's `hasSnap` for paging.

**Không nên**

- Hold the drag offset in a large component’s state: each `changed` event renders the component that holds it.
- Recognize taps or long presses with it; `useLongPress` and the components’ own press handling own those.

## usePressFeedback

The touch press model every Astryx pressable uses, for a local component that paints its own press. Under a finger, CSS `:active` paints on the touch itself and can outlive the start of a scroll; the press model instead tracks the touch the way UIKit tracks a control: it highlights as the finger lands (after the content-touch delay inside a scroller, where a flick paints nothing), a quick tap answers at the lift, and a scroll that takes the touch cancels it with no fade. One document-level controller does this for every marked element (installed by the first pressable to mount, removed by the last to unmount), so calling the hook adds no listener or state to your element. On a desktop a mouse press is still your `:active` rule: keep it, and drop it under `@media (pointer: coarse)` the way the built-in components do. That query reads the primary pointer, so on a phone or tablet it also drops `:active` for a connected mouse, trackpad or keyboard; the controller paints those presses there (at once, faded at the release), so nothing goes unanswered.

**Nên**

- Spread the result on the element whose background paints the press and compose one of `interactionOverlayStyles` on it; the composed style is the instant onset, the hold and the fade, and it is themed through `--color-overlay-pressed`.
- Let the composed style own the press on every pointer: it keeps `:active` for a desktop mouse and drops it under `@media (pointer: coarse)`, where the controller paints every press (a finger through the press model, a mouse or Space key at once). A rule of your own that paints `:active` would paint under a finger too, on the touch and through a scroll.

**Không nên**

- Add a pointer listener or React state to the element to track the press; the controller already writes the attribute, and per-element listeners are what a long list cannot afford.
- Call it for a control rendered by an Astryx component; those are marked already, and the innermost marked element takes the press.

## useSnapPaging

Gives a Carousel iOS paging on native snap's stops: pass the value as hasSnap={useSnapPaging()}. Under a finger and on a trackpad swipe, a flick moves one view, or one item with {pages: 'item'}, and the row rests on an item's start edge. A mouse wheel keeps native snapping. Only a carousel given the value loads the paging code.

**Nên**

- Use it for a row read one view at a time, such as onboarding screens or a photo strip, where a fast flick must not skip past the next view.
- Pass {pages: 'item'} when several items show at once and each flick should move only one of them.

**Không nên**

- Use it for a row people scan quickly; plain hasSnap keeps native momentum, which can pass several items in one swipe.
