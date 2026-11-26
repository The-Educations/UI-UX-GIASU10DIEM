import React, {useEffect, useMemo, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Theme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral/built';
import {butterTheme} from '@astryxdesign/theme-butter/built';
import {chocolateTheme} from '@astryxdesign/theme-chocolate/built';
import {matchaTheme} from '@astryxdesign/theme-matcha/built';
import {stoneTheme} from '@astryxdesign/theme-stone/built';
import {gothicTheme} from '@astryxdesign/theme-gothic/built';
import {y2kTheme} from '@astryxdesign/theme-y2k/built';
import {brandTheme} from './brand';
import {components, pages} from './manifest';
import {Extras, Overview, setThemedBox} from './content';

const THEMES = [
  {id: 'gs10', label: 'Gia Sư 10 Điểm (đề xuất)', theme: brandTheme, font: 'Be Vietnam Pro', vi: true},
  {id: 'neutral', label: 'Neutral', theme: neutralTheme, font: 'Figtree', vi: false},
  {id: 'butter', label: 'Butter', theme: butterTheme, font: 'Outfit', vi: false},
  {id: 'chocolate', label: 'Chocolate', theme: chocolateTheme, font: 'Albert Sans + Fraunces', vi: false},
  {id: 'matcha', label: 'Matcha', theme: matchaTheme, font: 'DM Sans + Playwrite', vi: false},
  {id: 'stone', label: 'Stone', theme: stoneTheme, font: 'Figtree + Montserrat', vi: false},
  {id: 'gothic', label: 'Gothic (chỉ tối)', theme: gothicTheme, font: 'Fustat', vi: false},
  {id: 'y2k', label: 'Y2K', theme: y2kTheme, font: 'Poppins', vi: false},
];

const CATS = {
  Action: 'Nút và hành động', 'Form Controls': 'Form nhập liệu', Layout: 'Bố cục', Container: 'Khung chứa',
  Navigation: 'Điều hướng', 'Table & List': 'Bảng và danh sách', Content: 'Nội dung',
  'Feedback & Status': 'Phản hồi và trạng thái', Overlay: 'Lớp phủ (dialog, menu)', Chat: 'Chat', Utility: 'Tiện ích và hook',
};

// Templates the web could use; a suggestion, not an Astryx label.
const FIT = {
  'course-detail': 'Hồ sơ gia sư, chi tiết lớp', 'messaging-shell': 'Trang Tin nhắn', 'login-split': 'Đăng nhập, đăng ký',
  'login-card': 'Đăng nhập', 'dashboard-progress': 'Tổng quan học viên', 'dashboard': 'Trang quản trị',
  'settings-sidebar': 'Cài đặt', 'form-wizard-vertical': 'Onboarding gia sư', 'table-filter': 'Admin: lọc danh sách',
  'shell-side-nav': 'Khung app sau đăng nhập', 'shell-top-nav': 'Khung trang công khai', 'centered-hero': 'Trang chủ',
  'library': 'Danh sách gia sư, thư viện', 'detail-page': 'Chi tiết lớp, chi tiết giao dịch', 'payment-form': 'Nạp ví',
};

const store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

/** Each viewer owns one row, reviews/{id}; without the database the picks stay in this browser. */
function useReviews() {
  const [mine, setMine] = useState(() => store.get('picks', {items: {}, notes: {}}));
  const [others, setOthers] = useState([]);
  const [status, setStatus] = useState('Đang kết nối…');
  const ref = useRef(null);
  const timer = useRef(0);
  const chain = useRef(Promise.resolve());
  const latest = useRef(mine);
  const touched = useRef(false);

  useEffect(() => {
    let off;
    (async () => {
      const db = await window.claude?.use?.('db');
      const user = await window.claude?.use?.('user');
      const id = await user?.id?.();
      if (!db || !id) { setStatus('Lựa chọn chỉ lưu trên máy này'); return; }
      ref.current = db.doc(`reviews/${id}`);
      off = db.collection('reviews').onSnapshot(async snap => {
        const rows = snap.docs.map(d => ({id: d.id, ...d.data()}));
        const own = rows.find(r => r.id === id);
        if (own && !touched.current) {
          const next = {items: own.items ?? {}, notes: own.notes ?? {}};
          latest.current = next;
          setMine(next);
        }
        const rest = rows.filter(r => r.id !== id);
        const names = rest.length ? await user.profiles(rest.map(r => r.id)) : {};
        setOthers(rest.map(r => ({...r, name: names[r.id]?.name || 'Người khác'})));
        setStatus('Đã bật lưu chung');
      }, () => setStatus('Không đọc được dữ liệu chung'));
    })();
    return () => off?.();
  }, []);

  const change = (bucket, key, value) => {
    touched.current = true;
    const next = {...latest.current, [bucket]: {...latest.current[bucket], [key]: value}};
    if (!value) delete next[bucket][key];
    latest.current = next;
    setMine(next);
    store.set('picks', next);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (!ref.current) return;
      chain.current = chain.current
        .then(() => ref.current.set({...latest.current, updatedAt: Date.now()}))
        .then(() => setStatus('Đã lưu'), () => setStatus('Chưa lưu được, lựa chọn vẫn còn trên máy này'));
    }, 600);
  };
  return {mine, others, status, change};
}

function Verdict({k, r}) {
  const v = r.mine.items[k];
  const said = r.others.filter(o => o.items?.[k] || o.notes?.[k]);
  return (
    <div className="g-verdict">
      <button className="g-btn g-yes" aria-pressed={v === 'yes'} onClick={() => r.change('items', k, v === 'yes' ? '' : 'yes')}>Ưng</button>
      <button className="g-btn g-no" aria-pressed={v === 'no'} onClick={() => r.change('items', k, v === 'no' ? '' : 'no')}>Chưa ưng</button>
      <input className="g-note" id={`note-${k}`} placeholder="Ghi chú (muốn sửa gì?)" maxLength={300}
        value={r.mine.notes[k] ?? ''} onChange={e => r.change('notes', k, e.target.value)} />
      {said.map(o => (
        <div className="g-others" key={o.id}>
          {o.name}: {o.items?.[k] === 'yes' ? 'ưng' : o.items?.[k] === 'no' ? 'chưa ưng' : 'ghi chú'}{o.notes?.[k] ? `, “${o.notes[k]}”` : ''}
        </div>
      ))}
    </div>
  );
}

class Boundary extends React.Component {
  state = {error: null};
  static getDerivedStateFromError(error) { return {error}; }
  render() {
    return this.state.error
      ? <p className="g-err">Ví dụ này không chạy được trong trang xem thử: {String(this.state.error.message).slice(0, 160)}</p>
      : this.props.children;
  }
}

/** A themed surface. Links inside demos must not navigate the gallery. */
function Stage({t, mode, viFont, page, children}) {
  const stop = e => { const a = e.target.closest?.('a[href]'); if (a) e.preventDefault(); };
  const vn = viFont && !t.vi
    ? {'--font-family-body': "'Be Vietnam Pro', sans-serif", '--font-family-heading': "'Be Vietnam Pro', sans-serif"}
    : undefined;
  return (
    <Theme theme={t.theme} mode={t.id === 'gothic' ? 'dark' : mode}>
      <div className={page ? 'g-stage g-page' : 'g-stage'} style={vn} onClickCapture={stop} onSubmit={e => e.preventDefault()}>
        {children}
      </div>
    </Theme>
  );
}

function Component({c, view, r}) {
  return (
    <>
      <h1>{c.name}</h1>
      <p className="g-lead">{CATS[c.cat] ?? c.cat}, {c.blocks.length} ví dụ chính thức của Astryx.</p>
      <Verdict k={`c-${c.name}`} r={r} />
      {c.blocks.map((b, i) => (
        <section className="g-sheet" key={`${c.name}-${i}-${view.t.id}`}>
          <header><span>{b.label}</span></header>
          <Stage {...view}><Boundary><b.C /></Boundary></Stage>
        </section>
      ))}
    </>
  );
}

function PageDemo({p, view, r}) {
  return (
    <>
      <h1>{p.name}</h1>
      {FIT[p.slug] && <p className="g-lead">Gợi ý dùng cho: {FIT[p.slug]}.</p>}
      <details className="g-lead"><summary>Mô tả gốc (tiếng Anh)</summary>{p.desc}</details>
      <Verdict k={`p-${p.slug}`} r={r} />
      <section className="g-sheet">
        <header><span>Layout mẫu, cuộn bên trong khung. Thu hẹp cửa sổ để xem trên màn nhỏ.</span></header>
        <Stage {...view} page><Boundary key={`${p.slug}-${view.t.id}`}><p.C /></Boundary></Stage>
      </section>
    </>
  );
}

const SWATCHES = ['accent', 'accent-muted', 'background-body', 'background-surface', 'background-card', 'background-muted', 'text-primary', 'text-secondary', 'border', 'border-emphasized', 'success', 'warning', 'error', 'info'];

function ThemePage({view, r, setTheme}) {
  return (
    <>
      <h1>Theme: {view.t.label}</h1>
      <p className="g-lead">Đổi theme ở thanh trên cùng, mọi component và layout đổi theo. Chấm “Ưng” cho theme bạn muốn lấy làm gốc.</p>
      <div className="g-chips">
        {THEMES.map(t => <button key={t.id} className="g-btn" aria-pressed={t.id === view.t.id} onClick={() => setTheme(t.id)}>{t.label}</button>)}
      </div>
      <Verdict k={`theme-${view.t.id}`} r={r} />
      <section className="g-sheet">
        <header><span>Màu</span></header>
        <Stage {...view}>
          <div className="g-swatches">
            {SWATCHES.map(s => <div className="g-sw" key={s}><i style={{background: `var(--color-${s})`}} /><code>--color-{s}</code></div>)}
          </div>
        </Stage>
      </section>
      <section className="g-sheet">
        <header><span>Chữ, bo góc, đổ bóng</span></header>
        <Stage {...view}>
          {[1, 2, 3, 4].map(n => {
            const H = `h${n}`;
            return <H key={n} style={{margin: '0 0 10px', fontFamily: 'var(--font-family-heading)', fontSize: `var(--text-heading-${n}-size)`}}>Tiêu đề cấp {n}: Tìm gia sư dạy Toán ở Quận 7</H>;
          })}
          <p style={{maxWidth: 620, lineHeight: 1.6}}>Phụ huynh đặt lịch học thử, gia sư xác nhận trong ngày. Chữ có dấu phải rõ: ắ ặ ễ ỗ ữ ỵ Đ đ.</p>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 16}}>
            {[['inner', 'low'], ['element', 'low'], ['container', 'med'], ['page', 'high']].map(([rad, sh]) => (
              <div key={rad} style={{width: 128, height: 72, display: 'grid', placeItems: 'center', fontSize: 11, background: 'var(--color-background-card)', borderRadius: `var(--radius-${rad})`, boxShadow: `var(--shadow-${sh})`}}>{rad} / {sh}</div>
            ))}
          </div>
        </Stage>
      </section>
      <div className="g-tablewrap">
        <table className="g-table">
          <thead><tr><th>Theme</th><th>Font gốc</th><th>Chữ tiếng Việt</th></tr></thead>
          <tbody>
            <tr><td>Gia Sư 10 Điểm</td><td>Be Vietnam Pro</td><td>Đủ dấu</td></tr>
            <tr><td>Neutral, Butter, Matcha, Gothic, Y2K</td><td>Figtree, Outfit, DM Sans, Fustat, Poppins</td><td>Thiếu bộ “vietnamese” trên Google Fonts, phải thay font</td></tr>
            <tr><td>Chocolate</td><td>Albert Sans (thân), Fraunces (tiêu đề)</td><td>Chỉ font tiêu đề đủ dấu</td></tr>
            <tr><td>Stone</td><td>Figtree (thân), Montserrat (tiêu đề)</td><td>Chỉ font tiêu đề đủ dấu</td></tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

function Summary({r}) {
  const rows = [r.mine, ...r.others];
  const who = ['Bạn', ...r.others.map(o => o.name)];
  const keys = [...new Set(rows.flatMap(x => [...Object.keys(x.items ?? {}), ...Object.keys(x.notes ?? {})]))].sort();
  const name = k => k.replace(/^d-cach-/, 'Cách dùng ').replace(/^c-/, 'Component ').replace(/^p-/, 'Layout ').replace(/^theme-/, 'Theme ').replace(/^x-/, 'Bộ ngoài ');
  const word = v => (v === 'yes' ? 'Ưng' : v === 'no' ? 'Chưa ưng' : '');
  const text = keys.map(k => `${name(k)}: ${rows.map((x, i) => `${who[i]} ${word(x.items?.[k]) || '-'}${x.notes?.[k] ? ` (${x.notes[k]})` : ''}`).join('; ')}`).join('\n');
  const [copied, setCopied] = useState('');
  const box = useRef(null);
  const copy = () => navigator.clipboard.writeText(text).then(() => setCopied('Đã chép'), () => { box.current?.select(); setCopied('Đã bôi đen, bấm Cmd+C'); });
  return (
    <>
      <h1>Bạn đã chấm</h1>
      <p className="g-lead">{keys.length ? `${keys.length} mục đã chấm. Chấm xong thì nhắn Claude “chấm xong rồi”.` : 'Chưa chấm mục nào. Mở một theme, component hoặc layout rồi bấm “Ưng” hoặc “Chưa ưng”.'}</p>
      {keys.length > 0 && (
        <>
          <div className="g-tablewrap">
            <table className="g-table">
              <thead><tr><th>Mục</th>{who.map((w, i) => <th key={i}>{w}</th>)}</tr></thead>
              <tbody>{keys.map(k => <tr key={k}><td>{name(k)}</td>{rows.map((x, i) => <td key={i}>{word(x.items?.[k])}{x.notes?.[k] ? ` · ${x.notes[k]}` : ''}</td>)}</tr>)}</tbody>
            </table>
          </div>
          <div className="g-verdict"><button className="g-btn" onClick={copy}>Chép kết quả</button><span className="g-lead">{copied}</span></div>
          <textarea ref={box} id="export" className="g-note" style={{flex: 'none', height: 120}} readOnly value={text} aria-label="Kết quả dạng chữ" />
        </>
      )}
    </>
  );
}

function App() {
  const [route, setRoute] = useState(location.hash.slice(1) || 'overview');
  const [themeId, setThemeId] = useState(() => store.get('theme', 'gs10'));
  const [mode, setMode] = useState(() => store.get('mode', 'system'));
  const [viFont, setViFont] = useState(true);
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const r = useReviews();
  const t = THEMES.find(x => x.id === themeId) ?? THEMES[0];
  const view = {t, mode, viFont};

  useEffect(() => {
    const on = () => { setRoute(location.hash.slice(1) || 'overview'); setOpen(false); window.scrollTo(0, 0); };
    addEventListener('hashchange', on);
    return () => removeEventListener('hashchange', on);
  }, []);
  const setTheme = id => { setThemeId(id); store.set('theme', id); };
  // Stable component per theme so the demos keep their state between renders.
  setThemedBox(useMemo(() => ({children}) => <Stage t={t} mode={mode} viFont={viFont}>{children}</Stage>, [t, mode, viFont]));

  const groups = useMemo(() => Object.keys(CATS).map(cat => ({cat, list: components.filter(c => c.cat === cat)})).filter(g => g.list.length), []);
  const needle = q.trim().toLowerCase();
  const hit = s => !needle || s.toLowerCase().includes(needle);
  const mark = k => (r.mine.items[k] === 'yes' ? 'ưng' : r.mine.items[k] === 'no' ? 'chưa' : '');
  const Link = ({to, label, k}) => <a className="g-link" href={`#${to}`} aria-current={route === to ? 'page' : undefined}><span>{label}</span><small>{k ? mark(k) : ''}</small></a>;

  const comp = components.find(c => `c-${c.name}` === route);
  const page = pages.find(p => `p-${p.slug}` === route);
  const total = components.reduce((a, c) => a + c.blocks.length, 0);
  const sortedPages = [...pages].sort((a, b) => !!FIT[b.slug] - !!FIT[a.slug]);

  return (
    <div className="g-app">
      <div className="g-top">
        <button className="g-btn g-menu" aria-expanded={open} onClick={() => setOpen(!open)}>Mục lục</button>
        <span className="g-brand">Bộ UI/UX The Educations</span>
        <label>Theme <select id="theme" value={t.id} onChange={e => setTheme(e.target.value)}>{THEMES.map(x => <option key={x.id} value={x.id}>{x.label}</option>)}</select></label>
        <label>Nền <select id="mode" value={mode} onChange={e => { setMode(e.target.value); store.set('mode', e.target.value); }}><option value="system">Theo máy</option><option value="light">Sáng</option><option value="dark">Tối</option></select></label>
        <label className="g-extra"><input id="vifont" type="checkbox" checked={viFont} onChange={e => setViFont(e.target.checked)} /> Ép font tiếng Việt</label>
        <label className="g-extra" aria-live="polite">{r.status}</label>
      </div>
      <div className="g-body">
        <nav className={open ? 'g-nav open' : 'g-nav'}>
          <Link to="overview" label="Tổng quan và đề xuất" />
          <Link to="theme" label="Theme và token" />
          <Link to="extras" label="Bộ UI/UX tìm thêm" />
          <Link to="summary" label="Bạn đã chấm" />
          <input className="g-search" id="search" type="search" placeholder="Tìm component, layout" value={q} onChange={e => setQ(e.target.value)} />
          {sortedPages.some(p => hit(p.name)) && <h4>Layout mẫu ({pages.length})</h4>}
          {sortedPages.filter(p => hit(p.name) || hit(FIT[p.slug] ?? '')).map(p => <Link key={p.slug} to={`p-${p.slug}`} label={FIT[p.slug] ? `${p.name} ★` : p.name} k={`p-${p.slug}`} />)}
          {groups.map(g => {
            const list = g.list.filter(c => hit(c.name));
            return list.length ? <React.Fragment key={g.cat}><h4>{CATS[g.cat]} ({list.length})</h4>{list.map(c => <Link key={c.name} to={`c-${c.name}`} label={c.name} k={`c-${c.name}`} />)}</React.Fragment> : null;
          })}
        </nav>
        <main className="g-main">
          {comp ? <Component c={comp} view={view} r={r} />
            : page ? <PageDemo p={page} view={view} r={r} />
            : route === 'theme' ? <ThemePage view={view} r={r} setTheme={setTheme} />
            : route === 'summary' ? <Summary r={r} />
            : route === 'extras' ? <Extras verdict={k => <Verdict k={k} r={r} />} />
            : <Overview counts={{components: components.length, blocks: total, pages: pages.length}} Stage={Stage} view={view} verdict={k => <Verdict k={k} r={r} />} />}
        </main>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
