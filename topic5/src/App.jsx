import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, RotateCcw, RotateCw } from 'lucide-react';

const SECRET = [4, 7, 2];
const MAX = 5;

function score(code) {
  const exact = code.filter((n, i) => n === SECRET[i]).length;
  const close = code.filter((n, i) => n !== SECRET[i] && SECRET.includes(n)).length;
  return { exact, close };
}
function verdict({ exact, close }) {
  if (exact === 3) return 'Усі цифри на своїх місцях.';
  if (!exact && !close) return 'Жодної правильної цифри.';
  const parts = [];
  if (exact) parts.push(`${exact} ${exact === 1 ? 'цифра на своєму місці.' : 'цифри на своїх місцях.'}`);
  if (close) parts.push(`${close} ${close === 1 ? 'цифра правильна, але стоїть не там.' : 'цифри правильні, але стоять не там.'}`);
  if (!exact) parts.unshift('Жодна не на своєму місці.');
  return parts.join(' ');
}

function SafeDial({ rotation, digit, onRotate, onKey, onLock, onOpen, slots, phase }) {
  const drag = useRef(null);
  const dialRef = useRef(null);
  const setAngle = (event) => {
    const box = dialRef.current.getBoundingClientRect();
    return Math.atan2(event.clientY - box.top - box.height / 2, event.clientX - box.left - box.width / 2) * 180 / Math.PI;
  };
  const begin = (event) => {
    drag.current = setAngle(event);
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const move = (event) => {
    if (drag.current === null) return;
    const angle = setAngle(event);
    let delta = angle - drag.current;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    drag.current = angle;
    onRotate((value) => value + delta);
  };
  const stop = () => {
    if (drag.current !== null) onRotate((value) => Math.round(value / 36) * 36);
    drag.current = null;
  };
  return <div className="safe" aria-label="Механічний сейф">
    <div className="safe-top">
      <div className="code-slots">{[0, 1, 2].map((i) => <button key={i} onClick={() => slots.length === i && onLock()} className={`code-slot ${slots.length === i ? 'current' : slots[i] !== undefined ? 'locked' : ''}`} aria-label={`Позиція ${i + 1}`}><span>{slots[i] ?? (slots.length === i ? digit : '—')}</span><small>{i + 1}</small></button>)}</div>
      <button className={`handle ${phase === 'checking' ? 'turn-handle' : ''}`} onClick={onOpen} aria-label="Перевірити комбінацію"><svg viewBox="0 0 100 100"><g strokeLinecap="round" strokeWidth="8"><line x1="50" y1="50" x2="50" y2="15"/><line x1="50" y1="50" x2="80" y2="67.5"/><line x1="50" y1="50" x2="20" y2="67.5"/></g><circle cx="50" cy="15" r="9"/><circle cx="80" cy="67.5" r="9"/><circle cx="20" cy="67.5" r="9"/><circle className="handle-hub" cx="50" cy="50" r="15"/></svg><small>{phase === 'checking' ? 'ПЕРЕВІРКА' : 'РУЧКА'}</small></button>
    </div>
    <button ref={dialRef} className="dial-face" role="slider" aria-label={`Диск сейфа. Зараз ${digit}.`} aria-valuemin="0" aria-valuemax="9" aria-valuenow={digit} tabIndex={0} onPointerDown={begin} onPointerMove={move} onPointerUp={stop} onPointerCancel={stop} onKeyDown={onKey}>
      <svg viewBox="0 0 400 400" aria-hidden="true">
        <defs><radialGradient id="bezel" cx="50%" cy="35%" r="70%"><stop stopColor="#686c71"/><stop offset=".55" stopColor="#34373b"/><stop offset="1" stopColor="#131416"/></radialGradient><linearGradient id="face" x2=".4" y2="1"><stop stopColor="#34373b"/><stop offset="1" stopColor="#141517"/></linearGradient><radialGradient id="knob" cx="40%" cy="32%" r="75%"><stop stopColor="#777b81"/><stop offset=".5" stopColor="#3a3d41"/><stop offset="1" stopColor="#18191c"/></radialGradient></defs>
        <circle cx="200" cy="200" r="198" fill="url(#bezel)"/><circle cx="200" cy="200" r="186" fill="none" stroke="#0008"/><circle cx="200" cy="200" r="173" fill="#0a0b0c"/>
        <g className="rotating-disc" style={{ transform: `rotate(${rotation}deg)` }}>
          <circle cx="200" cy="200" r="169" fill="url(#face)" stroke="#ffffff1a"/><circle cx="200" cy="200" r="140" fill="none" stroke="#ffffff0a"/><circle cx="200" cy="200" r="104" fill="none" stroke="#0008" strokeWidth="2"/>
          {Array.from({ length: 100 }, (_, i) => { const a = (i * 3.6 - 90) * Math.PI / 180; const major = i % 10 === 0; const r1 = major ? 146 : 151; const r2 = 164; return <line key={i} x1={200 + Math.cos(a) * r1} y1={200 + Math.sin(a) * r1} x2={200 + Math.cos(a) * r2} y2={200 + Math.sin(a) * r2} stroke={major ? '#eeeae2dc' : '#eeeae262'} strokeWidth={major ? 2.5 : 1.3} strokeLinecap="round"/>; })}
          {Array.from({ length: 10 }, (_, n) => <text key={n} x="200" y="76" textAnchor="middle" dominantBaseline="middle" fontFamily="Inter,Arial,sans-serif" fontSize="34" fontWeight={n === digit ? 600 : 400} fill={n === digit ? '#f2a93b' : '#e6e1d7'} transform={`rotate(${n * 36} 200 200)`}>{n}</text>)}
          <circle cx="200" cy="200" r="66" fill="url(#knob)" stroke="#0009" strokeWidth="1.5"/>
          {Array.from({ length: 36 }, (_, n) => { const a = n * 10 * Math.PI / 180; return <line key={n} x1={200 + Math.cos(a) * 51} y1={200 + Math.sin(a) * 51} x2={200 + Math.cos(a) * 64} y2={200 + Math.sin(a) * 64} stroke="#0008" strokeWidth="2.2" strokeLinecap="round"/>; })}
          <circle cx="200" cy="200" r="40" fill="#35383d" stroke="#ffffff14"/><circle cx="200" cy="168" r="3.5" fill="#f2a93b"/>
        </g><polygon points="184,0 216,0 200,26" fill="#f2a93b"/><rect x="198.5" y="24" width="3" height="14" rx="1.5" fill="#f2a93b"/>
      </svg>
    </button>
    <p className="safe-hint">Крути диск пальцем — цифра під покажчиком стане поточною</p>
  </div>;
}

export default function App() {
  const [rotation, setRotation] = useState(0);
  const [slots, setSlots] = useState([]);
  const [history, setHistory] = useState([{ code: [7, 4, 9], ...score([7, 4, 9]) }]);
  const [phase, setPhase] = useState('play');
  const [notice, setNotice] = useState('');
  const [attempts, setAttempts] = useState(1);
  const [demo, setDemo] = useState(false);
  const [cooldown, setCooldown] = useState(45);
  const digit = ((Math.round(rotation / 36) % 10) + 10) % 10;
  const canDial = phase === 'play';
  useEffect(() => {
    if (phase !== 'cooldown') return undefined;
    const id = window.setInterval(() => setCooldown((n) => { if (n <= 1) { window.clearInterval(id); setPhase('play'); setAttempts(2); setNotice('Механізм охолов. Доступно ще 3 спроби.'); return 0; } return n - 1; }), 1000);
    return () => window.clearInterval(id);
  }, [phase]);
  const lock = () => {
    if (!canDial) return;
    if (slots.length >= 3) return setNotice('Комбінацію складено. Поверни ручку, щоб перевірити.');
    if (slots.includes(digit)) return setNotice(`Цифра ${digit} вже є в наборі. Цифри не повторюються.`);
    const next = [...slots, digit]; setSlots(next); setNotice(next.length === 3 ? 'Комбінацію складено. Поверни ручку, щоб перевірити.' : '');
  };
  const reset = () => { setSlots([]); setNotice(''); };
  const undo = () => { setSlots((old) => old.slice(0, -1)); setNotice(''); };
  const open = (code = slots) => {
    if (!canDial) return;
    if (code.length < 3) return setNotice('Спершу зафіксуй усі 3 цифри — тоді ручка піддасться.');
    setPhase('checking'); setNotice('');
    window.setTimeout(() => {
      const result = { code: [...code], ...score(code) };
      setHistory((old) => [result, ...old]); setAttempts((n) => n + 1); setSlots([]);
      if (result.exact === 3) setPhase('open');
      else { setPhase('play'); setNotice(`Не відчинилось · ${code.join(' · ')}. ${verdict(result)}`); }
    }, 850);
  };
  const onKey = (event) => {
    if (/^[0-9]$/.test(event.key)) { event.preventDefault(); const d = Number(event.key); const diff = ((d - digit + 15) % 10) - 5; setRotation((n) => Math.round(n / 36) * 36 - diff * 36); }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') { event.preventDefault(); setRotation((n) => Math.round(n / 36) * 36 - 36); }
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') { event.preventDefault(); setRotation((n) => Math.round(n / 36) * 36 + 36); }
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); lock(); }
    if (event.key === 'Backspace') { event.preventDefault(); undo(); }
  };
  const runDemo = (code) => { setSlots(code); setRotation(-code[2] * 36); window.setTimeout(() => open(code), 0); };

  return <main className="app" id="top">
    <header className="topbar"><button className="back"><ChevronLeft size={23}/> <span>Сейфи</span></button><div className="attempts"><span className="pips">{Array.from({ length: MAX }, (_, i) => <i className={i < MAX - attempts ? 'lit' : ''} key={i}/>)}</span><b>{Math.max(0, MAX - attempts)}/{MAX}</b></div></header>
    <div className="intro"><div className="sender"><i/> ВІД ОКСАНИ</div><h1>Відкрити до п’ятниці</h1><p>«Терпіння допомагає. Але логіка — швидше».</p></div>
    {phase === 'open' ? <section className="win"><span>СЕЙФ ВІДКРИТО</span><p>Ти відкрив сейф. Тепер твоя черга створити загадку.</p><strong>Комбінація 04 · 07 · 02</strong><button>Створити загадку</button></section> : <>
      <SafeDial rotation={rotation} digit={digit} onRotate={setRotation} onKey={onKey} onLock={lock} onOpen={() => open()} slots={slots} phase={phase}/>
      {notice && <p className="notice" role="status">{notice}</p>}
      {phase === 'cooldown' && <p className="notice">Механізм заблоковано · 00:{String(cooldown).padStart(2, '0')}</p>}
      <div className="sticky-actions"><div className="action-top"><button className="round-action" onClick={undo} aria-label="Стерти останню цифру" disabled={!slots.length}><RotateCcw/></button><button className="lock-action" onClick={lock} disabled={!canDial || slots.length >= 3}>ЗАФІКСУВАТИ <b>{digit}</b></button><button className="round-action" onClick={reset} aria-label="Скинути набір" disabled={!slots.length}><RotateCw/></button></div><div className="action-bottom"><button onClick={reset} disabled={!slots.length}>Скинути набір</button><button onClick={() => open()} disabled={!canDial}>Відкрити сейф</button></div></div>
    </>}
    <section className="history" id="history"><h2>ІСТОРІЯ СПРОБ</h2>{history.length ? history.map((item, i) => <article key={i}><div className="history-head"><span className="history-n">#{history.length - i}</span><b className="history-code">{item.code.join('  ')}</b><span className="badge">на місці {item.exact}</span><span className="badge dim">не там {item.close}</span></div><p>{verdict(item)}</p></article>) : <p className="empty">Ще жодної спроби. Перша — найсміливіша.</p>}</section>
    <p className="keyboard-help">Клавіатура: ← → крутять диск, 0–9 — швидкий перехід, Enter фіксує, Backspace стирає останню.</p>
    <section className="demo"><button className="demo-head" onClick={() => setDemo(!demo)}>Демо-режим <span>{demo ? '−' : '+'}</span></button>{demo && <div className="demo-buttons"><button onClick={() => runDemo([4, 2, 9])}>Невдала 4·2·9</button><button onClick={() => runDemo(SECRET)}>Показати відкриття</button><button onClick={() => setNotice('Немає з’єднання з сейфом. Спробу не зараховано.')}>Обірвати зв’язок</button><button onClick={() => {setPhase('cooldown');setCooldown(45)}}>Таймер блокування</button><button onClick={() => {setSlots([]);setHistory([]);setAttempts(0);setPhase('play');setNotice('')}}>Почати знову</button></div>}</section>
  </main>;
}
