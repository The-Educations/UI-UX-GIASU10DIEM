// Danh sách component để chấm. Thêm một mục ở đây + một demo trong demos/ là trang tự có thẻ mới.
// `web`: file tương ứng trong repo web (app/src/components/ui/…). null nghĩa là web chưa có, đây là bản đề xuất mới.

export type GroupId = "action" | "form" | "layout" | "container" | "navigation" | "table" | "content" | "feedback" | "overlay" | "chat"

export const groups: { id: GroupId; label: string; guide: string }[] = [
  { id: "action", label: "Nút và hành động", guide: "guidelines/components/action.md" },
  { id: "form", label: "Form nhập liệu", guide: "guidelines/components/form-controls.md" },
  { id: "layout", label: "Bố cục", guide: "guidelines/components/layout.md" },
  { id: "container", label: "Khung chứa", guide: "guidelines/components/container.md" },
  { id: "navigation", label: "Điều hướng", guide: "guidelines/components/navigation.md" },
  { id: "table", label: "Bảng và danh sách", guide: "guidelines/components/table-list.md" },
  { id: "content", label: "Nội dung", guide: "guidelines/components/content.md" },
  { id: "feedback", label: "Phản hồi và trạng thái", guide: "guidelines/components/feedback-status.md" },
  { id: "overlay", label: "Lớp phủ", guide: "guidelines/components/overlay.md" },
  { id: "chat", label: "Chat", guide: "guidelines/components/chat.md" },
]

export type Entry = {
  id: string
  name: string
  astryx: string
  group: GroupId
  /** Tên file trong kit/src/components/ui/ */
  file: string
  /** File tương ứng bên web, hoặc null nếu chưa có. */
  web: string | null
  demo: string
  /** Chiều cao tối thiểu của khung xem (px), cho thứ mở lớp phủ. */
  minH?: number
  /** Nguồn tham khảo ngoài Astryx (viết lại, không chép mã). */
  ref?: string
}

const w = (f: string) => `app/src/components/ui/${f}`
const e = (id: string, name: string, astryx: string, group: GroupId, file: string, web: string | null, demo: string, minH?: number, ref?: string): Entry => ({ id, name, astryx, group, file, web: web ? w(web) : null, demo, minH, ref })

export const entries: Entry[] = [
  e("button", "Nút", "Button", "action", "button.tsx", "button.tsx", "action.tsx"),
  e("icon-button", "Nút icon", "IconButton", "action", "button.tsx", "button.tsx", "action.tsx"),
  e("button-group", "Nhóm nút", "ButtonGroup", "action", "button-group.tsx", null, "action.tsx"),
  e("segmented-control", "Chọn một trong vài chế độ", "SegmentedControl", "action", "segmented.tsx", null, "action.tsx"),
  e("toggle-button", "Nút bật tắt", "ToggleButton", "action", "toggle.tsx", "toggle.tsx", "action.tsx"),
  e("dropdown-menu", "Menu thao tác", "DropdownMenu, MoreMenu, ContextMenu", "action", "dropdown-menu.tsx", null, "action.tsx", 340),

  e("field", "Trường nhập (nhãn, gợi ý, lỗi)", "Field, FieldStatus", "form", "field.tsx", "field.tsx", "form.tsx"),
  e("text-input", "Ô nhập một dòng", "TextInput", "form", "input.tsx", "input.tsx", "form.tsx"),
  e("textarea", "Ô nhập nhiều dòng", "TextArea", "form", "textarea.tsx", "textarea.tsx", "form.tsx"),
  e("input-group", "Ô nhập có tiền tố, hậu tố", "InputGroup", "form", "input-group.tsx", null, "form.tsx"),
  e("selector", "Ô chọn", "Selector, ComplexSelector", "form", "select.tsx", "select.tsx", "form.tsx", 380),
  e("typeahead", "Ô chọn có tìm", "Typeahead", "form", "typeahead.tsx", null, "form.tsx", 420),
  e("multi-selector", "Chọn nhiều (chip)", "MultiSelector", "form", "toggle-group.tsx", "toggle-group.tsx", "form.tsx"),
  e("checkbox", "Ô tích", "CheckboxInput", "form", "checkbox.tsx", null, "form.tsx"),
  e("checkbox-list", "Danh sách ô tích", "CheckboxList", "form", "checkbox.tsx", null, "form.tsx"),
  e("radio-list", "Danh sách chọn một", "RadioList", "form", "radio-group.tsx", null, "form.tsx"),
  e("switch", "Công tắc", "Switch", "form", "switch.tsx", null, "form.tsx"),
  e("slider", "Thanh trượt", "Slider", "form", "slider.tsx", null, "form.tsx"),
  e("number-input", "Ô nhập số (− và +)", "NumberInput", "form", "number-input.tsx", null, "form.tsx"),
  e("date-input", "Ô chọn ngày, giờ", "DateInput, TimeInput, DateTimeInput, Calendar", "form", "input.tsx", "input.tsx", "form.tsx"),
  e("file-input", "Ô tải tệp", "FileInput", "form", "file-input.tsx", null, "form.tsx"),
  e("tokenizer", "Ô nhập nhiều thẻ", "Tokenizer, Token", "form", "tokenizer.tsx", null, "form.tsx"),

  e("app-shell", "Khung app (thanh bên, thanh trên, thanh dưới)", "AppShell, SideNav, TopNav, MobileNav", "layout", "app-shell.tsx", null, "layout.tsx", 520),
  e("form-layout", "Bố cục form (1 cột → 2 cột)", "FormLayout", "layout", "form-layout.tsx", null, "layout.tsx"),
  e("section", "Khối có tiêu đề", "Section", "layout", "form-layout.tsx", null, "layout.tsx"),
  e("scrollable-area", "Khung cuộn riêng", "ScrollableArea", "layout", "table.tsx", null, "layout.tsx"),

  e("card", "Thẻ", "Card, ClickableCard", "container", "card.tsx", null, "layout.tsx"),
  e("selectable-card", "Thẻ chọn một", "SelectableCard", "container", "card.tsx", null, "layout.tsx"),
  e("collapsible", "Thu gọn, mở rộng", "Collapsible", "container", "accordion.tsx", null, "layout.tsx"),
  e("carousel", "Hàng cuộn ngang", "Carousel", "container", "carousel.tsx", null, "layout.tsx"),

  e("tabs", "Thẻ chuyển nội dung", "TabList", "navigation", "tabs.tsx", "tabs.tsx", "navigation.tsx"),
  e("breadcrumbs", "Đường dẫn trang", "Breadcrumbs", "navigation", "breadcrumb.tsx", null, "navigation.tsx"),
  e("pagination", "Phân trang", "Pagination", "navigation", "pagination.tsx", null, "navigation.tsx"),
  e("stepper", "Các bước", "Stepper", "navigation", "stepper.tsx", null, "navigation.tsx"),

  e("table", "Bảng", "Table", "table", "table.tsx", null, "data.tsx"),
  e("list", "Danh sách", "List, Item", "table", "list.tsx", null, "data.tsx"),
  e("metadata-list", "Cặp nhãn và giá trị", "MetadataList", "table", "list.tsx", null, "data.tsx"),

  e("avatar", "Ảnh đại diện", "Avatar", "content", "avatar.tsx", "avatar.tsx", "content.tsx"),
  e("avatar-group", "Nhóm ảnh đại diện", "AvatarGroup", "content", "avatar.tsx", "avatar.tsx", "content.tsx"),
  e("empty-state", "Trạng thái trống", "EmptyState", "content", "empty.tsx", "empty.tsx", "content.tsx"),
  e("typography", "Chữ", "Text", "content", "../../styles.css", null, "content.tsx"),
  e("timestamp", "Ngày giờ, số tiền", "Timestamp", "content", "timestamp.tsx", null, "content.tsx"),
  e("star-rating", "Chấm sao", "(không có trong Astryx)", "content", "star-rating.tsx", null, "content.tsx", undefined, "Mantine Rating, Ark UI rating-group. Web: rating-section, tutor-review-dialog"),

  e("badge", "Nhãn nhỏ", "Badge", "feedback", "badge.tsx", "badge.tsx", "feedback.tsx"),
  e("banner", "Thông báo trong trang", "Banner", "feedback", "banner.tsx", "alert.tsx", "feedback.tsx"),
  e("progress-bar", "Thanh tiến độ", "ProgressBar", "feedback", "progress.tsx", "progress.tsx", "feedback.tsx"),
  e("skeleton", "Khung xương khi tải", "Skeleton", "feedback", "skeleton.tsx", "skeleton.tsx", "feedback.tsx"),
  e("spinner", "Vòng quay", "Spinner", "feedback", "spinner.tsx", null, "feedback.tsx"),
  e("status-dot", "Chấm trạng thái", "StatusDot", "feedback", "status-dot.tsx", null, "feedback.tsx"),
  e("info-tip", "Gợi ý nhỏ (bấm hoặc rê)", "InfoTip, Tooltip", "feedback", "tooltip.tsx", null, "feedback.tsx", 260),

  e("dialog", "Hộp thoại", "Dialog", "overlay", "dialog.tsx", "dialog.tsx", "overlay.tsx", 440),
  e("alert-dialog", "Hộp thoại xác nhận", "AlertDialog", "overlay", "alert-dialog.tsx", null, "overlay.tsx", 440),
  e("sheet", "Ngăn trượt (dưới, bên phải)", "BottomSheet, Drawer", "overlay", "sheet.tsx", "sheet.tsx", "overlay.tsx", 480),
  e("popover", "Hộp nổi", "Popover", "overlay", "popover.tsx", "popover.tsx", "overlay.tsx", 320),
  e("command-palette", "Tìm nhanh", "CommandPalette", "overlay", "command.tsx", "command.tsx", "overlay.tsx"),
  e("toast", "Thông báo nổi", "Toast", "overlay", "sonner.tsx", "sonner.tsx", "overlay.tsx", 260),

  e("otp-input", "Ô nhập mã xác minh", "(không có trong Astryx)", "form", "otp-input.tsx", null, "web.tsx", undefined, "coss ui otp-field, Ark UI pin-input, Mantine PinInput. Web: signup-code, verify-email"),
  e("day-strip", "Dải ngày chọn buổi học", "(không có trong Astryx)", "form", "day-strip.tsx", null, "web.tsx", undefined, "Kibo UI mini-calendar, Cal.com Booker. Web: availability-grid, booking-card"),
  e("time-slot-picker", "Chọn khung giờ", "(không có trong Astryx)", "form", "time-slot-picker.tsx", null, "web.tsx", undefined, "Cal.com Booker (AvailableTimeSlots). Web: booking-card, event-dialog"),
  e("timeline", "Tiến trình, lịch sử", "(không có trong Astryx)", "content", "timeline.tsx", null, "web.tsx", undefined, "Mantine Timeline, Ant Design Steps. Web: session-actions, wallet"),
  e("stat-tile", "Ô số liệu", "(không có trong Astryx)", "content", "stat-tile.tsx", null, "web.tsx", undefined, "HyperUI stats, shadcn-admin dashboard. Web: today-panel, balance-chip"),
  e("result-state", "Trang lỗi 403, 404, 500, bảo trì", "(không có trong Astryx)", "feedback", "result-state.tsx", null, "web.tsx", undefined, "shadcn-admin errors, Ant Design Result, Primer Blankslate. Web: tutor-404, error-boundary"),

  e("chat", "Khung chat", "Chat", "chat", "bubble.tsx", "bubble.tsx", "data.tsx"),
]

/** Tên Astryx không dựng riêng, kèm lý do. Để agent thấy trọn bản đồ, không có tên nào âm thầm biến mất. */
export type Skipped = { astryx: string; status: "gộp vào" | "web không cần"; into?: string; reason: string }
const g = (astryx: string, into: string, reason: string): Skipped => ({ astryx, status: "gộp vào", into, reason })
const n = (astryx: string, reason: string): Skipped => ({ astryx, status: "web không cần", reason })

export const skipped: Skipped[] = [
  g("Link", "button", "Thẻ <a>; kiểu liên kết là Button variant=link."),
  g("Toolbar", "button-group", "Nhóm nút đủ cho web."),
  g("ClickableCard", "card", "ClickableCard nằm trong card.tsx."),
  g("Divider", "section", "Dùng Separator của web."),
  g("Grid", "form-layout", "Dùng grid của Tailwind."),
  g("Stack", "form-layout", "Dùng flex, gap của Tailwind."),
  g("Center", "form-layout", "Dùng grid place-content-center."),
  g("AspectRatio", "card", "Dùng class aspect-* của Tailwind."),
  g("Layout", "app-shell", "AppShell đã gồm khung trang."),
  g("SideNav", "app-shell", "Có trong AppShell."),
  g("TopNav", "app-shell", "Có trong AppShell."),
  g("MobileNav", "app-shell", "Có trong AppShell."),
  g("NavIcon", "app-shell", "Icon lucide trong NavItem."),
  g("Icon", "button", "Dùng lucide-react."),
  g("Thumbnail", "avatar", "Dùng Avatar hoặc ảnh có aspect-*."),
  g("Token", "tokenizer", "Chip nằm trong Tokenizer."),
  g("InfoTip", "info-tip", "Cùng mục."),
  g("Drawer", "sheet", "Sheet side=right."),
  g("BottomSheet", "sheet", "Sheet side=bottom."),
  g("Overlay", "dialog", "Radix lo việc này."),
  g("DateRangeInput", "date-input", "Hai ô ngày cạnh nhau."),
  g("DateTimeInput", "date-input", "Ô ngày cộng ô giờ."),
  g("TimeInput", "date-input", "Dùng ô giờ của hệ điều hành."),
  g("Calendar", "date-input", "Lịch của hệ điều hành chạy tốt hơn trên điện thoại."),
  g("FieldStatus", "field", "Là FieldError và FieldDescription."),
  g("CheckboxInput", "checkbox", "Cùng mục."),
  g("ComplexSelector", "selector", "Selector kèm Typeahead."),
  g("MoreMenu", "dropdown-menu", "Menu ba chấm là DropdownMenu."),
  g("ContextMenu", "dropdown-menu", "Chuột phải không có trên cảm ứng."),
  n("BottomSheetSwitcher", "Chưa có màn hình nào cần."),
  n("Blockquote", "Lời nhận xét dùng Card."),
  n("Citation", "Web không trích nguồn."),
  n("Code", "Web không hiện mã."),
  n("CodeBlock", "Web không hiện mã."),
  n("Kbd", "Phím tắt không có trên điện thoại."),
  n("Markdown", "Tin tức đã có bộ vẽ riêng (news-body)."),
  n("Timer", "Chưa có màn hình đếm ngược."),
  n("Indicator", "Chưa dùng."),
  n("PowerSearch", "Ô tìm nâng cao chỉ cần ở trang quản trị, làm sau."),
  n("Resizable", "Chia khung kéo được không hợp màn nhỏ."),
  n("NavHeadingMenu", "Chỉ cho trang tài liệu dài."),
  n("Outline", "Chỉ cho trang tài liệu dài."),
  n("OverflowList", "Carousel và Tokenizer đã xử lý tràn."),
  n("TreeList", "Chưa có dữ liệu dạng cây."),
  n("HoverCard", "Không có hover trên cảm ứng, dùng Popover."),
  n("Lightbox", "Xem ảnh lớn làm khi cần (Dialog)."),
  n("ChatDictationButton", "Web chưa nhập giọng nói."),
  n("ChatToolCalls", "Chỉ cho chat với AI."),
  n("Hook và tiện ích (useX, createX, Provider)", "Không có giao diện để chấm. Radix, React và Tailwind đã có phần tương ứng."),
]
