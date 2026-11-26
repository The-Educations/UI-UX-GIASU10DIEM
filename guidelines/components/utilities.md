# utilities

Trích từ tài liệu Astryx (tiếng Anh). Tên prop là của Astryx; khi viết bằng shadcn thì giữ ý của luật. Nếu trái với `../design-rules.md` thì theo design-rules.

## useCalendarConstraints

Provides date constraint validation for calendar views and custom range pickers. It combines boundary dates, span limits measured from an in-progress range start, and custom rules (such as weekly closures or blackout dates) into an isDateDisabled predicate. Calendar uses it internally to disable day buttons; use it directly when building bespoke scheduling interfaces or range pickers.

**Nên**

- Pass rangeAnchor only after the user selects an initial range start, so all eligible start dates remain selectable before the first click.
- Use dateConstraints for recurring or dynamic rules, such as disabling closed weekdays, past holidays, or sold-out dates.

**Không nên**

- Perform slow network calls or heavy calculations inside dateConstraints predicates, because isDateDisabled is evaluated synchronously for each day rendered in the grid.

## useCalendarDays

Builds the day grid for one month: every date to show, including the previous and next months' days that fill the first and last weeks, grouped into weeks, plus localized weekday header names that start on weekStartsOn. It is the layout Calendar uses, for a custom month view such as a compact availability grid or a mini calendar. It returns data only: rendering, selection, keyboard navigation and the grid's accessibility semantics are the caller's.

**Nên**

- Render dayNames as the header row so the header follows weekStartsOn and the locale together with the grid.
- Style days with isOutside differently, for example dimmed, so the filler days read as part of the next or previous month.

**Không nên**

- Use it to build a date picker that people choose from; use Calendar, which adds selection, keyboard navigation and grid semantics.

## useCalendarNavigation

Manages visible month state and pagination for calendar components. It provides previous/next month stepping, localized month-year header strings, and pending focus tracking so keyboard arrow navigation seamlessly moves focus across month boundaries into the adjacent month. Use it directly when composing custom calendar headers, pager controls, or dual-month availability pickers.

**Nên**

- Wire navigateMonth(-1) and navigateMonth(1) to Previous/Next icon buttons to paginate months.
- Pass focusedDate and offset (e.g. 1 for horizontal arrow keys, 7 for vertical arrow keys) to navigateMonth so pendingFocus directs keyboard focus to the correct day cell after the month transition.

**Không nên**

- Hardcode month-year header strings manually; use monthYearLabel which automatically formats according to the active locale and calendar system.

## useCollator

Returns the sanctioned locale-aware comparator for custom sorting. The collator is recreated when the provider locale or an option changes.

**Nên**

- Reuse collator.compare in custom Table comparators and other user-visible string ordering.

**Không nên**

- Construct Intl.Collator directly or call localeCompare; those bypass the provider-backed locale contract.

## useDirection

Reads the current text direction during render. Reach for this hook as a last resort when render-time direction is strictly required (such as canvas drawing that cannot use CSS logical properties). In order of preference, always favor: CSS logical properties (margin-inline, inset-inline); shared mirror styles for directional icons (CSS scaleX); and DOM reads for keyboard or gesture logic.

**Nên**

- Prefer CSS logical properties and directional CSS mirroring before using useDirection.
- Use useDirection when drawing on an HTML canvas or calculating non-CSS layout coordinates where the start edge depends on text direction.

**Không nên**

- Use useDirection to conditionally swap margins, paddings, or inline alignments that can be solved with CSS logical properties.

## useIcon

Resolves a semantic icon name to a React node through the nearest Theme, so a custom component draws the same success, warning or error icon that Astryx components draw and follows a theme that overrides it. Resolution reads the nearest Theme's icons (outside any Theme, the registered theme the document root names), then registerIcons() overrides, then the built-in default. The node is returned as is, with no size or color wrapper: the built-in icons are 1em squares in currentColor, so they follow the surrounding text. A function entry is read at {size: 'md'}. Render <Icon icon={name} /> instead when the icon needs another size, a color or a label.

**Nên**

- Use it in a custom component that places a semantic icon itself, so a Theme that overrides the icon changes the component too.
- Render <Icon icon={name} /> when the icon needs a size other than md, a color, or an accessible label.

**Không nên**

- Import a specific icon library glyph for a semantic purpose that a theme should control, such as a success or error state.

## useLinkComponent

Resolves which component renders a link, so a custom component's links follow the app's router the same way Astryx's own links do. The order is the as argument, then the nearest LinkProvider's component, then a native anchor. Render the returned component with href (and to, for a router that reads it). Before rendering it checks both destinations under the Link href rule: a rejected destination renders an anchor with no destination, and a custom router is never invoked with it. A custom component receives to={href} unless to is passed explicitly.

**Nên**

- Use it for links inside a custom component, so a LinkProvider wired to the router reaches them without a prop on every link.
- Pass as='a' for a destination the router cannot handle, such as a file download or a page outside the app.

**Không nên**

- Import the router's link directly in a shared component; the component then ignores LinkProvider and the destination check.

## useLocale

Reads the authoritative Astryx locale. Use it to thread the provider locale into pure formatting helpers and sibling-package APIs; do not derive a second locale from navigator.language or a hardcoded literal.

**Nên**

- Pass the returned locale to pure Astryx helpers or package APIs that require an explicit locale.

**Không nên**

- Use navigator.language or a hardcoded display locale as a fallback; InternationalizationProvider is the locale source.

## usePowerSearchConfig

Memoizes a PowerSearch configuration built from typed field definitions and returns it along with an applyFilters function for client-side filtering. Automatically maps field types (string, number, boolean, date, enum, etc.) to their canonical operators and provides an efficient predicate evaluator to filter datasets.

**Nên**

- Declare field definitions as const outside the component or memoize them so usePowerSearchConfig only recalculates when needed.
- Pass the returned config to PowerSearch and use applyFilters to compute the filtered data rows for a Table or List.

**Không nên**

- Recreate field definitions inline on every render without as const or memoization.

## useTranslator

Returns a translator function that resolves keys against the current locale, provider overrides, and the shipped English fallback catalog. Call inside a component; the returned function can be used anywhere within that component's scope.
