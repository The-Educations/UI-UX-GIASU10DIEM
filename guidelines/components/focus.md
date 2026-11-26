# focus

Trích từ tài liệu Astryx (tiếng Anh). Tên prop là của Astryx; khi viết bằng shadcn thì giữ ý của luật. Nếu trái với `../design-rules.md` thì theo design-rules.

## useCombobox

Tracks the active option of a single-select combobox and handles its keys, while DOM focus stays on the control. It powers Selector and CommandPalette; use it to build a combobox those components do not cover, including one over a single-line text field you render yourself, such as a search field whose results replace a page section, or an “add people” field in a dialog. It renders nothing: you render the field, the listbox and the options, and spread `getFieldProps`, `getListboxProps` and `getOptionProps` onto them, or wire `role`, `aria-expanded`, `aria-controls` and `aria-activedescendant` yourself from `onKeyDown` and `getItemId` for a control such as a button.

**Nên**

- Render each option with `id={getItemId(index)}` and set the control's `aria-activedescendant` only while `isOpen` and `highlightedIndex` points at a rendered option, as CommandPalette does.
- For type-to-select without a search field, run useTypeahead's handler first and fall through to this `onKeyDown` when it returns false, as Selector does.
- For a field you render, spread the prop getters, and set the active option yourself when a new query changes the options: the first option so Enter picks it, or -1 so Enter stays the field’s.
- Announce the number of results through useAnnounce when the options change for a new query (AST-075 DEC-2). When nothing matches, announce the words the field shows for it.

**Không nên**

- Render controls that are not options, such as a create button or an empty message, inside the listbox; render them beside it.
- Move DOM focus onto the options; the active option is announced through `aria-activedescendant` while focus stays on the control.

## useFocusTrap

Traps focus within a container element following the WAI-ARIA dialog focus trap pattern. Listens to focus events on the document and redirects focus back into the container if a Tab from inside it moves focus out. Handles both Tab and Shift+Tab wrapping. A Tab pressed while focus is outside the container is left to the page, so an open non-modal surface never takes over the focus order of the page. When the trap deactivates or unmounts, focus is restored to the element that was focused before activation, unless focus was already moved elsewhere or never entered the trap (so popups that keep focus on their trigger, like comboboxes, are unaffected). Mouse clicks outside the container are not intercepted; use a light-dismiss handler for that.

**Nên**

- Call focusFirst() when opening a dialog/modal to move focus into the trapped region.
- Provide an onEscape callback to close the dialog when Escape is pressed.
- Rely on the built-in focus restoration on close; only add your own onHide focus handling when you need to send focus somewhere other than the previously-focused element.

**Không nên**

- Use on non-modal content like tooltips or dropdowns; those need light-dismiss, not focus trapping.

## useGridFocus

Manages keyboard navigation within a 2D grid following the WAI-ARIA grid pattern. Supports arrow keys for cell-to-cell navigation, Home/End for row boundaries, Ctrl+Home/Ctrl+End for grid boundaries, and Page Up/Down for custom callbacks (e.g., month navigation in calendars). Boundary navigation callbacks allow cross-grid navigation.

**Nên**

- Use for calendar date grids: wire onPageUp/onPageDown to month navigation and onNavigateBefore/onNavigateAfter for cross-month arrow key navigation.
- Attach both gridRef and handleKeyDown to the grid container element.
- For roving-tabindex grids (e.g. Calendar), set hasRovingTabIndex: true and attach handleFocus to the container onFocus; seed one focus target with tabindex=0 and the hook repairs and moves it.

**Không nên**

- Use for simple linear lists; prefer useListFocus for 1D navigation.

## useIndicatorFocusRing

Draws the standard focus ring on the indicator of a control whose real input is visually hidden; a checkbox or radio focuses an opacity-0 input, so the ring has to appear on the picture beside it. The ring is painted imperatively on the indicator's own element, which is the only element whose border-radius can shape it, and only on :focus-visible, so pointer clicks stay quiet. Owning it here means a theme-supplied indicator cannot ship a control with no visible focus (WCAG 2.4.7) by ignoring a prop.

**Nên**

- Wrap only the indicator in the ref'd element; a wrapper holding label text would ring the whole row.
- Spread focusProps on the element that contains the hidden input, not on the input itself.

**Không nên**

- Ask a themeable indicator to draw its own focus ring; a replacement that ignores the prop leaves the control with no visible focus.

## useKeyboardHint

Shows an ephemeral "← → to navigate" hint anchored to the focused item the first time a roving-tabindex composite (Toolbar, TabList, SegmentedControl, etc.) receives keyboard focus. It teaches sighted keyboard users that arrow keys move within the group. The hint renders arrow keys with Kbd in the top layer (popover="manual") and is CSS-anchor-positioned to the focused element, so overflow containers never clip it. It stays until the first arrow press, Escape, or blur, and does not re-show for that instance. Escape closes only the hint, through the shared layer dismissal stack, and keeps focus where it is. Toolbar, TabList, and SegmentedControl wire this in automatically; reach for the hook directly only when building a custom roving-tabindex widget.

**Nên**

- Compose the returned onFocus/onKeyDown with your existing focus handlers rather than replacing them: call onKeyDown first (it only dismisses, never prevents), then your navigation handler.
- Render hintElement as the last child of the composite container; it is position:fixed in the top layer and aria-hidden, so it never affects layout or the accessibility tree.
- Match orientation to the arrow keys your widget actually responds to so the hint shows the correct icons.

**Không nên**

- Use for single controls or widgets without roving-tabindex navigation; the hint only makes sense where arrows move focus within a group.

## useListFocus

Manages keyboard navigation within a linear list following WAI-ARIA menu/listbox/toolbar patterns. Supports arrow key navigation (vertical, horizontal, or both), Home/End for boundaries, optional wrap-around, RTL, and Escape to close. Opt into hasRovingTabIndex for composite widgets (toolbars, segmented controls, tab strips) that own a single tab stop. Suitable for dropdown menus, toolbars, and any 1D focusable list.

**Nên**

- Set orientation to 'horizontal' for toolbars and tab bars, 'vertical' for dropdown menus.
- Provide an onEscape callback for menus/dropdowns to return focus to the trigger.
- Enable hasRovingTabIndex (and hasCaretGuard when the widget can contain text inputs) for toolbar-style composites that should be a single tab stop.

**Không nên**

- Use for 2D grid navigation; prefer useGridFocus for grids and calendars.

## useMultiCombobox

Tracks the active option of a multi-select combobox and handles its keys, while DOM focus stays on the control. It powers MultiSelector; unlike useCombobox, toggling an option keeps the list open, and rows can carry an action cell. It renders nothing and sets no attributes: the caller renders the control and the list, and wires the ARIA attributes from what it returns.

**Nên**

- Render each option with `id={getItemId(index)}` and pass `activeDescendantId` as the control's `aria-activedescendant`.
- Use `isGrid` only when rows carry a control next to the option; give each action cell `id={getActionCellId(index)}`.
- Announce the number of results through useAnnounce when the options change for a new query.

**Không nên**

- Close the list after each toggle; a multi-select stays open so several options can be picked in a row.

## useTreeFocus

Manages roving-tabindex focus and the WAI-ARIA tree keyboard model. ArrowUp/ArrowDown/Home/End roam linearly over the visible treeitems (skipping disabled ones), while ArrowRight/ArrowLeft carry tree semantics (expand/collapse, move to first-child/parent). Enter/Space activate, and printable characters trigger typeahead.

**Nên**

- Use for hierarchical tree widgets: wire onToggleExpand to your expansion state and onActiveChange to a single roving tab stop.
- Attach both treeRef and handleKeyDown to the role="tree" container element.

**Không nên**

- Use for linear lists (prefer useListFocus) or 2D grids (prefer useGridFocus); those traversals differ from a tree.

## useTypeahead

Adds APG type-to-focus search to a collection: printable keystrokes are buffered (resetting after a pause), and the first item whose label starts with the buffer (ignoring case, accents, the stroked letters đ ł ø ħ ŧ ƀ and Turkish ı/İ, the same in every locale; a typed accent prefers the exact match) is reported through onMatch. Pressing the same letter repeatedly cycles through the matches rather than filtering deeper. It moves nothing itself; pair it with the collection's own focus management, most often useListFocus or useGridFocus.

**Nên**

- Wire onMatch to the focus manager you already have (useListFocus.focusItem) instead of moving focus yourself.
- Let it see the key event first and fall through to arrow-key navigation only when it returns false.
- Pass getCurrentIndex so repeated presses of one letter walk through matches instead of sticking on the first.

**Không nên**

- Use it on a text input; the field already receives the characters, and typeahead would fight the value.
