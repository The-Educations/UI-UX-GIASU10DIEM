# Bộ UI/UX tham khảo

Giấy phép, ngày đẩy mã gần nhất và số sao kiểm bằng GitHub API ngày 26/11/2026. Dung lượng, tốc độ và trợ năng chưa đo.

Cột "Cách dùng": **Chép** là chép mã (giữ giấy phép, ghi vào `THIRD_PARTY_NOTICES.md`). **Ý tưởng** là chỉ lấy cách làm rồi tự viết lại; mã trong `kit/` ở nhóm này do mình viết, không chép.

## Nền và luật

| Nguồn | Giấy phép | Cách dùng | Lấy gì |
|---|---|---|---|
| [Astryx](https://github.com/meta/astryx) (Meta) | MIT | Chép luật và layout | Luật Nên và Không nên của từng component, 58 layout mẫu, cách đặt token |
| [shadcn/ui](https://github.com/shadcn-ui/ui) | MIT | Nền web đang dùng | Component gốc; thêm [Attachment](https://ui.shadcn.com/docs/components/radix/attachment), [Item](https://ui.shadcn.com/docs/components/radix/item), [Typeset](https://ui.shadcn.com/docs/typeset) khi cần |
| [Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines) | MIT | Danh sách kiểm | [command.md](https://github.com/vercel-labs/web-interface-guidelines/blob/HEAD/command.md) |
| [ui-skills](https://github.com/ibelick/ui-skills) | MIT | Luật cho agent | [baseline-ui](https://github.com/ibelick/ui-skills/blob/HEAD/skills/baseline-ui/SKILL.md) |
| [make-interfaces-feel-better](https://github.com/jakubkrehel/make-interfaces-feel-better) | MIT | Luật trau chuốt | Chi tiết nhỏ khi bấm, chuyển cảnh |

## Theo tính năng của web

Mỗi dòng nói nguồn nào dạy được gì cho tính năng nào. Bản đồ đầy đủ từng trang nằm ở [guidelines/web-features.md](../guidelines/web-features.md).

| Nguồn | Giấy phép · đẩy mã | Cách dùng | Lấy gì cho web |
|---|---|---|---|
| [Cal.com (cal.diy)](https://github.com/calcom/cal.diy) | MIT · 13/11/2026 | Ý tưởng | Luồng đặt lịch ở [Booker](https://github.com/calcom/cal.diy/tree/main/packages/features/bookings/Booker): chọn ngày, chọn giờ, giờ kín vẫn hiện. Không chép thư mục `ee`, chưa kiểm giấy phép riêng của nó. → `day-strip`, `time-slot-picker` |
| [shadcn-admin](https://github.com/satnaing/shadcn-admin) | MIT · 25/11/2026 | Ý tưởng, chép được | Trang quản trị: [bảng người dùng và thao tác dòng](https://github.com/satnaing/shadcn-admin/tree/main/src/features/users/components), [trang lỗi](https://github.com/satnaing/shadcn-admin/tree/main/src/features/errors), chat. → `result-state`, `stat-tile` |
| [Mantine](https://github.com/mantinedev/mantine) | MIT · 23/11/2026 | Ý tưởng | [PinInput](https://github.com/mantinedev/mantine/tree/master/packages/@mantine/core/src/components/PinInput), [Timeline](https://github.com/mantinedev/mantine/tree/master/packages/@mantine/core/src/components/Timeline), [Rating](https://github.com/mantinedev/mantine/tree/master/packages/@mantine/core/src/components/Rating), Stepper. → `otp-input`, `timeline`, `star-rating` |
| [Ark UI](https://github.com/chakra-ui/ark) | MIT · 26/11/2026 | Ý tưởng | Hành vi bàn phím chuẩn của `pin-input`, `rating-group`, `steps`, `carousel`, `date-picker` |
| [Primer React](https://github.com/primer/react) | MIT · 26/11/2026 | Ý tưởng | [Blankslate](https://github.com/primer/react/tree/main/packages/react/src/Blankslate) (trạng thái trống), [Banner](https://github.com/primer/react/tree/main/packages/react/src/Banner), ActionList |
| [GOV.UK Design System](https://github.com/alphagov/govuk-design-system) | MIT · 26/11/2026 | Ý tưởng | Cách viết và đặt lỗi form: [error-summary](https://github.com/alphagov/govuk-design-system/tree/main/src/components/error-summary), [error-message](https://github.com/alphagov/govuk-design-system/tree/main/src/components/error-message), [character-count](https://github.com/alphagov/govuk-design-system/tree/main/src/components/character-count), [date-input](https://github.com/alphagov/govuk-design-system/tree/main/src/components/date-input). Nội dung hướng dẫn có thể theo giấy phép khác mã, chưa kiểm |
| [Ant Design](https://github.com/ant-design/ant-design) | MIT · 26/11/2026 | Ý tưởng | Steps, Result (trang 403, 404, 500), Rate, Timeline |
| [Kibo UI](https://github.com/shadcnblocks/kibo) | MIT · 04/05/2026 | Chép được | [Dải ngày](https://github.com/shadcnblocks/kibo/blob/HEAD/packages/mini-calendar/index.tsx), [thẻ chọn](https://github.com/shadcnblocks/kibo/blob/HEAD/packages/choicebox/index.tsx). Chữ tiếng Anh viết cứng |
| [coss ui](https://github.com/cosscom/ui) | MIT · 24/11/2026 | Chép được | [OTP](https://github.com/cosscom/ui/blob/HEAD/apps/ui/registry/default/ui/otp-field.tsx), [ô số](https://github.com/cosscom/ui/blob/HEAD/apps/ui/registry/default/ui/number-field.tsx). Nền Base UI, chỉ lấy chỗ shadcn thiếu |
| [HyperUI](https://github.com/markmead/hyperui) | MIT | Ý tưởng | [Ô số liệu](https://hyperui.dev/components/application/stats), [trạng thái trống](https://hyperui.dev/components/application/empty-states). → `stat-tile` |
| [Magic UI](https://github.com/magicuidesign/magicui) | MIT | Chép được | [Marquee](https://github.com/magicuidesign/magicui/blob/HEAD/apps/www/registry/magicui/marquee.tsx), phải tự thêm giảm chuyển động |
| [Vaul](https://github.com/emilkowalski/vaul) | MIT · 03/10/2025 | Ý tưởng | Vuốt để đóng bottom sheet. Lâu chưa cập nhật |
| [React Spectrum](https://github.com/adobe/react-spectrum) | Apache-2.0 · 26/11/2026 | Ý tưởng | Mẫu ARIA và bàn phím cho combobox, calendar, bảng. Apache-2.0 cần giữ thông báo nếu chép |
| [HeroUI](https://github.com/heroui-inc/heroui) | Apache-2.0 · 26/11/2026 | Ý tưởng | Calendar, DatePicker, Pagination. Nền React Aria, khác nền Radix của web |

## Không chép mã vào repo

| Nguồn | Lý do |
|---|---|
| [React Bits](https://github.com/DavidHDev/react-bits/blob/HEAD/LICENSE.md) | MIT kèm Commons Clause, cấm phát hành lại component kể cả bản chuyển đổi |
| [Aceternity](https://ui.aceternity.com/licence) | Cấm phát hành lại file nguồn |
| [animate-ui](https://github.com/imskyleen/animate-ui/blob/HEAD/LICENSE.md) | Web đang cài làm thư viện, giữ nguyên như vậy. Giấy phép hạn chế phát hành lại component |

Đây không phải tư vấn pháp lý. Trước khi chép mã, đọc lại giấy phép.
