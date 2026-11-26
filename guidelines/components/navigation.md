# Navigation

Trích từ tài liệu Astryx (tiếng Anh). Tên prop là của Astryx; khi viết bằng shadcn thì giữ ý của luật. Nếu trái với `../design-rules.md` thì theo design-rules.

## Breadcrumbs

Breadcrumbs show a trail of links from the root to the current page. Use them at the top of detail pages, settings panels, or anywhere the user needs to see where they are and navigate back up.

**Nên**

- Place breadcrumbs above the page heading so the user sees their location before reading the content.
- Keep labels short and match the page titles they link to: "Settings" not "Application Settings Page".
- Use the supporting variant in dense UIs like admin panels or sidebars where the breadcrumb should be subtle.
- Make the last item plain text, not a link; it represents the current page. The component does this automatically when you set isCurrent.
- The component implements the WAI-ARIA APG Breadcrumb pattern: a labelled nav landmark wrapping an ordered list, with aria-current="page" on the current item. A crumb with a menu additionally implements the APG Menu Button pattern, opening on Enter, Space or ArrowDown and closing on Escape.
- Give each trail its own label when a page renders more than one, so the nav landmarks stay distinguishable in a screen reader landmark list.
- The built-in slash separator mirrors automatically in RTL. For a custom separator, leave Unicode-mirrored angle quotes such as › alone; mirror arrows and Icon separators once with rtlStyles.mirror.

**Không nên**

- Use breadcrumbs as the primary navigation. They supplement a sidebar or top nav, not replace it.
- Show breadcrumbs on top-level pages that have no parent; they add clutter without helping the user.
- Let the trail grow beyond 5 levels. If you need more, consider simplifying the page hierarchy instead.
- Mirror a separator the bidi algorithm already mirrors. An angle-quote glyph such as › is Bidi_Mirrored, so it flips under RTL on its own and rtlStyles.mirror would flip it back. An arrow glyph such as → and any Icon separator are not, so those do need rtlStyles.mirror through xstyle.

## MobileNav

A slide-out drawer for mobile navigation. MobileNav is the mobile counterpart to SideNav and accepts the same children. Use it on narrow viewports where a persistent sidebar is not practical. Inside AppShell, use MobileNavToggle as the trigger; it reads state from context automatically.

**Nên**

- Share the same nav items between MobileNav and SideNav by extracting them into a variable.
- Provide a header when the drawer's purpose is not obvious from its content.
- Inside AppShell, use MobileNavToggle to open the drawer; it reads state from context. Do not pass isOpen/onOpenChange to the toggle.

**Không nên**

- Use MobileNav on desktop: use a persistent SideNav instead.

## NavHeadingMenu

Accessible menu container and items for nav heading popovers. NavHeadingMenu provides role="menu" with keyboard navigation; NavHeadingMenuItem renders individual selectable items. Pass as the menu prop of SideNavHeading or TopNavHeading.

**Nên**

- Pass NavHeadingMenu as the menu prop of SideNavHeading or TopNavHeading. Where the heading closes on a choice, choosing an enabled item runs its onClick or link and closes the menu.
- NavHeadingMenu follows the keyboard model of the WAI-ARIA APG Menu pattern (https://www.w3.org/WAI/ARIA/apg/patterns/menubar/): a menu of menuitem rows. ArrowDown and ArrowUp move one row and wrap, Home and End go to the first and last row, typing a character moves to the matching row, Enter or Space activates the row, and Escape closes the heading menu where the heading supplies a close action.
- Give a NavHeadingMenu used on its own an aria-label. The menu has no accessible name unless you pass one.

**Không nên**

- Remove a destination the user cannot use right now when knowing it exists helps them. Set isDisabled instead: the row stays reachable by the arrow keys and typeahead, is announced as disabled, and does nothing when chosen.
- Put other interactive controls in the menu. The arrow keys move only between NavHeadingMenuItem rows, so another control is skipped.

## NavIcon

NavIcon is a circular icon container with an accent-colored background. Use it in navigation headers such as TopNavHeading and PageNavHeader to visually identify a section or application.

**Nên**

- Use in navigation headers to provide a recognizable visual anchor for the section.
- Pass an Icon or similarly sized icon component to ensure proper proportions.

**Không nên**

- Use NavIcon for interactive purposes; it is a display-only container, not a button.

## Outline

A table-of-contents sidebar for documentation pages, help centers, wikis, and long settings pages. Use it for navigation within a single page, not for app routes. Features a sliding indicator track that animates to the active heading. Each link is in the normal Tab order, and Enter/Space activate.

**Nên**

- Pass a flat ordered list of headings and let level control indentation.
- Use activeId when custom scroll logic owns the active section.
- Use density="compact" in dense sidebars where vertical space is tight.
- Use useOutlineFromMarkdown or useOutlineFromDOM when headings are generated from content. For linkable Markdown headings, pass the same createMarkdownHeadingLinks() entry to Markdown and Outline; configure headingIdPrefix on that plugin for multiple roots.
- Pass scrollContainerRef when the content scrolls in a split pane, modal, or panel instead of the viewport.
- Set offset to the height of a fixed header that overlays the content, so headings land below it instead of underneath it.
- Give each Outline a distinct label when a page has more than one navigation landmark, so screen reader users can tell them apart.

**Không nên**

- Use Outline for application navigation - use SideNav or TopNav for routes.
- Use Outline for expandable hierarchy - use TreeList when nodes need expand and collapse.
- Rely on onNavigateEnd to mean "arrived" - it also fires when the user interrupts the scroll.

## Pagination

Pagination lets users step through pages of content. Place it below a table, list, or card grid so users can move forward and backward through results. Pick a variant to match the context: numbered pages for data tables, a count for large lists, compact for tight spaces, or dots for carousels.

**Nên**

- Place pagination below the content it controls so users see results before navigating.
- Use the pages variant for data tables where users need to jump to a specific page.
- Use the count variant with a page size selector when users need to control how many items they see at once.
- Use the dots variant for carousels and walkthroughs where the total is small and position matters more than a number.
- Pass totalItems when the total is known so users can see how much content remains.
- Pass getPageHref when each page has its own URL, so a page opens in a new tab and its address can be copied.

**Không nên**

- Show pagination when all items fit on a single page; there is nothing to paginate.
- Use the dots variant for more than about 10 pages; the dots become too small to be useful.
- Place pagination above the content; users expect it at the bottom.
- Navigate in onChange when getPageHref is set; the link navigates, so keep onChange for state or analytics.

## SideNav

A sidebar navigation component for organizing application pages with sections, nested items, and icons. Use SideNav as the primary navigation when an app has 5 or more destinations or requires hierarchical grouping.

**Nên**

- Use sections to group related navigation items and help users scan for their destination.
- Pair outline and filled icon variants so the selected state is visually distinct.
- Mark the current page with isSelected: it sets aria-current="page", so the current destination is announced rather than carried by color alone.
- SideNav renders a navigation landmark, and a collapsible item follows the WAI-ARIA APG Disclosure pattern (https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/): the toggle carries aria-expanded and aria-controls, and the group it owns is inert while collapsed. Keep item labels short; they name icon-only items unless a meaningful aria-label supplies more context.
- While the nav is collapsed, an item with children shows them in a submenu flyout. On a device that can hover, pointing at the item opens it after a short delay and moving away closes it; a flyout opened by clicking stays open until it is dismissed. On touch, it opens on tap. Do not put an action in there that has no other route to it.

**Không nên**

- Include a SideNavHeading when a TopNav is already providing app identity; this duplicates branding.
- Use for filtering content; use tabs or filter buttons instead.

## Stepper

Steppers display progress through a sequence of logical and numbered steps. Use them for multi-step workflows like forms, onboarding flows, or checkout processes where users need to see their position and the steps ahead. Rendered as an ordered list (not a navigation landmark).

**Nên**

- Keep step labels short and descriptive: "Payment" not "Enter your payment information".
- Use the vertical orientation when steps carry longer descriptions. A horizontal stepper handles narrow containers itself: once the frame gives each step less than horizontalOptions.minimumStepWidth (112px by default) it drops the labels for a segmented track and uses the configured collapsedVariant beneath it.
- Set horizontalOptions.collapsedVariant to 'withLabel' when the page already supplies Back/Continue, or to 'hiddenLabel' when surrounding UI owns both the current-step heading and navigation and only a bare progress track is needed.
- Provide onStepClick for non-linear workflows where users may need to revisit earlier steps.
- Use status only to apply a semantic color (accent/success/warning/error); pass a custom icon for richer indicators.

**Không nên**

- Use a stepper for fewer than 3 steps; a simple heading or progress bar works better.
- Use more than 7 steps; consider grouping related steps or using a different pattern.

## TabList

TabList provides tab-style navigation for organizing content into categorized sections. Use it to let users switch between related views without leaving the page. A strip narrower than its tabs scrolls horizontally and keeps the selected tab in view.

**Nên**

- Keep tab labels short and descriptive so users can quickly scan available sections.
- Leave overflow handling on: a strip narrower than its tabs scrolls, and the selected tab is kept in view. Use TabMenu when you want a curated group of extra options rather than a scrolling strip.
- When using hasDivider with action buttons alongside tabs, match the Button size to the TabList size (both md, both sm); the divided tab strip reserves space so tabs and same-size buttons align to a shared baseline above the rail.
- Reach for role="tablist" when the strip switches panels in place, and give each tab a panelId pointing at the panel it opens: that link is how a screen reader gets from a tab to its content. Leave it off for navigation between views.
- Set isFullBleed to stretch a tab bar inside a padded LayoutHeader, Card, or Section to the container's inline content edges, instead of reaching for negative-margin CSS.

**Không nên**

- Use tabs for sequential steps or workflows; use a stepper or wizard pattern instead.
- Place more than 6–8 visible tabs before the overflow menu; prioritize the most important categories.
- Confuse TabList with SegmentedControl or ToggleButton. TabList is for navigation between views. SegmentedControl and ToggleButton are input controls: SegmentedControl always has exactly one selected option, while ToggleButton can be toggled on or off.

## TopNav

TopNav is a horizontal navigation bar for product-level navigation in application headers. Use TopNav for 5 or fewer always-visible navigation items, or minimal navigation paired with search and controls. For complex navigation hierarchies, use a sidebar; to filter content, use tabs or filter buttons instead.

**Nên**

- Include a product logo and name in the heading slot to clearly identify the application.
- Limit primary navigation items to 5 or fewer for quick scanning and minimal cognitive load.

**Không nên**

- Avoid using TopNav to filter page content; use Tabs or filter controls instead.
- Avoid deeply nested navigation hierarchies; keep menus to one level of depth.

## useOutlineFromDOM

Builds outline items from the headings already in the page. Use it when the article is not a Markdown string, and pass the items to Outline. The list updates when headings are added, removed, renamed, or given a new id. A null ref returns an empty list.

**Nên**

- Put an id on every heading the outline should list. A heading with no id, or with no text, is omitted.
- Point the ref at the article, not the page, so headings outside the article stay out of the outline.

**Không nên**

- Expect the hook to invent ids. It only reads the ids the headings already have.
- Use it for a Markdown string. useOutlineFromMarkdown follows the same parser and slugs as Markdown.

## useOutlineFromMarkdown

Extracts the headings of a Markdown string for an Outline next to the rendered document. It uses the parser and heading slugs that Markdown uses, so in a complete document each item links to its heading, and fenced code never counts as a heading. The result is memoized on the source and the options. Outside React, use parseOutlineFromMarkdown.

**Nên**

- Pass the same string, plugin list and finality to Markdown and this hook, so items match the rendered headings once the content is complete.
- Declare the plugin list outside the component or memoize it. A new array on each render recomputes the outline.
- For several documents on one page, install one createMarkdownHeadingLinks per document with headingIdPrefix, so their ids do not collide.

**Không nên**

- Write the items by hand or find headings with a regular expression. They drift from the rendered ids.
- Expect every item to have a target while content streams. Markdown reveals text gradually and trims unfinished syntax, so a heading can be absent or have another id until the content is complete.
- Expect an item to link to a heading that cites a Markdown sources entry. The hook does not receive sources, so the ids differ: for '# Intro [ref]', Markdown renders intro and the hook returns intro-ref.
- Expect an item for a nested heading, such as one in a blockquote. Only root headings become items.
