# Table & List

Trích từ tài liệu Astryx (tiếng Anh). Tên prop là của Astryx; khi viết bằng shadcn thì giữ ý của luật. Nếu trái với `../design-rules.md` thì theo design-rules.

## Item

A single, flexible item primitive that unifies the "start content + label + description + end content" pattern across Astryx. Use it wherever you need a structured row: dropdown menus, selectors, contact lists, notifications, file browsers, and activity feeds.

**Nên**

- Use named slots (startContent, label, description, endContent) for the common layout. These cover the 80% case.
- Use density="compact" for menus and dense lists, "balanced" for standard rows, and "spacious" for roomier layouts.
- Set labelLines and descriptionLines to control truncation when content length varies.
- Use align="first-line" when a wrapping label sits beside a small mark (a status dot, a radio, a timestamp) that belongs to its first line. Use align="start" to line up the tops of a tall slot and the text.
- Give a swipe action a second home in the row (a menu or a button in endContent): the swipe is a touch accelerator, and a verb reachable only by swipe is unreachable by keyboard and by mouse.

**Không nên**

- Don't nest interactive elements (buttons, links) inside an interactive Item; it creates confusing focus and click targets.
- Don't use Item for navigation between views; use proper navigation components instead.
- Don't add read/unread or inbox-specific behavior directly; compose a thin wrapper like PreviewItem instead.

## List

A vertical collection of items with consistent spacing, dividers, and optional markers. Supports headers, icons, avatars, badges, and interactive items with click or link behavior. Use it to display ordered or unordered groups of related content.

**Nên**

- Provide a header to label the list and give context to screen readers.
- Use start and end content slots to add icons, avatars, or badges to each item.
- Set edge to line row text up with a heading above the list: flush for static rows, outset or bleed for rows in a Card, Section, or Dialog.
- To line text up with a heading and keep room around the highlight where there is no Card, such as a sidebar, put the heading and the list in a Section with variant="transparent" and set edge="outset".

**Không nên**

- Place interactive elements inside an interactive list item; it creates nested click targets and confusing focus behavior.
- Use a list for a single item or for laying out unrelated content; lists imply a meaningful collection.
- Mix clickable and non-clickable items in the same list without clear visual distinction.

## MetadataList

MetadataList displays key-value pairs for object attributes like quality, condition, and status, in a structured layout. Use it for detail panels, settings summaries, and record information.

**Nên**

- Choose label position based on content: "start" for short values, "top" for long or complex values.
- Collapse long lists with `maxNumOfItems` to keep the page scannable.
- Give each MetadataListItem a short label that names its value. Assistive technology reads each label with its value as a term and its definition.
- The title does not name the list or add a heading. Pass a heading element as the title when the list needs a place in the page outline.

**Không nên**

- Use for extensive form input; use a form layout instead.
- Use for data that doesn't have a clear key-value structure.

## OverflowList

A horizontal list that automatically hides items when they exceed the available width. Use OverflowList for breadcrumbs, toolbars, tag lists, or any row that needs to collapse gracefully at smaller sizes.

**Nên**

- Provide a meaningful overflowRenderer: a "+N more" badge, a dropdown, or a count indicator.
- When the row already has its own menu, use onOverflowChange to feed the collapsed items into it instead of adding a second anchor with overflowRenderer.
- Set minVisibleItems to keep key items visible, and maxVisibleItems to cap the row at a fixed count regardless of available width.
- Use maxRows to let items wrap onto a bounded number of rows (e.g. a two-row tag cloud) before collapsing the rest into the indicator.

**Không nên**

- Use OverflowList for a vertical stack; horizontal multi-row wrap is supported via maxRows, but items still flow left-to-right, not top-to-bottom.
- Render a count-only indicator when people need the collapsed items: make the indicator a control, such as a dropdown menu, so keyboard and screen reader users can reach them.

## Table

Table displays structured data in rows and columns with consistent dimensionality. It supports rich cell content, sorting, selection, pagination, and column management through a composable plugin system. Use Table for data sets with uniform structure; for simpler or inconsistent data, consider a list or card layout instead.

**Nên**

- Use density and divider variants to match the information density and scanning needs of your data.
- Compose rich cell content with Astryx components like Badge, StatusDot, and Avatar via renderCell.
- In children mode, put every row inside TableHeader, TableBody, or TableFooter. <table> cannot contain a <tr> directly: the HTML parser inserts an implied <tbody> for server-rendered markup and React does not on the client, so unwrapped rows mismatch on hydration.
- Omit width for equal flexible columns with a compact 60px readability floor. Give one column its own floor with proportional(1, {minWidth}), weight columns with proportional(n), and fix widths with pixel(); the Table scroll region activates when the combined floors no longer fit.
- Use the data-driven API from React Server Components: proportional(), pixel(), and column definitions without function props are server-safe. Columns using renderCell (or any function prop) need the table wrapped in a "use client" component, since functions cannot cross the server-client boundary.
- To open a row (go to a detail page, open a side panel), put a Link or a Button in the row's main cell with renderCell. Table has no row-click prop. A click handler on the <tr> cannot be reached with the keyboard or a screen reader, so do not use it as the only way to open a row. A renderCell column makes a windowed Table (virtualization) render every row.
- When filters or a search can leave no rows, set emptyState to say so and offer a way out, for example an EmptyState with a "Clear filters" Button.
- Keep long tokens such as code identifiers whole. When you pass `columns`, a data-driven table sizes them from their definitions, not their content, so a token that does not fit its column breaks inside the token. Give that column proportional(1, {minWidth}) or pixel() wide enough for the token, or compose the table in children mode, whose columns follow their content.

**Không nên**

- Use a table for data without consistent columns. Use a list or card layout for heterogeneous content.
- Enable every plugin at once. Add only the features your use case requires to keep the interface focused.
- Rely on the 60px omitted-width floor when a text-heavy column needs more room; set proportional(1, {minWidth}) on that column instead.

## TreeList

An expandable tree structure for displaying hierarchical data with branch connector lines. Use it for file explorers, nested category browsers, or any interface that visualizes parent-child relationships. Under a finger, expanding a row glides the rows below it while its children fade in on the same timing, and a collapse plays it back; pass an `animatedLayout` handle for content after the tree to glide too.

**Nên**

- Provide meaningful labels and icons for each node to make the hierarchy easy to scan.
- Pre-expand important branches so users see key content immediately.
- Leaf rows reserve space for a chevron column whenever the tree has any expandable item to line up under; only a fully flat tree (no expandable items at all) renders its rows flush. Rely on this rather than nudging indentation with custom CSS.

**Không nên**

- Nest more than 4–5 levels deep; flatten the structure or use a different pattern.
- Use a tree for flat, non-hierarchical data; use a List instead.
