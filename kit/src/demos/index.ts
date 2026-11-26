import type { ComponentType } from "react"
import * as a from "./action"
import * as f from "./form"
import * as l from "./layout"
import * as nv from "./navigation"
import * as fb from "./feedback"
import * as o from "./overlay"
import * as c from "./content"
import * as d from "./data"

// khoá = id trong registry.ts
export const demos: Record<string, ComponentType> = {
  button: a.button, "icon-button": a.iconButton, "button-group": a.buttonGroup, "segmented-control": a.segmented, "toggle-button": a.toggleButton, "dropdown-menu": a.dropdownMenu,
  field: f.field, "text-input": f.textInput, textarea: f.textarea, "input-group": f.inputGroup, selector: f.selector, typeahead: f.typeahead, "multi-selector": f.multiSelector,
  checkbox: f.checkbox, "checkbox-list": f.checkboxList, "radio-list": f.radioList, switch: f.switchDemo, slider: f.slider, "number-input": f.numberInput, "date-input": f.dateInput, "file-input": f.fileInput, tokenizer: f.tokenizer,
  "app-shell": l.appShell, "form-layout": l.formLayout, section: l.section, "scrollable-area": l.scrollableArea,
  card: l.card, "selectable-card": l.selectableCard, collapsible: l.collapsible, carousel: l.carousel,
  tabs: nv.tabs, breadcrumbs: nv.breadcrumbs, pagination: nv.paginationDemo, stepper: nv.stepper,
  table: d.table, list: d.list, "metadata-list": d.metadataList,
  avatar: c.avatar, "avatar-group": c.avatarGroup, "empty-state": c.emptyState, typography: c.typography, timestamp: c.timestamp, "star-rating": c.starRating,
  badge: fb.badge, banner: fb.banner, "progress-bar": fb.progressBar, skeleton: fb.skeleton, spinner: fb.spinner, "status-dot": fb.statusDot, "info-tip": fb.infoTip,
  dialog: o.dialog, "alert-dialog": o.alertDialog, sheet: o.sheet, popover: o.popover, "command-palette": o.commandPalette, toast: o.toastDemo,
  chat: d.chat,
}
