import React, {useState} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {Stack} from '@astryxdesign/core/Layout';
import {Text, Heading} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Badge} from '@astryxdesign/core/Badge';
import {Avatar} from '@astryxdesign/core/Avatar';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Selector} from '@astryxdesign/core/Selector';
import {ProgressBar} from '@astryxdesign/core/ProgressBar';
import {Switch} from '@astryxdesign/core/Switch';

const A = ({href, children}) => <a href={href} target="_blank" rel="noreferrer">{children}</a>;

function Sample() {
  const [subject, setSubject] = useState('Toán');
  const [phone, setPhone] = useState('');
  const [online, setOnline] = useState(true);
  return (
    <Stack direction="horizontal" gap={4} wrap="wrap" vAlign="start">
      <Card width={320} maxWidth="100%">
        <Stack direction="vertical" gap={3}>
          <Stack direction="horizontal" gap={3} vAlign="center">
            <Avatar name="Nguyễn Minh Anh" size="lg" />
            <Stack direction="vertical" gap={0}>
              <Heading level={4}>Nguyễn Minh Anh</Heading>
              <Text type="supporting" color="secondary">Gia sư Toán, Lý, lớp 8 đến 12</Text>
            </Stack>
          </Stack>
          <Stack direction="horizontal" gap={2} wrap="wrap">
            <Badge label="Đã xác minh" variant="success" />
            <Badge label="Còn 2 suất" variant="warning" />
          </Stack>
          <Text type="body">Học phí 200.000đ mỗi buổi 90 phút. Học thử buổi đầu.</Text>
          <Stack direction="horizontal" gap={2} wrap="wrap">
            <Button label="Đặt học thử" variant="primary" />
            <Button label="Nhắn tin" variant="secondary" />
          </Stack>
        </Stack>
      </Card>
      <Card width={320} maxWidth="100%">
        <Stack direction="vertical" gap={3}>
          <Heading level={4}>Tìm gia sư</Heading>
          <Selector label="Môn học" options={['Toán', 'Vật lý', 'Tiếng Anh', 'Ngữ văn']} value={subject} onChange={setSubject} />
          <TextInput label="Số điện thoại phụ huynh" placeholder="09xx xxx xxx" value={phone} onChange={setPhone} />
          <Switch label="Chấp nhận học online" value={online} onChange={setOnline} />
          <Button label="Gửi yêu cầu" variant="primary" />
          <ProgressBar label="Hồ sơ đã điền" value={70} hasValueLabel />
        </Stack>
      </Card>
    </Stack>
  );
}

export function Overview({counts, Stage, view, verdict}) {
  return (
    <>
      <h1>Bộ UI/UX The Educations, bản để duyệt</h1>
      <p className="g-lead">
        Chạy từ <A href="https://github.com/meta/astryx">Astryx</A> của Meta (bản 0.7.17, còn Beta, giấy phép MIT):
        {' '}{counts.components} mục component và hook, {counts.blocks} ví dụ, {counts.pages} layout mẫu, 7 theme gốc và 1 theme đề xuất theo màu web hiện tại.
        Layout có dấu ★ là gợi ý hợp với web mình. Ví dụ gốc viết bằng tiếng Anh.
      </p>
      <section className="g-sheet">
        <header><span>Thử trên nội dung của web mình (dữ liệu ví dụ). Đổi theme ở thanh trên để so.</span></header>
        <Stage {...view}><Sample /></Stage>
      </section>

      <div className="g-text">
        <h2>Cách duyệt</h2>
        <ol>
          <li>Mở <a href="#theme">Theme và token</a>, chọn theme gốc.</li>
          <li>Xem các layout ★ và những component hay dùng, bấm “Ưng” hoặc “Chưa ưng”.</li>
          <li>Xem <a href="#extras">bộ UI/UX tìm thêm</a>.</li>
          <li>Cách A đã được chọn làm mặc định; muốn đổi thì chấm bên dưới rồi nhắn Claude.</li>
        </ol>
        <h2>Hai cách đưa vào web</h2>
        <p>
          Web đang chạy React 19, Tailwind 4 và shadcn. Đo thử một trang chỉ có 5 component Astryx (Card, TextInput, Selector, Button, Dialog):
          tải thêm khoảng 240 KB JavaScript và 50 KB CSS (đã nén gzip) so với trang React trống. Đây là phép đo riêng, chưa đo trên web thật.
        </p>
      </div>

      <h2 style={{fontSize: 15, margin: 0, fontFamily: 'inherit'}}>A. Lấy thiết kế, giữ code đang có (Claude đề xuất)</h2>
      <p className="g-lead">Repo chung chứa token màu, chữ, bo góc, luật dùng nút và form, sơ đồ layout, theo Astryx. Web vẫn dùng shadcn, chỉ chỉnh cho đúng token. Nhẹ, đổi dần từng trang. Đổi lại, component trên web sẽ giống chứ không y hệt trang này.</p>
      {verdict('d-cach-a')}
      <h2 style={{fontSize: 15, margin: 0, fontFamily: 'inherit'}}>B. Chuyển hẳn sang component Astryx</h2>
      <p className="g-lead">Giống y hệt trang này và có sẵn rất nhiều component. Đổi lại phải thay gần hết giao diện đang có, tải nặng hơn, và thư viện còn Beta nên có thể đổi API.</p>
      {verdict('d-cach-b')}

      <div className="g-text">
        <h2>Lưu ý trước khi chọn theme</h2>
        <p>Phần lớn theme gốc dùng font không có bộ tiếng Việt trên Google Fonts. Ô “Ép font tiếng Việt” thay bằng Be Vietnam Pro để bạn so màu và hình khối cho công bằng. Theme đề xuất đã dùng sẵn font này. Phần nền tối của theme đề xuất là mới, web hiện chỉ có nền sáng.</p>
      </div>
    </>
  );
}

const DEMOS = [
  {key: 'thong-ke', name: 'Ô số liệu', from: 'HyperUI', url: 'https://hyperui.dev/components/application/stats', use: 'Tổng quan gia sư và admin. Chỉ HTML và CSS.',
    demo: <div className="x-stats">{[['Buổi tuần này', '12'], ['Học viên', '5'], ['Đánh giá', '4,9']].map(([a, b]) => <div key={a}><small>{a}</small><strong>{b}</strong></div>)}</div>},
  {key: 'dai-chay', name: 'Dải chữ chạy', from: 'Magic UI', url: 'https://github.com/magicuidesign/magicui/blob/HEAD/apps/www/registry/magicui/marquee.tsx', use: 'Dải “tìm gia sư” trên đầu trang. Chạy bằng CSS, dừng khi rê chuột hoặc khi máy bật giảm chuyển động.',
    demo: <div className="x-marquee">{[0, 1].map(i => <div key={i} aria-hidden={i === 1}><span>Cần gia sư Toán 9, Quận 7</span><span>Tiếng Anh giao tiếp, online</span><span>Lý 11, tối thứ 3 và 5</span></div>)}</div>},
  {key: 'dai-ngay', name: 'Dải chọn ngày', from: 'Kibo UI', url: 'https://github.com/shadcnblocks/kibo/blob/HEAD/packages/mini-calendar/index.tsx', use: 'Chọn buổi học trên điện thoại. Mã gốc cần date-fns và phải Việt hoá.', demo: <Days />},
  {key: 'the-chon', name: 'Thẻ để chọn', from: 'Kibo UI', url: 'https://github.com/shadcnblocks/kibo/blob/HEAD/packages/choicebox/index.tsx', use: 'Chọn vai trò lúc đăng ký.', demo: <Choices />},
  {key: 'ma-otp', name: 'Ô nhập mã xác minh', from: 'coss ui', url: 'https://github.com/cosscom/ui/blob/HEAD/apps/ui/registry/default/ui/otp-field.tsx', use: 'Xác minh email. Bản gốc dùng Base UI, thêm một thư viện nền nữa.',
    demo: <div className="x-otp">{[1, 2, 3, 4, 5, 6].map(i => <input key={i} id={`otp-${i}`} inputMode="numeric" maxLength={1} aria-label={`Số thứ ${i}`} />)}</div>},
  {key: 'tep-chat', name: 'Thẻ tệp đính kèm', from: 'shadcn/ui', url: 'https://ui.shadcn.com/docs/components/radix/attachment', use: 'Gửi tài liệu trong Tin nhắn.',
    demo: <div className="x-file"><b>PDF</b><span>De-cuong-Toan-9.pdf<small>1,2 MB</small></span></div>},
];

function Days() {
  const [on, setOn] = useState(2);
  return <div className="x-days">{['T2 23', 'T3 24', 'T4 25', 'T5 26', 'T6 27', 'T7 28'].map((d, i) => <button key={d} aria-pressed={on === i} onClick={() => setOn(i)}>{d.split(' ')[0]}<b>{d.split(' ')[1]}</b></button>)}</div>;
}
function Choices() {
  const [on, setOn] = useState(0);
  return <div className="x-choice">{[['Phụ huynh', 'Tìm gia sư cho con'], ['Gia sư', 'Nhận lớp dạy']].map(([a, b], i) => <button key={a} aria-pressed={on === i} onClick={() => setOn(i)}><b>{a}</b>{b}</button>)}</div>;
}

const KITS = [
  ['shadcn/ui', 'https://github.com/shadcn-ui/ui', 'MIT', 'Nền đang dùng. Thêm Attachment, Item, Typeset.'],
  ['Web Interface Guidelines', 'https://github.com/vercel-labs/web-interface-guidelines', 'MIT', 'Luật kiểm giao diện cho AI. Nên đưa vào repo chung.'],
  ['ui-skills', 'https://github.com/ibelick/ui-skills', 'MIT', 'Luật cho agent về chuyển động và trợ năng.'],
  ['make-interfaces-feel-better', 'https://github.com/jakubkrehel/make-interfaces-feel-better', 'MIT', 'Luật trau chuốt chi tiết.'],
  ['HyperUI', 'https://github.com/markmead/hyperui', 'MIT', 'Khối HTML thuần, nhẹ nhất.'],
  ['Magic UI', 'https://github.com/magicuidesign/magicui', 'MIT', 'Lấy ý hiệu ứng, phải tự thêm giảm chuyển động.'],
  ['Kibo UI', 'https://github.com/shadcnblocks/kibo', 'MIT', 'Component lịch, thẻ chọn. Chữ tiếng Anh viết cứng.'],
  ['coss ui', 'https://github.com/cosscom/ui', 'MIT', 'Đẹp, nhưng nền Base UI. Chỉ lấy chỗ shadcn thiếu.'],
];

export function Extras({verdict}) {
  return (
    <>
      <h1>Bộ UI/UX tìm thêm</h1>
      <p className="g-lead">Các hình dưới là minh hoạ Claude tự viết theo ý tưởng của từng bộ, chưa phải mã gốc. Bấm tên nguồn để xem bản thật. Dùng theo màu của theme đang chọn ở mục Theme.</p>
      {DEMOS.map(d => (
        <React.Fragment key={d.key}>
          <section className="g-sheet">
            <header><span>{d.name}. Nguồn ý tưởng: <A href={d.url}>{d.from}</A></span></header>
            <ThemedBox>{d.demo}</ThemedBox>
          </section>
          <p className="g-lead">{d.use}</p>
          {verdict(`x-${d.key}`)}
        </React.Fragment>
      ))}
      <div className="g-tablewrap">
        <table className="g-table">
          <thead><tr><th>Nguồn</th><th>Giấy phép</th><th>Dùng làm gì</th></tr></thead>
          <tbody>{KITS.map(([n, u, l, w]) => <tr key={n}><td><A href={u}>{n}</A></td><td>{l}</td><td>{w}</td></tr>)}</tbody>
        </table>
      </div>
      <div className="g-text">
        <h2>Không chép vào repo của mình</h2>
        <ul>
          <li><A href="https://github.com/DavidHDev/react-bits/blob/HEAD/LICENSE.md">React Bits</A>: MIT kèm Commons Clause, cấm phát hành lại component kể cả bản chuyển đổi.</li>
          <li><A href="https://ui.aceternity.com/licence">Aceternity</A>: cấm phát hành lại file nguồn.</li>
          <li><A href="https://github.com/imskyleen/animate-ui/blob/HEAD/LICENSE.md">animate-ui</A>: web đang cài làm thư viện thì ổn, nhưng không chép mã vào repo chung.</li>
          <li>Hiệu ứng WebGL, GSAP hay nền động trên màn hình chính: nặng cho điện thoại tầm trung (nhận định, chưa đo).</li>
        </ul>
      </div>
    </>
  );
}

let ThemedBox = ({children}) => <div className="g-stage">{children}</div>;
export const setThemedBox = c => { ThemedBox = c; };
