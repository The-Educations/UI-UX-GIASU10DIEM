# Action

Trích từ tài liệu Astryx (tiếng Anh). Tên prop là của Astryx; khi viết bằng shadcn thì giữ ý của luật. Nếu trái với `../design-rules.md` thì theo design-rules.

## Button

Button triggers an action when clicked. Use it for form submissions, confirmations, navigation, or any interaction that needs a clear call to action.

**Nên**

- Reserve primary for the single most important action in the view. Use secondary or ghost for everything else based on emphasis.
- Write labels that describe the action ("Save changes", "Delete account", "Send invite"), not vague labels like "OK" or "Click here".
- Show a loading state for actions that take time, like saving or submitting, so the user knows it is working.
- Always provide a label for icon-only buttons so screen readers can announce what the button does. Add a tooltip for sighted users.
- For a dedicated icon-only button, use IconButton from '@astryxdesign/core/IconButton'. It is a separate component, not exported from '@astryxdesign/core/Button'.

**Không nên**

- Place more than one primary button in the same view; this dilutes the visual hierarchy.
- Use the destructive variant without a confirmation step for irreversible actions like deleting data.
- Use a button for navigation. If it only takes the user to another page, use a link instead. Buttons are for actions like saving, deleting, or submitting.
- Restyle Button's `::before` (through `xstyle` or a `className` rule) and expect it to hold through a touch press: under a coarse primary pointer, while a press is on or fading, Button paints the press on that pseudo-element (`z-index: -1`, its opacity animated), so your styles merge into the press layer for that moment. At rest Button adds nothing there. Style a child element instead.

## ButtonGroup

ButtonGroup joins related actions into a single connected control. Use it when multiple buttons represent related choices or operations that belong together visually, like copy/cut/paste, or undo/redo.

**Nên**

- Group buttons that perform related actions on the same object, like copy, cut, paste on selected text.
- Use the same variant for all buttons in a group so they look like a single connected unit.
- Keep groups small (2–4 buttons). For more actions, use a Toolbar or DropdownMenu instead.
- Name the group for what its buttons act on. The label is the group's accessible name and a screen reader reads it before each member.
- Keep the group a single Tab stop. Arrow keys move between members along the orientation, and Home/End jump to the ends. This is the WAI-ARIA APG roving tabindex technique: https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex

**Không nên**

- Don't mix wildly different actions. A Save button next to a Delete button in the same group is confusing.
- Don't use ButtonGroup for navigation. Use SegmentedControl or TabList for switching between views.
- Don't nest ButtonGroups. If you need multiple groups, place them side by side with a gap.
- Don't disable the group to show that an action is in flight. Leave the group enabled and show progress on the button that started the work.

## ContextMenu

A right-click context menu that appears at the cursor position. Use to provide contextual actions for specific elements or regions without cluttering the UI with visible buttons.

**Nên**

- Keep menu items concise and action-oriented; users expect quick access to contextual actions.
- Use sections and dividers to group related actions when the menu has many items.
- Use `presentation="adaptive"` when right-click should remain cursor-positioned on desktop while long-press opens a reachable BottomSheet on compact touch devices.
- Ensure all context menu actions are also accessible via other UI elements for keyboard-only users.
- Keep a visible MoreMenu or equivalent trigger for important mobile actions; long-press must not be the only route.

**Không nên**

- Use a ContextMenu as the only way to access important actions; not all users know to right-click.
- Place more than 10–12 items in a single menu without grouping them into sections.

## DropdownMenu

A dropdown menu that displays a list of actionable items in a popup triggered by a button. Use to present action options as a next step in a process, or to offer contextual actions without cluttering the interface. Like the menus of macOS and iOS, the row under the pointer when it is released is the row that acts, the highlight follows a held mouse or finger, a mouse opens it on press and can drag straight into it, and a finger held on the trigger opens it with the finger down.

**Nên**

- Keep menu items concise and action-oriented so users can scan options quickly.
- Let the menu return focus on close: to its trigger, or to a stand-in when the trigger is gone (a BottomSheet presentation keeps the sheet return). There is no option to turn this off; to send focus elsewhere, focus that element in onOpenChange.
- Use sections and dividers to group related actions when the menu has many items.
- For a short, flat action set, use presentation="bottom-sheet" when product policy calls for a modal touch surface.
- Use presentation="adaptive" when the same short action set should remain anchored on pointer layouts and become a BottomSheet on compact coarse-pointer layouts.
- For a hierarchy that cannot fit as adjacent flyouts on a compact touch surface, a product may explicitly use a drill-in interaction with a Back action.
- Choose presentation explicitly in product code. A compact, coarse-pointer, hover-free media query is one useful policy, but DropdownMenu does not impose a universal device breakpoint.
- When the content is no longer a short list of immediate actions, reevaluate the interaction and choose a component that matches the actual task; content traits alone do not determine the component.

**Không nên**

- Use a DropdownMenu for navigation; use a navigation component instead.
- Place more than 10–12 items in a single menu without grouping them into sections.

## IconButton

A button that shows only an icon with no visible text. Use IconButton in toolbars, table rows, and compact UI where space is tight and the icon is universally understood.

**Nên**

- Make the aria-label specific: a trash icon labeled "Delete conversation" is clearer than just "Delete" for screen readers.
- Add a tooltip: even a gear icon can mean Settings, Preferences, or Configure.
- Use ghost in toolbars and dense areas to reduce visual clutter.

**Không nên**

- Use IconButton if the action isn't obvious from the icon alone; use Button with text.
- Skip the tooltip; label only reaches screen readers, sighted users need the hover hint.

## Link

A styled anchor for inline and standalone text navigation. Supports external links, underline variants, tooltips, and custom link components for router integration. Use it for navigating between pages or to external URLs.

**Nên**

- Write descriptive, concise link text that clearly communicates the destination.
- Set `isStandalone` when the link appears outside of inline text, so it receives proper base font sizing.
- Put a Link inside a <Text maxLines> to truncate it with the surrounding text; inside a clamped Text the link flows in the text's lines.
- Only set `label` when the link content is not descriptive text (e.g. an icon-only link). For text links, the visible text is already the accessible name; adding `label` overrides it for screen readers, which is harmful.

**Không nên**

- Use Link for actions that do not navigate; use a Button instead.
- Use generic text like "click here" or "read more"; describe the destination.
- Set `label` on text links; `aria-label` prevents assistive technology from reading the actual link content.
- Give a Link inside a clamped Text its own `display` or `maxLines`, or render it as a button (`onClick` with no `href`), and expect the outer clamp to cut it; that Link keeps its own box.
- Put a Link with block-level content, such as an HStack with an icon, inside a clamped Text; block content breaks the clamp. Clamp a text-only Link, or place the composed Link outside the clamp.

## MoreMenu

MoreMenu is a three-dot button that opens a list of actions. Use it for secondary actions that don't need to be always visible, like in table rows, card headers, or toolbars. Host `data-*` attributes reach the trigger button; its accessible name, `id`, and menu disclosure attributes stay component-owned.

**Nên**

- Use for overflow or secondary actions; keep primary actions visible outside the menu.
- Use dividers or sections to group related actions when the menu has many items.
- Use `presentation="adaptive"` when the visible overflow trigger should open a thumb-reachable BottomSheet on compact touch devices.

**Không nên**

- Hide primary actions inside a MoreMenu; they should be directly visible.

## SegmentedControl

A segmented button group that allows users to make a single selection from a small set of mutually exclusive options. Use SegmentedControl when all options should be visible at once and the selection controls a value or mode, not page navigation. Under a finger, on a touch device (a coarse primary pointer), the selection slides to the new segment, whether a tap, an arrow key or a new value moved it; with Reduce Motion nothing travels: the old selection fades out as the new one fades in. There, pressing the selected segment lifts it, and dragging it carries the selection along with the selected label’s colour following it, and the segment under the finger is chosen when it lets go; a tap selects through the browser’s click; a pressed unselected segment shows the shared pressed overlay, and nothing dims. A drag that drifts off the control still chooses by its position along it. Going back to the selected segment, or Escape, changes nothing. With a mouse or a pen every change, a click included, slides on the theme’s duration and easing, and dragging the selected segment carries it as a finger does.

**Nên**

- Use for switching between 2–5 mutually exclusive views or modes where all options should be visible.
- Provide a descriptive label for the control to ensure the group is accessible to screen readers.

**Không nên**

- Use for page-level navigation; use TabList instead. TabList is a navigation component, while SegmentedControl is an input that always has exactly one selected option.
- Use for simple on/off states; use ToggleButton instead. ToggleButton can be toggled on or off independently, while SegmentedControl enforces a single selection from a group.
- Wrap a disabled SegmentedControl in Tooltip to explain why it is disabled; the reason is then not attached to the control or its segments. Use the disabledMessage prop instead.

## ToggleButton

ToggleButton switches between selected and unselected states to represent a persistent on/off choice. Use it standalone for binary actions like bold, mute, or favorite, or inside a ToggleButtonGroup for single-select or multi-select toolbar controls.

**Nên**

- Use a filled or colored icon for the pressed state so users can see the current state at a glance: an outline star vs a solid star, for example.
- Keep the label identical between pressed and unpressed states. Let the visual treatment (icon, weight, background) communicate the change.
- Wrap related toggles in a ToggleButtonGroup with an accessible label so screen readers announce them as a connected set.

**Không nên**

- Don't use a ToggleButton for one-time actions like "Submit" or "Delete"; those are regular Buttons, not toggles.
- Don't mix ToggleButtons with regular Buttons inside the same group; use only ToggleButtons in a ToggleButtonGroup.
- Don't use a ToggleButton for on/off settings that persist across sessions; use a Switch instead, which better communicates "setting" semantics.

## Toolbar

Toolbar is a horizontal bar with left, center, and right areas. Use it for contextual actions within a content area (above a table, inside a card, or in a panel), not as a page-level header. Set the size once on the toolbar and all buttons, inputs, and tabs inside it match automatically.

**Nên**

- Put secondary actions like "Back" on the left, and primary actions like "Save" on the right.
- Make temporary toolbars like bulk selection visually distinct so users can tell they're contextual, for example with a background color or border.
- Visually separate the toolbar from the content below it, with a divider, a background variant, or both.
- Use Toolbar as a card header when the header has interactive actions like filter or add; it gives you slot layout, keyboard navigation, and size cascading. If the header is just a title with no actions, a LayoutHeader or Section is enough.

**Không nên**

- Put too many actions in one toolbar; move less common items into a MoreMenu.
- Set size on individual child buttons; set it once on the toolbar and it cascades automatically.
- Use Toolbar for app-wide navigation like main menu links or sign out; use TopNav or LayoutHeader for that.
