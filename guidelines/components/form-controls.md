# Form Controls

Trích từ tài liệu Astryx (tiếng Anh). Tên prop là của Astryx; khi viết bằng shadcn thì giữ ý của luật. Nếu trái với `../design-rules.md` thì theo design-rules.

## Calendar

Calendar lets the user pick a date or date range from a month grid. Use it in booking flows, scheduling UIs, date filters, or anywhere the user needs to see surrounding dates for context.

**Nên**

- Set min and max dates to limit selection to a valid window, like only future dates for a booking or the current quarter for a report.
- Use range mode when the user needs to pick a start and end date, like a trip or a time-off request.
- Use dateConstraints to disable specific dates like weekends or holidays, and explain why they are unavailable.
- Show two months side by side when the user frequently selects dates that span a month boundary.
- For a custom month view, use useCalendarNavigation and useCalendarDays from @astryxdesign/core/Calendar. To show another calendar system, pass the same calendar to both and feed visibleCalendarMonths into useCalendarDays. The hooks default to gregory and never read the InternationalizationProvider calendar.

**Không nên**

- Use a calendar for dates far in the past or future like a birth date. A text input is faster for open-ended entry.
- Disable large blocks of dates without context. The user should understand why dates are unavailable.

## CheckboxInput

CheckboxInput toggles a single on/off value. Use it for settings like "Enable notifications", terms acceptance, or opt-in choices. For multiple checkboxes in a group, use CheckboxList instead.

**Nên**

- Always provide a visible label so the user knows what they are toggling. Use isLabelHidden only when surrounding context makes it obvious.
- Add a description for choices that need extra context, like explaining what "Share usage data" actually shares.
- Use the indeterminate state for "select all" checkboxes when only some items in a group are selected.

**Không nên**

- Use a checkbox for mutually exclusive choices; use RadioList when only one option can be selected.
- Use a checkbox for actions that take effect immediately; use a toggle switch or button instead.
- Wrap a disabled checkbox in Tooltip to explain why it is disabled; disabled controls swallow the hover events the wrapper needs. Use the disabledMessage prop instead.

## CheckboxList

CheckboxList shows a small group of checkboxes so users can turn several options on or off at once. Place it in settings pages, filter panels, or forms where every choice should be visible without scrolling. For a single standalone checkbox (like "I agree to the terms"), use CheckboxInput instead. If only one option can be picked, use RadioList. If the list is long enough to need searching or scrolling, use MultiSelector instead.

**Nên**

- Keep the list short: three to seven options is the sweet spot. Beyond that, switch to MultiSelector which adds search and scrolling.
- Turn on dividers (hasDividers) when items have helper text underneath; without them the labels and descriptions blur together.
- Pass an option description that is longer than one line as a node: description={<Text type="supporting">…</Text>}. A string description shows on one line, and the row cuts the remaining text with an ellipsis.
- Write a group label that says what the choices represent: "Export formats" tells users more than "Options".

**Không nên**

- Show a CheckboxList when the user can only pick one thing; that is what RadioList is for.
- Put buttons or links inside the trailing slot (endContent); the whole row is already tappable, so a nested button creates two competing click targets.
- Wrap a disabled CheckboxList in Tooltip to explain why it is disabled; disabled controls swallow the hover events the wrapper needs. Use the disabledMessage prop instead.

## ComplexSelector

Use ComplexSelector when a selection needs richer custom content than a Selector option row. It is intentionally one component: ComplexSelector owns the field, trigger, popover, focus restore, and changeAction flow, while the content render prop owns the selector-specific accessible structure.

**Nên**

- Use variant="secondary" beside secondary buttons, or variant="ghost" beside ghost buttons; add a startIcon when it helps identify the trigger. Use alignment="end" when a wide surface should align its end edge to the trigger.
- For staged editors, keep draft state in the composed content and call the provided onChange helper only from Apply. Cancel or dismiss without committing.
- Compose the dialog content from the appropriate accessible structure for the job: RadioList for a simple choice, Calendar/date inputs for date picking, TreeList or a searchable list for hierarchy, or a custom grid when two-dimensional arrow navigation is useful.
- Use the provided onChange helper from children; it already calls both onChange and changeAction and updates optimistic busy state.
- Call close() from custom content when a selection should dismiss the popup. Keep it open for multi-step content or freeform entry flows.
- Use Astryx focus hooks for custom content: useGridFocus for two-dimensional grids, useTreeFocus through TreeList for hierarchies, and useListFocus for custom linear collections.
- Evaluate custom content against WCAG 2.2: keyboard operation, focus visible/not obscured, names and roles, labels/instructions, target size, and contrast/non-text contrast are especially relevant for selector popovers.

**Không nên**

- Do not rebuild trigger ARIA, popover focus management, or changeAction handling in product code.
- Do not use ComplexSelector for a plain single-column text list; use Selector instead.
- Wrap a disabled ComplexSelector in Tooltip to explain why it is disabled; the text would not describe the trigger. Use the disabledMessage prop instead.

## DateInput

DateInput lets the user type or pick a date from a calendar popover. Use it for scheduling, deadlines, booking dates, or any form field that needs a specific calendar date.

**Nên**

- Base props such as ref, id, data-*, aria-*, and DOM event handlers go to the date input, the element that is focused and announced. A DOM handler runs after DateInput's own handler for the same event and still receives events it handled (including ones it called preventDefault on), so it cannot cancel built-in behavior.
- Provide clear labels and descriptions so users understand what date is expected.
- Use min, max, and dateConstraints to restrict selectable dates to valid ranges.
- Set min and max on a Buddhist or Minguo calendar field, so a Gregorian year typed by mistake shows an error instead of a date centuries away.
- Use hasClear when the date is optional so the user can reset it.
- Show a loading state with changeAction when the date triggers a server-side save.
- On a fine pointer the field follows the WAI-ARIA combobox pattern with a dialog popup, as in the APG date picker combobox: ArrowDown or Alt+ArrowDown opens the calendar, and Escape closes it and returns focus to the field.
- Use DateInput inside InputGroup when adding a short static prefix or suffix, such as a due-date hint.

**Không nên**

- Use a DateInput for free-form text that does not represent a calendar date.
- Hide the label without surrounding context that makes the field purpose obvious.
- Rely on the calendar alone; the text input lets users type dates directly, which is faster for known dates.
- Wrap a disabled DateInput in Tooltip to explain why it is disabled. Use the disabledMessage prop instead, which ties the reason to the field.

## DateRangeInput

DateRangeInput lets users select a start and end date from a dual-month calendar popover. Use it for filtering data by time period, report generation, analytics dashboards, and booking flows.

**Nên**

- Base props such as ref, id, data-*, aria-*, and DOM event handlers go to the range trigger, the element that is focused and announced. A DOM handler runs after DateRangeInput's own handler for the same event and still receives events it handled (including ones it called preventDefault on), so it cannot cancel built-in behavior.
- Use presets for common ranges like "Last 7 days" to speed up selection.
- Use min/max to constrain selectable dates to valid ranges.
- Keep hasClear enabled (default) so users can reset the filter.
- Provide clear labels and descriptions so users understand what the range controls.

**Không nên**

- Use DateRangeInput when only a single date is needed; use DateInput instead.
- Hide the label without surrounding context that makes the purpose obvious.
- Wrap a disabled DateRangeInput in Tooltip to explain why it is disabled. Use the disabledMessage prop instead, which ties the reason to the field.

## DateTimeInput

DateTimeInput combines date and time selection in one field. With presentation="adaptive-native" (the default), mouse/trackpad devices use Astryx typed fields and popovers, while coarse-pointer devices use browser/OS date and time controls in the same two-segment field. presentation="native" uses both native controls on every pointer; presentation="adaptive-bottom-sheet" keeps Astryx's own surfaces — pointer fields on fine pointers and the coordinated Date/Time bottom sheet on coarse pointers; "popover" and "bottom-sheet" force one Astryx surface on every pointer. The closed segments stay side by side when at least 400px is available and wrap into full-width rows below 400px, independent of viewport width. Use it for scheduling, event creation, deadline setting, or any form field that needs a specific datetime.

**Nên**

- Base props such as ref, id, data-*, aria-*, and DOM event handlers go to the date input, the element that is focused and announced. A DOM handler runs after DateTimeInput's own handler for the same event and still receives events it handled (including ones it called preventDefault on), so it cannot cancel built-in behavior.
- Provide clear labels and descriptions so users understand what datetime is expected.
- Use min and max to restrict selectable datetimes to valid ranges.
- Set min and max on a Buddhist or Minguo calendar field, so a Gregorian year typed by mistake shows an error instead of a date centuries away.
- Use hasClear when the datetime is optional so the user can reset it.
- Leave hourFormat unset so the field follows the InternationalizationProvider locale's hour cycle (12-hour in en-US, 24-hour in en-GB or de-DE). Set it only when the field itself needs a fixed format, and carry a person's own 12/24-hour preference on the provider locale (e.g. 'en-US-u-hc-h23') rather than on each field.

**Không nên**

- Use DateTimeInput when only a date is needed; use DateInput instead.
- Use DateTimeInput when only a time is needed; use TimeInput instead.
- Hide the label without surrounding context that makes the field purpose obvious.
- Wrap a disabled DateTimeInput in Tooltip to explain why it is disabled. Use the disabledMessage prop instead, which ties the reason to the field.

## Field

Field is a low-level wrapper for custom, native, or third-party controls that do not already provide field label, description, and status UI. Use it when you need the Field shell around a control you own; use styled Astryx inputs like TextInput, Typeahead, and Select directly when they already expose label, description, and validation props.

**Nên**

- Wrap custom controls, native inputs, or third-party widgets that need labeling, helper text, optional/required indicators, or validation status.
- Always provide a label for accessibility, even if visually hidden with isLabelHidden.
- Use inputID and descriptionID to connect the label and description to the inner control with htmlFor and aria-describedby.
- Use attached status only when the wrapped control is opaque, bordered, and fixed-height; use detached for custom, tall, translucent, or non-bordered controls.

**Không nên**

- Nest Field around styled inputs such as TextInput, Typeahead, Select, DateInput, or TextArea; those components already render their own Field shell.
- Set both isOptional and isRequired on the same field.
- Hide the label without providing an alternative way for the user to understand the field purpose.

## FieldStatus

FieldStatus renders validation feedback for fields and field-like controls. Use it directly for custom controls that need the same error, warning, or success presentation as Field.

**Nên**

- Use attached status below bordered inputs when the message belongs to that input.
- Use detached status for controls like checkboxes, switches, and custom controls where overlap would be visually awkward.
- A field's status is announced when it first appears and when its message or type changes, not again when a repeated submit fails with the same errors. On such a repeated submit, with the errors unchanged, announce it once from the form with useAnnounce, for example announce(`${errors.length} errors. ${errors[0]}`, 'assertive'), and move focus to the first invalid field. On a first failed submit the fields announce their own errors, so the form adds no announcement.

**Không nên**

- Use FieldStatus for general alerts or page-level notices; use Banner or Toast instead.

## FileInput

FileInput provides file upload with optional drag-and-drop support. Use it for single or multiple file selection with built-in validation for file type, size, and count. Pair with validation status for upload feedback.

**Nên**

- Always specify an accept prop to guide users toward valid file types.
- Use maxSize and maxFiles to prevent oversized uploads; the component handles validation and error display automatically.
- Add a description to communicate constraints like file size limits or accepted formats.
- Use changeAction for immediate upload workflows that benefit from optimistic UI.

**Không nên**

- Don't use FileInput for directory or folder uploads; that is not supported in v1.
- Don't avoid dropzone mode unless space is constrained; drag-and-drop is the expected interaction for file uploads.
- Don't wrap a disabled FileInput in Tooltip to explain why it's disabled; disabled controls swallow the hover events the wrapper needs. Use the disabledMessage prop instead.

## Indicator

Indicators are the componentized selection visuals shared by CheckboxInput, RadioList, and menu selection rows. They are decorative: the owning component keeps the input, role, accessible name, focus, and keyboard behavior, while the indicator turns state into a picture. That split is what makes them themeable: restyle one through its class targets, or replace the component outright.

**Nên**

- Reach for the canonical `components['checkbox-indicator']` override first. Replacing the component is the heavier path, for when the shape itself is wrong.
- Match the shipped replacement-content branch with `isRenderable(children)`, not `children != null` or `children ?? mark`. The helper is deliberately shallow: it excludes nullish values, booleans, and the empty string, while React elements and containers take the replacement path even when their descendants render nothing. The owning control passes `children={isBusy && <Spinner/>}`, so a nullish check deletes the state mark whenever that value is `false` (#4893).
- A replacement must set aria-hidden. The owning control provides the role and accessible name; a visible indicator would be announced twice.
- Use theme tokens for every color, radius, and border width in a replacement. Run `astryx docs tokens` for the set.
- Render a single root ELEMENT, and let it keep the border-radius you want the focus ring to follow. A control whose real input is visually hidden cannot show focus on that input, so the owner paints the standard ring onto the indicator element itself at focus time (useIndicatorFocusRing), and `outline` then picks up that element's radius. A replacement needs no cooperation and can forget nothing: the ring is never missing (WCAG 2.4.7), it is only the wrong shape if the root has no radius of its own. Do not draw a focus ring yourself; the owner already did.

**Không nên**

- Thread hover or pressed state in as props. Interaction state reaches an indicator through the owner's CSS ancestor marker, so hovering the row tints the control with no props involved.
- Assume you are only mounted when selected. The host renders its indicator unconditionally and passes `state`, in every state; that is what lets a replacement draw where the default draws nothing (a radio's empty circle on an unchosen row). Drawing nothing in a state is a decision the indicator makes, not one the host makes for it.

## InputGroup

InputGroup connects an input with prefix/suffix addons in a single visual unit. Use it for URL fields, currency inputs, search fields with action buttons, or any input that needs contextual decorations.

**Nên**

- Use text addons to show units, prefixes, or suffixes that clarify the input format (e.g., "$", "kg", "https://").
- Use InputGroupText for static prefixes/suffixes like "$", "kg", or "https://".
- Use Button for an action attached to the input; InputGroup connects its corners automatically.
- Use InputGroup with compatible single-line inputs: TextInput, NumberInput, TimeInput, DateInput, Typeahead, Tokenizer, Selector, and MultiSelector.
- Keep each inner input's label specific; grouped inputs automatically combine the group label with their own label and inherit the group description/status context.
- Keep multi-value controls (Tokenizer, MultiSelector) short inside a group — the group is a fixed-height single-line surface, so cap or summarize selections instead of letting them fill the row.

**Không nên**

- Don't put multiple text inputs in one group; use separate fields instead.
- Don't use InputGroup for unrelated inputs; it's for a single input with decorations.
- Don't use InputGroup with TextArea, Slider, Switch, CheckboxInput, or RadioList.

## MultiSelector

A checkbox dropdown for selecting multiple values from a list. Selected items can display as a count, labels, or badges. Use it for filtering or when presenting a finite set of options where multiple choices are needed.

**Nên**

- Use for a moderate, finite set of options where multiple choices are needed.
- Enable search filtering when the list exceeds ~15 options.
- Use renderOption for custom option rows; the checkbox affordance remains owned by MultiSelector.
- Enable select-all when most users will want all or nearly all options selected.
- Use inside InputGroup only when the control needs a short prefix or suffix addon as part of one decorated input surface; prefer count or labels trigger display so the group stays single-line.
- Use variant="secondary" when a multi-selector sits beside secondary buttons or segmented controls, and variant="ghost" when it sits beside ghost buttons. If validation status is needed there, prefer statusVariant="tooltip" so the toolbar height stays compact.
- Use presentation="adaptive" when the multi-selector should become a bottom sheet on compact touch screens.

**Không nên**

- Use for single-value selection; use Selector instead.
- Show more than ~20 options without enabling search.
- Wrap a disabled MultiSelector in Tooltip to explain why it is disabled. Use the disabledMessage prop, which attaches the reason to the trigger itself.

## NumberInput

A form input for numeric values with built-in validation, min/max constraints, and step controls. Use NumberInput for quantities, measurements, percentages, and similar inputs.

**Nên**

- Let people paste formatted numbers: a pasted 1,234,234,234 is read under the field's locale and commits as 1234234234 on blur. Typing is never intercepted.
- Set min, max, and step to guide users toward valid values.
- Show units (e.g. "%" or "GB") so users know what the number represents.
- Set isWheelEnabled={false} when the input appears in a scrolling surface where wheel gestures should always scroll the page.

**Không nên**

- Use NumberInput for free-form text that happens to contain numbers; use TextInput instead.
- Set both isOptional and isRequired on the same field.
- Wrap a disabled NumberInput in Tooltip to explain why it's disabled. Use the disabledMessage prop, which attaches the reason to the field itself.

## PowerSearch

PowerSearch is a structured filter bar where each token represents a field, operator, and value. Use it for complex multi-dimensional filtering when users need to combine multiple search criteria. For simple single-field search, use a text input instead. Host `data-*` attributes, `data-testid` included, reach the primary control: the combobox input in the popover presentation and the trigger button in the sheet presentation. The `components.Token` and `components.Editor` defaults, `PowerSearchToken` and `PowerSearchFilterEditor`, pass them to the token and the editor root.

**Nên**

- Define clear, descriptive field names and aliases so users can quickly find the filter they need.
- Provide a result count to give users feedback on how their filters affect the data set.

**Không nên**

- Use PowerSearch for simple keyword searches; a standard text input is more appropriate for single-field lookups.
- Wrap a disabled PowerSearch in Tooltip to explain why it is disabled; disabled controls swallow the hover events the wrapper needs. Use the disabledMessage prop instead.

## RadioList

A group of options where only one can be selected at a time. All options are visible at once, making it easy to compare choices. Use it when users need to pick one option from a small set.

**Nên**

- Keep the number of options small: typically 2 to 7 choices.
- Use clear, concise labels that differentiate each option at a glance.
- Pre-select a default option when there's a sensible default; don't leave the group empty unless the choice is optional.

**Không nên**

- Use when multiple selections are needed; use CheckboxList instead.
- Use for long lists; use Selector for better discoverability.
- Use horizontal layout with more than 4 options; it wraps awkwardly.
- Wrap a disabled RadioList in Tooltip to explain why it is disabled; disabled controls swallow the hover events the wrapper needs. Use the disabledMessage prop instead.

## Selector

A dropdown selector for choosing a single value from a list of options. Supports labels, validation, descriptions, and required/optional states. Use it in forms and settings when presenting a moderate number of options. Keyboard typeahead matches a native select: typing on the focused closed trigger selects the matching option directly, repeated presses cycle through options sharing a first letter, and spaces count as match characters ("new y" reaches "New York"). With the menu open, typing moves the highlight and Enter commits. With hasSearch, typing on the closed trigger opens the popup and seeds the search input.

**Nên**

- Provide a visible label so users understand what they are selecting.
- Use sections and dividers to organize options when the list exceeds ~8 items.
- Use renderOption for custom option rows. Do not pass SelectorOption directly as JSX children.
- Set a meaningful placeholder that hints at the expected selection (e.g. "Choose a country" not "Select...").
- Use inside InputGroup only when the selector needs a short prefix or suffix addon as part of one decorated input surface.
- Use variant="secondary" when a selector sits in a nav or toolbar beside secondary buttons or a segmented control, so it shares their treatment instead of reading as a form field. Use variant="ghost" when a selector sits in a toolbar with ghost buttons. If validation status is needed there, prefer statusVariant="tooltip" so the toolbar height stays compact.
- Use presentation="adaptive" when the selector should become a bottom sheet on compact touch screens.

**Không nên**

- Use for action menus; use Dropdown Menu for triggering commands or navigation.
- Use when there are only two options; use a SegmentedControl or radio buttons instead.
- Use Selector for navigation; links should be links, not dropdown options.
- Use for yes/no or on/off choices; use Switch or CheckboxInput instead.
- Put more than ~20 options without sections; consider Typeahead for large lists.
- Wrap a disabled Selector in Tooltip to explain why it is disabled. Use the disabledMessage prop, which attaches the reason to the trigger itself.

## Slider

A draggable control for selecting a numeric value or range within defined bounds. Supports single value and range selection, tick marks, custom value formatting, and vertical orientation. Use it when users need to explore a continuous range, such as volume, price, or percentage. Under a finger, on any touch device, it tracks as UISlider does: only the thumb takes a drag, through a target larger than it, the value follows the finger’s travel rather than jumping to it, a release coasts on before `onChangeEnd`, a swipe from the track scrolls the page, and a tap on the track or a mark sets the value when the finger lifts (the thumb springs there). A mouse drag on a thumb tracks the same way, past the same 10 px in any direction, with no lift or coast; a mouse press on the track moves the thumb there, and only a primary click presses. A pen drags as a finger does, claiming only along the track, and its drag ends at the release with no coast. A wheel or a trackpad scroll over the slider goes to whatever scrolls under it.

**Nên**

- Always provide a label, even if visually hidden, so the slider is accessible to screen readers.
- Format values with meaningful units like "$50" or "75%" instead of raw numbers.

**Không nên**

- Use for precise numeric entry; pair with a text input or use NumberInput instead.
- Set a step size so large that only a few positions are possible; use SegmentedControl or radio buttons instead.
- Wrap a disabled slider in Tooltip to explain why it is disabled; disabled controls swallow the hover events the wrapper needs. Use the disabledMessage prop instead.

## Switch

A toggle control for on/off states that take effect immediately. Supports labels, descriptions, loading states, and validation. Use it for settings or preferences that apply instantly. For changes requiring a form submission, use a checkbox instead. Under a finger it moves like the iOS switch on every touch screen: a press lifts the thumb, a drag across flips it, lifting the finger commits, and a tap toggles through the browser’s click. The thumb keeps its circle and size on every device, and under a coarse pointer the invisible hit area grows toward 44 × 44 px, stopping halfway to any neighbouring control so a tap goes to the nearer one. With reduced motion on, a change cross-fades on a touch screen and is immediate with a mouse.

**Nên**

- Use for settings that apply immediately; the toggle should take effect without a separate save action.
- Pair with a clear, concise label that describes the setting being controlled.

**Không nên**

- Use for options that require a form submission to take effect; use a checkbox instead.
- Use a switch for multi-state values; it's strictly on/off.
- Wrap a disabled switch in Tooltip to explain why it is disabled; disabled controls swallow the hover events the wrapper needs. Use the disabledMessage prop instead.

## TextArea

TextArea is a multi-line text input for collecting longer-form content like comments, descriptions, or messages. Use it when the expected input spans multiple lines. For shorter, single-line values, use TextInput.

**Nên**

- Provide a visible label so users know what to enter. If the label must be hidden, set isLabelHidden with a descriptive label for screen readers.
- Set maxLength with a character counter when there is a defined limit; it helps users stay within bounds before they submit.
- Keep Return a line break in a multi-line field. Relabel it with enterKeyHint (send, done) only when your own Enter handling does what the label says.
- Use the status prop to surface validation feedback inline: show success when input is valid, warning for soft limits, and error for hard failures.
- Add a description or placeholder to clarify expected content, like "Describe the issue in detail," but never rely on placeholder alone as the only label.

**Không nên**

- Avoid using TextArea for short, single-line values like names or emails; use TextInput instead.
- Don't rely solely on placeholder text to communicate the purpose of the field; placeholders disappear on focus and are not accessible labels.
- Don't show a status message without also setting the status type; the colored border and icon are what draw the user's attention to the message.
- Don't wrap a disabled TextArea in Tooltip to explain why it's disabled. Use the disabledMessage prop, which attaches the reason to the field itself.

## TextInput

TextInput collects short-form text like names, emails, or search queries. Use it for single-line values where the expected input is brief. Pair it with validation status to guide users through required or formatted fields.

**Nên**

- Always provide a visible label so users know what the field is for. Only hide the label when surrounding context makes it obvious, like a search bar with a magnifying-glass icon.
- Use validation status with a message to explain what went wrong: "Email must include @" is better than just turning the border red.
- Size the input to match the expected content length so users can gauge how much to type: small for zip codes, medium for names, large for URLs.
- Add a clear button for search and filter inputs so users can quickly reset without selecting all text.
- Tell a touch keyboard what the field holds: `type="email"`, `"tel"` or `"url"` for those values, `inputMode="numeric"` for digits that are not a number (a one-time code), `enterKeyHint` for what Return does (Search, Send, Next), and `autoComplete` so AutoFill can fill it.

**Không nên**

- Don't use placeholder text as a replacement for a label; placeholders disappear on focus and are not reliably read by screen readers.
- Don't use TextInput for multi-line content like comments or descriptions; use TextArea instead.
- Don't mark every field as required; only flag mandatory fields so users are not overwhelmed by validation errors.
- Don't wrap a disabled TextInput in Tooltip to explain why it's disabled. Use the disabledMessage prop, which attaches the reason to the field itself.

## TimeInput

TimeInput uses a browser/OS time picker on coarse pointers by default and Astryx's typed field on fine pointers. It converts values to a standard format and supports arrow-key adjustment on the typed surface. Use it in forms, scheduling flows, or any interface where users need to select a specific time.

**Nên**

- Base props such as ref, id, data-*, aria-*, and DOM event handlers go to the time input, the element that is focused and announced. A DOM handler runs after TimeInput's own handler for the same event and still receives events it handled (including ones it called preventDefault on), so it cannot cancel built-in behavior.
- Leave hourFormat unset so the field follows the InternationalizationProvider locale's hour cycle (12-hour in en-US, 24-hour in en-GB or de-DE). Set it only when the field itself needs a fixed format, and carry a person's own 12/24-hour preference on the provider locale (e.g. 'en-US-u-hc-h23') rather than on each field.
- Set min and max constraints when the context has a valid range, like business hours or event windows, so users cannot submit an out-of-bounds time.
- Provide a description or placeholder that hints at the expected format or purpose, like "Business hours: 9 AM – 5 PM".
- Use the status prop to surface validation errors inline: show a message like "Time must be during business hours" so users know exactly what to fix.
- Enable hasClear when the field is optional, so users can remove a previously selected time.
- Place TimeInput inside InputGroup when the time needs a single-line prefix or suffix addon, like a start/end label or timezone marker.

**Không nên**

- Don't use TimeInput for combined date-and-time selection; pair it with a separate DateInput instead.
- Don't hide the label; even when space is tight, keep the label visible or provide a description so the purpose is clear.
- Wrap a disabled TimeInput in Tooltip to explain why it is disabled. Use the disabledMessage prop instead, which ties the reason to the field.

## Tokenizer

Tokenizer is a multi-select input that lets users search, select, and manage multiple items displayed as removable chips. Use it when users need to build a set of selections from a searchable data source, like adding team members, applying tags, or choosing filters.

**Nên**

- Write a placeholder that tells users what they can search for, such as "Search people..." or "Add tags...", so the input is not a blank mystery.
- Set maxEntries when the number of selections should be bounded, like limiting a review to 5 approvers.
- Use hasCreate for free-form tagging where users need to enter values that do not exist in the search source.
- Show validation status with the status prop so users know immediately when a selection is missing or invalid.
- Use inside InputGroup only when the tokenizer needs a short prefix or suffix addon as part of one decorated input surface; the grouped row stays single-line, so keep selections few (maxEntries) or use tokenOverflowBehavior to summarize them.

**Không nên**

- Don't use Tokenizer for single-item selection; use Typeahead instead. Tokenizer is for building sets of two or more items.
- Avoid applying custom colors to individual tokens inside a Tokenizer; use the default token style for visual consistency across the set.
- Don't hide the label; every Tokenizer needs a visible label so users understand what they are selecting. Use isLabelHidden only when surrounding context makes the purpose obvious.
- Wrap a disabled Tokenizer in Tooltip to explain why it is disabled; disabled controls swallow the hover events the wrapper needs. Use the disabledMessage prop instead.

## Typeahead

A searchable input for selecting a single item from a large or dynamic dataset. Results appear as the user types, with support for async data sources, debounced search, and custom item rendering. Use it when the option list is too large for a Selector dropdown.

**Nên**

- Provide descriptive placeholder text that hints at what users can search for.
- Show suggestions on focus when users benefit from seeing popular or recent options before typing.
- Add a search delay for remote data sources to avoid excessive network requests.
- For a remote source, show the matches the page already has at once: call `context.update(local)` in `search`, pass `debounceMs={0}`, delay the server request in the source, and return the server answer with the shown rows first.
- Use inside InputGroup when the typeahead needs a single-line prefix or suffix addon.

**Không nên**

- Use for short, static option lists; use Selector for better discoverability.
- Use for multi-selection; use Tokenizer instead.
- Place multiple Typeaheads adjacent to each other without clear labels differentiating them.
- Wrap a disabled Typeahead in Tooltip to explain why it is disabled; disabled triggers swallow the hover events the wrapper needs. Use the disabledMessage prop instead.
