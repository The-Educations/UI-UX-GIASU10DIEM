# Container

Trích từ tài liệu Astryx (tiếng Anh). Tên prop là của Astryx; khi viết bằng shadcn thì giữ ý của luật. Nếu trái với `../design-rules.md` thì theo design-rules.

## Card

Card is a bordered, elevated container for discrete, self-contained items: things you could reorder, remove, or interact with independently. Cards are NOT the default layout tool. Most content groups don't need a container at all; spacing and alignment create visual grouping naturally. Only reach for a Card when items need clear interaction boundaries or visual comparison in a grid.

**Nên**

- Ask "could I reorder or remove this independently?" If yes, it's a card. If no, it's just a section of the page: use a heading + Stack or Section.
- Use cards for discrete items: a single user profile, a single notification, a single metric, a product in a grid. Each card represents one "thing" with clear interaction boundaries.
- Spacing and alignment alone create visual grouping. Not everything needs a container; try removing the card and see if the grouping is still clear from whitespace and typography.
- Keep padding consistent across sibling cards so they align visually in a grid or list.
- Pair a card with Layout when you need a structured header, scrollable content, and footer with actions.
- Let cards share a row or grid on a phone: a card shrinks to fit its track and clips content that cannot wrap at its edge. Truncate long IDs, hashes, and URLs with Text maxLines={1} (the full value shows in a tooltip), and give wide content its own scroll region: Table scrolls by itself; put code or other wide content in a ScrollableArea.

**Không nên**

- Default to cards for visual grouping. A heading + Stack with proper spacing creates hierarchy without adding borders everywhere. Cards should be the exception, not the default.
- Wrap page sections in cards. "General Settings", "Notification Preferences", form groups: these are page regions, use Section or heading + stack.
- Create identical card grids (icon + heading + text, repeated). Vary the layout or question whether cards are needed at all.
- Nest cards inside other cards; flatten the hierarchy or use spacing and dividers instead.
- Use color variants for status; use Banner or Badge for that. Color cards are for categorization.

## Carousel

Carousel scrolls a row of items horizontally when they overflow the available width. Use it for card grids, image galleries, product lists, or any set of items that should be browsable without taking up the full page.

**Nên**

- Enable scroll-snap when each item should land precisely at the start edge, like a gallery or product list.
- For iOS paging under a finger and on a trackpad swipe, pass hasSnap={useSnapPaging()} from @astryxdesign/core/SnapPaging. A flick moves one view, or one item with useSnapPaging({pages: 'item'}). A mouse wheel keeps native snapping. Only a carousel given it loads the paging code.
- Reach for hasLoop on small, cyclable sets like a photo gallery, where wrapping past the last item back to the first feels natural.
- Always provide an aria-label that describes what the carousel contains, like "Featured products" or "Team members".
- Carousel implements the WAI-ARIA APG carousel pattern (https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) without auto-rotation: the region is labelled and carries aria-roledescription="carousel", each item is a group named "Slide N of M", and the scroll container is a tab stop while its content overflows, so keyboard users can pan it with the arrow keys; while everything fits it stays out of the tab order.
- Use a consistent gap and item width so the carousel looks intentional, not like content overflowing by accident.
- Trust the built-in navigation: trackpad users can swipe horizontally, and mouse users can hold Shift while scrolling the wheel to move through items.

**Không nên**

- Use a carousel for content every user must see. Not everyone scrolls horizontally, so put critical content above the fold.
- Auto-advance items. Let the user scroll at their own pace.
- Nest carousels. A carousel inside a carousel is confusing and breaks keyboard navigation.

## ClickableCard

An interactive card for navigation or action targets. Nested interactive elements work independently.

**Nên**

- Use for cards that navigate to a detail page or trigger a single action.
- Nest buttons or links freely inside; they handle their own events.

**Không nên**

- Use for toggling selection; use SelectableCard for that.
- Use with a transparent variant and no padding only to borrow the press model for a surface that owns its own box. Compose the chrome-free recipe in the useClickableContainer docs instead: it adds no Card styles to the page.

## Collapsible

Collapsible hides and reveals content behind a trigger button. Use it in settings panels, FAQ pages, or detail views to keep the page scannable while letting users drill into sections they care about. Wrap multiple collapsibles in CollapsibleGroup for accordion behavior. For custom collapsible components, use the `useCollapsible` hook directly (`astryx hook useCollapsible`).

**Nên**

- Give every trigger a meaningful accessible name. Visible text usually supplies it; custom trigger content should include VisuallyHidden text when its visuals do not.
- Use hasDividers on CollapsibleGroup for FAQ-style lists: built-in row hairlines with themed border tokens, no hand-rolled borders.
- Wrap each Collapsible in an Card for visual separation in accordion layouts, or use CollapsibleGroup's hasDividers for flat lists; don't combine both.
- Use CollapsibleGroup with type="single" for settings or FAQ pages where only one section should be open at a time.
- Use type="multiple" when users need to compare content across sections, like feature lists or pricing tiers.
- Start sections open (defaultIsOpen) when the content is likely needed on first view; don't make users click to see essential info.

**Không nên**

- Hide critical or required content behind a collapsible; users may not discover it.
- Nest collapsibles more than two levels deep; it makes content hard to find and navigate.
- Use a collapsible for a single short paragraph; just show the text directly instead.

## SelectableCard

A card that toggles between selected and unselected states with an accent border. For navigation use ClickableCard.

**Nên**

- Use for multi-select choices: filter chips, feature add-ons, or option grids where several can be on.
- Use for multi-select groups; track the selected IDs in a Set.
- When focused, toggle selection with Space or Enter.

**Không nên**

- Use for navigation; use ClickableCard for that.
- Use for a single-select group: each card is a checkbox, so assistive technology announces a multi-select group with one tab stop per card.
