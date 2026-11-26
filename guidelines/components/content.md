# Content

Trích từ tài liệu Astryx (tiếng Anh). Tên prop là của Astryx; khi viết bằng shadcn thì giữ ý của luật. Nếu trái với `../design-rules.md` thì theo design-rules.

## Avatar

Avatar represents a person or team with a profile photo, initials, or a default icon. Use it in comment headers, contact lists, chat messages, user cards, and anywhere you need to identify someone visually.

**Nên**

- Always pass a name so the avatar can show initials if the photo fails to load, and so screen readers can announce who it represents.
- Pick a size that matches the context: xsm or sm for inline mentions, md or lg for lists and cards, xl for profile headers.
- Add a status dot when knowing someone's availability matters, like in chat or team views.
- When wrapping an Avatar in your own Tooltip or HoverCard, set tooltip={false} so the built-in name tooltip does not overlap yours.
- Give every interactive avatar (href or onClick) a name or alt. It is the control's accessible name, and it warns in development when it is missing.

**Không nên**

- Rely on a status label to name an interactive avatar. "Online" says nothing about where the link goes.
- Use Avatar for logos, product images, or anything that isn't a person or team. Use an image or icon instead.
- Use xstyle or className to override shape. Use the shape prop instead so themes can control it globally.

## AvatarGroup

AvatarGroup displays multiple avatars in an overlapping row with an optional overflow indicator. Uses a compositional API: pass Avatar children directly so each avatar can carry its own props (status dots, click handlers, etc.).

**Nên**

- Slice the list yourself and pass only the avatars you want visible; 3-5 is typical. The group renders exactly the children it is given and never slices for you.
- Use AvatarGroupOverflow for custom overflow content like a popover trigger or "add member" button.
- Pass status dots, click handlers, or tooltips directly on each Avatar child.
- Wrap an Avatar child in HoverCard or Tooltip to show more on hover; the avatars still overlap. Set tooltip={false} on the wrapped Avatar so its built-in name tooltip does not compete.
- Make avatars interactive with href or onClick to link to profiles. Interactive avatars share a single Tab stop; arrow keys move between them, and the group announces a keyboard hint to assistive tech. This follows the WAI-ARIA APG roving tabindex technique for managing focus in a composite: https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex

**Không nên**

- Don't nest AvatarGroups; use a single group with all avatars.
- Don't set size on the child avatars. The group's size wins over each child's own size prop, including when the group leaves size at its default, so a child's size is silently ignored inside a group.

## Blockquote

A quotation block with a rule on its inline-start edge and secondary text color. Use to highlight quoted content, testimonials, or excerpts. The rule and padding are logical, so they move to the right edge in right-to-left locales.

**Nên**

- Use for quoted text, testimonials, or highlighted excerpts from external sources.
- Provide a cite prop when the source of the quote is known.
- Pass the source through cite rather than typing it into children, so it renders as a semantic <cite> element that assistive technology can distinguish from the quotation.

**Không nên**

- Use for callout boxes or informational notes; use Banner for those.
- Wrap the attribution in your own <footer>. A <footer> inside a <blockquote> becomes a contentinfo document landmark, and a page with several quotes then reports several page footers.

## Citation

Citations display inline references to external sources. Use them to attribute information within AI-generated responses, articles, or anywhere provenance and source links are needed.

**Nên**

- Use the label variant when the source title adds meaningful context for the reader.
- Use the number variant for compact inline references within body text, like footnotes.

**Không nên**

- Mix label and number variants in the same paragraph. Pick one style per context for visual consistency.

## Code

Code marks short inline references such as function names, variables, file paths, and command-line flags. Use CodeBlock for standalone or multi-line snippets.

**Nên**

- Use Code for short technical terms inside prose, such as a function name, prop, file path, or command-line flag.
- Set size to 'inherit' when inline code should match the surrounding text size and line height.

**Không nên**

- Use Code for multi-line or standalone snippets. Use CodeBlock instead so readers get appropriate block formatting and syntax support.
- Use Code as an interactive copy or navigation control. Pair it with the appropriate Button or Link when an action is required.

## CodeBlock

CodeBlock renders syntax-highlighted code with line numbers, a copy button, and optional collapsible sections. Use CodeBlock for multi-line snippets like source files, terminal commands, and configuration examples. Use Code for inline references to function names, variables, or CLI flags within body text.

**Nên**

- Set the language prop to match the code content so syntax highlighting is accurate. Use "plaintext" when the language is unknown.
- Add a title when the code represents a file. It gives readers context and appears in the header bar alongside the copy button.
- Use Code for short inline references like function names or CLI flags, and CodeBlock for standalone multi-line snippets.

**Không nên**

- Enable line numbers on short snippets (under 5 lines) where they add clutter without helping navigation.
- Nest a code block inside a scrollable container. Use the maxHeight prop instead, which handles overflow natively.

## EmptyState

EmptyState shows a placeholder when a content area has no data. Use it for empty lists, zero search results, first-time setups, or cleared inboxes. Always include a title and a next step so the user is not stuck.

**Nên**

- Include a clear title and a call-to-action button so users know how to proceed.
- Use an illustration or icon that reinforces the context of the empty state.
- Use the compact variant inside cards or sidebars where space is limited.

**Không nên**

- Leave an empty state without guidance; always explain what happened and what the user can do next.
- Use a generic message like "No data"; be specific about what is empty and why.
- Use an EmptyState for error messages that require immediate action; use a Banner instead.

## Icon

Icons are small visual symbols that represent actions, objects, or concepts. They improve scannability and reinforce meaning alongside text. Supports both direct SVG components and semantic icon names that adapt to the active theme.

**Nên**

- Use semantic icon names when available; they adapt to theme changes automatically.
- Override icons through the theme, not globally: defineTheme({icons: {close: <XMarkIcon />}}) scopes the swap to the active <Theme>, and extends shallow-merges it into derived themes. registerIcons() mutates a process-wide registry and warns in dev, so keep it for app bootstrap rather than making it a library's theming seam.
- To match artwork to the rendered size, make a theme or registered icon entry a pure, synchronous function of {size, variant}: defineTheme({icons: {info: ({size}) => <InfoIcon weight={size === 'sm' ? 'bold' : 'regular'} />}}). Icon passes the size it renders at; getIcon(), useIcon(), getIconRegistry() and theme.icons read the function at size md. A function that returns null draws nothing instead of falling back to the default icon. Do not use hooks, measure the DOM, or read browser or mutable state inside it.
- Pair icons with text labels for accessibility; icon-only elements need an accessible label.
- For a meaningful standalone icon (no adjacent text), give it an accessible name via the `label` prop: it sets role="img" + aria-label and unhides the icon.
- Use color tokens for icon colors, not hardcoded hex values.
- Be mindful of context; decorative icons in compact components can distract rather than help.

**Không nên**

- Use icons as the sole means of conveying meaning; always provide a text alternative.
- Resize icons with arbitrary pixel values; use the provided size props.
- Mix icon styles (e.g. outline and filled) within the same context.
- Render raw SVG elements; always wrap in Icon for consistent sizing and color.
- Pass a `name` prop; Icon uses `icon` (not `name`) to specify which icon to render.

## Kbd

Renders a keyboard shortcut as styled key badges. Use Kbd in tooltips, menus, and help text to show key combinations.

**Nên**

- Place shortcuts near the action they trigger: in a tooltip, menu item, or inline instruction.
- Use mod instead of ctrl or cmd; it automatically adapts to the user's platform.
- Let Kbd name the shortcut: screen readers hear the keys as words, such as "Command + K". Kbd ignores an aria-label you pass; to name it from visible text, use aria-labelledby.

**Không nên**

- Use Kbd as the only way to discover an action; shortcuts should supplement visible controls, not replace them.
- Expect Kbd to handle the key press. It only shows the keys; listen for the shortcut in your own code.

## Markdown

Renders a markdown string as Astryx-styled components. Use Markdown for user-generated content, AI responses, and documentation; it handles headings, lists, tables, code blocks, and citations with consistent styling.

**Nên**

- Set headingLevelStart to match the page hierarchy, e.g. start at 3 if the markdown sits inside an h2 section.
- Use contentWidth to keep prose at a readable line length in wide layouts.
- Emphasis and strong pair as CommonMark specifies, so *see **bold** more* puts the bold inside the emphasis. ***text*** renders as strong around emphasis, the order RichText draws, and is announced as both. Emphasis nested more than 100 levels deep stays as written text.
- Use plugins created by createMarkdownPlugin for reusable syntax, immutable AST transforms, and typed extension rendering. Keep the ordered list stable while its syntax configuration is unchanged.
- To render a plugin node outside Markdown, as another surface showing the same document does, read what the plugin declares with getMarkdownPluginCapabilities (syntax and transform, nothing else), and render each parsed extension node with MarkdownPluginNodeRenderer from the client-only @astryxdesign/core/Markdown/plugin-renderer subpath. It presents the node exactly as Markdown does, fallbacks and failure reports included, with no element of its own.
- Add markdownSoftBreaksPlugin when single line endings are meaningful. It matches remark-breaks for supported Markdown, including multiline link labels, while code and other opaque content stay unchanged.
- Add markdownSourceLinesPlugin when a feature maps the rendered document back to Markdown source lines (find, highlights, review comments). Every block Markdown renders, nested blocks included, then carries data-source-line and data-source-line-end (1-based, inclusive); components block renderers receive sourceLines to place on their own element, and plugin renderers read node.position lines. Inline elements, table rows, and cells carry none. Without the plugin no line work runs.
- Use createMarkdownTextTransform for prose matching; it preserves code, links, images, citations, math, and accepted extension syntax as protected contexts. Provide requiredSubstrings only when they conservatively cover every possible match.
- Use createMarkdownFenceTransform for declared code-fence languages with semantic data. createNode returns an owned block extension node; its standard plugin renderer and toText own presentation. A claimed fence renders through that plugin even when components.code is supplied; components.code renders every unclaimed fence and is the fallback when the plugin renderer declines, throws, or suspends, and without it the accessible, copyable CodeBlock is that fallback.
- Use createMarkdownSourceDecoration to attach non-visual metadata — search hits, review annotations — to the blocks a source range touches, and getMarkdownSourceDecorations to read it back in a later plugin. Decorations appear on the settled document rather than on partial streaming chunks, and never change rendering, copyable text, accessible names, ids, focus order, or navigation.
- Import parseMarkdownAst or parseInlineAst from @astryxdesign/core/Markdown/parser when server or React Server Component code needs to run plugins against the canonical readonly tree. The parser and plugin subpaths have no use-client boundary. The Markdown component remains client-owned, so function-bearing plugin entries must not be passed across an RSC serialization boundary.
- Use decodeMarkdownCharacterReferences (from @astryxdesign/core/Markdown/parser or @astryxdesign/core/Markdown) to show text the way Markdown renders its character references: &copy;, &#169;, and &#xA9; become ©, while unknown names and references without their semicolon stay as written. It decodes plain text and knows nothing of Markdown, so skip code and backslash-escaped references yourself. It uses the same table Markdown renders with.
- Use createMarkdownFrontmatter for typed document metadata. Its parse() method gives the host metadata directly; its plugin removes a complete leading block before rendering and withholds an unfinished block during streaming.
- Import createMarkdownRemarkTransform from '@astryxdesign/core/Markdown/remark' only to reuse an existing synchronous transform-only Remark plugin; it stays out of every other bundle. Prove each plugin with fixtures: anything outside the supported MDAST subset — async work, parser or compiler plugins, processor state, raw HTML, unsupported nodes, forged positions, or metadata Astryx cannot represent — keeps the last valid document and reports one diagnostic.
- Use inlinePlugins for prefixed identifiers, mentions, and other prose-only shorthand instead of preprocessing the markdown string.
- Provide components.math only for documents that use dollar-delimited math. The renderer owns typesetting and accessible output; Astryx passes the expression as text and never executes raw HTML.
- For direct parsing, use MathParseOptions and handle InlineNodeWithMath or BlockNodeWithMath. Incremental math parsing also uses createIncrementalState<true>() and IncrementalParseState<true>; default calls and ParseOptions annotations keep the legacy unions.
- Install createMarkdownHeadingLinks() through plugins when a document needs copyable h1–h6 permalinks. The returned entry carries its validated namespace and URL base across compatible Core package copies. Each built-in heading keeps its incoming fragment ID and gains an inline trailing # copy button: it is hidden at fine-pointer rest through useContainerReveal, reveals on heading-row hover or keyboard focus, and stays visible under the hook’s coarse/touch semantics. Unmodified tap, click, Enter, or Space copies the canonical URL without navigation, hash mutation, or scrolling; a check confirms success for 1.5 seconds. The no-plugin path stays unchanged, and nested headings use the same depth-first identity projection as Markdown-derived Outline.
- For multiple documents, create one heading-links plugin per document with headingIdPrefix and pass that same plugin to Markdown and useOutlineFromMarkdown. Use the same stable value for Markdown id when the root also needs a DOM id; permalinkBaseUrl may supply a safe caller-owned URL before the fragment.

**Không nên**

- Use Markdown for hand-authored layouts; use Text and Heading directly when you control the content.
- Do not pass plugins from a Server Component into Markdown: function-bearing plugin entries cannot cross the client boundary. Create them in client code. parseMarkdownAst can run plugins on the server, but it returns a parsed tree, and Markdown renders only a source string.
- Do not rely on Markdown to sanitize what a custom renderer, a plugin renderer, or components.math returns. Markdown passes them inert text and parsed nodes; each renderer owns its own output and its accessible semantics.

## Text

Text renders styled body text and headings from the theme. Use Text with a semantic type for body copy, labels, and captions, and Heading for section titles that output the correct h1–h6 element.

**Nên**

- Pick a semantic type (body, label, supporting, large, code) instead of manually setting size and weight; the theme handles the details.
- Set accessibilityLevel on Heading when the visual level differs from the document outline so screen readers announce the correct hierarchy.
- Use maxLines with a number to truncate long content; a tooltip appears automatically on hover so no text is lost.
- Enable hasTabularNumbers for columns of numeric data so digits align vertically across rows.

**Không nên**

- Override size and weight when a semantic type already matches; extra overrides fight the theme and break when themes change.
- Skip heading levels in the document outline; go h1 then h2 then h3, never h1 then h3.
- Use raw HTML tags like <p>, <h1>–<h6>, or <span> for text; Text and Heading apply the correct theme tokens automatically.
- Pass a `variant` prop; Text does not have a `variant` prop. Use `type` for semantic styling (body, label, large, supporting, code) or use Heading for headings.
- Use Text for headings; use Heading with a `level` prop (1–6) for section titles and headings.

## Thumbnail

Thumbnail displays a compact, square preview of an image attachment. It shows a shimmer effect while uploading, the image on success, and a placeholder icon when no source is set. Use it in chat composers, file upload lists, or anywhere you need a small image preview with optional remove and click actions.

**Nên**

- Always provide a label prop with the file name so the thumbnail and its remove button are accessible to screen readers and show a tooltip on hover.
- Use isLoading without a src to show a skeleton during initial upload, and isLoading with a src to show a spinner overlay once a preview URL is available.
- Pair onClick with a lightbox or detail view so users can inspect the full image; the thumbnail adds button semantics and a hover overlay automatically.

**Không nên**

- Don't use Thumbnail for non-image file types like PDFs or spreadsheets; use a file attachment component with an appropriate icon instead.
- Don't omit alt text when a src is provided; screen readers need a description of the image content, not just the file name from label.

## Timer

Displays a standardized elapsed duration for active work without scheduling a React render on every tick. Elapsed format updates by second below one hour and by minute after one hour; clock format remains second-precise.

**Nên**

- Use elapsed for compact duration text that may span seconds, minutes, or hours.
- Use clock for stopwatch-like surfaces where seconds remain meaningful after an hour.
- Pass startTime when the operation began before Timer mounted so the display reflects the complete wait.

**Không nên**

- Do not use Timer for dates, time zones, or relative calendar language; use Timestamp instead.
- Do not add aria-live unless hearing an announcement every tick is appropriate for the specific task.

## Timestamp

Timestamp formats a date or time value into human-readable text. Use it to show when something was created, updated, or is scheduled; picking relative for recency, absolute for precision, or auto to let the component decide.

**Nên**

- Use the auto format in feeds and lists so recent items show "2 hours ago" and older items show the full date automatically.
- Keep formatting consistent within the same list or table; mixing relative and absolute timestamps in the same column confuses scanning.
- Enable isTimezoneShown when the audience spans multiple time zones, like a global team calendar or audit log.
- Use tooltipEntries when readers must compare zones, such as an incident log where the reader's time and the event's origin zone both matter.
- Pass timezoneID when an absolute time must read the same for every viewer and on the server, like an incident log timestamp or anything server-rendered; without it the server markup depends on the server zone.
- Label every entry once a tooltip shows more than one zone; a bare abbreviation is not always recognizable (Tokyo renders as "GMT+9", not "JST").
- Use isLive for active dashboards or real-time feeds so the relative time stays accurate without a page refresh.
- Reach for tooltipEntries when readers need to grab an exact value: an incident log or deploy record where someone pastes the UTC time or Unix seconds elsewhere; configuring entries turns the hover into copy-to-clipboard rows.

**Không nên**

- Don't display raw Unix timestamps or ISO strings to users; always pass them through Timestamp to get a human-readable format.
- Avoid system_date or system_time formats in user-facing UI; they are meant for developer tools, logs, and machine-readable contexts.
- Don't disable the hover card on relative timestamps; users expect to hover for the full date when they see "3 hours ago".
- Don't stack many zones into one card; it is capped at 300px wide and long labelled lines wrap. Two or three entries read well.
- Don't pass a fixed-offset abbreviation like "EST" as timezoneID; it is a valid identifier but never observes daylight saving, so it reads an hour wrong for half the year. Use the region id, "America/New_York".

## Token

Token is a small, inline element for representing discrete pieces of associated data, like tags, categories, or selections. Use it to label content, show active filters, or represent removable items like selected recipients in a compose field.

**Nên**

- Use color to distinguish categories (for example, green for "Active", red for "Blocked", blue for "In Review") so users can scan status at a glance.
- Provide an onRemove callback when tokens represent user selections that can be undone, like filters or multi-select values.
- Add a leading icon when it helps identify the token type faster, like a person icon for user tokens or a tag icon for labels.
- Keep labels short: one to three words. Tokens truncate with ellipsis when the text overflows.
- Labels keep their character order under right-to-left, so `@alice`, `C++` and `example.com` read as written; a right-to-left label still reads right to left.

**Không nên**

- Don't use tokens for primary actions or navigation; use Button or Link instead. Tokens are for displaying metadata, not triggering workflows.
- Don't hide the label unless the icon alone is universally understood. A color dot without text is ambiguous.
- Don't mix too many colors in one token group. Stick to two or three meaningful colors so the palette stays scannable.
