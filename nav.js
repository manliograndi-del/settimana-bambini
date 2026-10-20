const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* La settimana dei bambini: navigazione a cascata. Eventi da daily-catalog.js (DATA), posti da luoghi.js (LUOGHI), aiuti da aiuti.js (AIUTI). */
const {romeDate, weekDates, occurrenceDate, upcoming} = Calendar;
const WEEK = weekDates();
const EV_CATS = [['storie',['Lettura']],['lab',['Laboratorio','Laboratori','Gioco e parchi','Sport','Associazioni e ludoteche']],['show',['Teatro','Circo','Spettacoli','Cinema','Musica','Festa','Comuni']],['musei',['Museo','Musei e scienza','Natura']]];
const romeTime = v => new Intl.DateTimeFormat('it-IT',{timeZone:'Europe/Rome',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date(v));
const norm = s => String(s||'').normalize('NFKD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
function buildEvents(){
  const orgs = Object.fromEntries(DATA.organizations.map(o=>[o.id,o.name]));
  return DATA.verifiedEvents.filter(e=>e.status==='published'&&!e.isExample).map(e=>{
    const occ = e.occurrences.filter(o=>WEEK.includes(occurrenceDate(o))&&upcoming(o,e)).sort()
      .map(o=>o.length===10||e.timeUnknown ? occurrenceDate(o) : occurrenceDate(o)+'T'+romeTime(o));
    const c = (EV_CATS.find(([,from])=>from.includes(e.category))||['lab'])[0];
    return {id:e.id,t:e.title,c,img:e.illustration,cell:e.illustrationCell,age:e.ageLabel,a0:e.ageMinMonths,a1:e.ageMaxMonths,free:e.costBand==='free',
      com:e.municipality,venue:e.venue,occ,url:e.url,org:orgs[e.organizationId]||'',d:e.description||'',cost:e.costLabel||'',booking:e.booking||'',checked:e.verifiedAt||''};
  }).filter(e=>e.occ.length);
}
const NAV = {events:buildEvents(), places:LUOGHI.places};
// collega ogni evento al posto che lo organizza o lo ospita (stesso nome e stesso comune)
for(const e of NAV.events){
  const keys = [norm(e.org), norm((e.venue||'').split('·')[0])];
  const p = NAV.places.find(p=>{ const pn=norm(p.n); if(pn.length<6) return false; if(p.com&&e.com&&norm(p.com)!==norm(e.com)) return false;
    return keys.some(k=>k&&(pn===k||(k.length>8&&(k.includes(pn)||pn.includes(k))))); });
  if(p){ e.place=p.id; (p.ev=p.ev||[]).push(e.id); }
}
// illustrazione dell'evento: immagine intera o una delle 16 caselle di un foglio 4×4
const evArt = (e, cls) => !e.img ? '' : `<span class="${cls} art" role="img" aria-label="Illustrazione: ${esc(e.t)}" style="background-image:url(${esc(e.img)});${Number.isInteger(e.cell)?`background-size:400% 400%;background-position:${e.cell%4*100/3}% ${Math.floor(e.cell/4)*100/3}%`:'background-size:cover;background-position:center'}"></span>`;
const SVG = {
  negozi:'<svg viewBox="0 0 48 48"><path d="M10 17h28l-2 24H12z" fill="#ff8b51" stroke="#143442" stroke-width="2.5" stroke-linejoin="round"/><path d="M18 20v-6a6 6 0 0 1 12 0v6" fill="none" stroke="#143442" stroke-width="2.5" stroke-linecap="round"/><circle cx="24" cy="30" r="4" fill="#ffda55" stroke="#143442" stroke-width="2"/></svg>',
  aiuti:'<svg viewBox="0 0 48 48"><path d="M8 24 24 10l16 14v16H8z" fill="#b7a1ef" stroke="#143442" stroke-width="2.5" stroke-linejoin="round"/><path d="M24 36s-7-4.5-7-9a3.6 3.6 0 0 1 7-1.3A3.6 3.6 0 0 1 31 27c0 4.5-7 9-7 9z" fill="#ff8a9b" stroke="#143442" stroke-width="2"/></svg>',
  feste:'<svg viewBox="0 0 48 48"><rect x="11" y="24" width="26" height="15" rx="3" fill="#ffa6b6" stroke="#143442" stroke-width="2.5"/><path d="M11 30h26" stroke="#143442" stroke-width="2"/><path d="M19 24v-6M24 24v-6M29 24v-6" stroke="#143442" stroke-width="2.5"/><path d="M19 14l1 2M24 13l0 2M29 14l-1 2" stroke="#ff8b51" stroke-width="3" stroke-linecap="round"/></svg>',
  vestiti:'<svg viewBox="0 0 48 48"><path d="M18 10l-9 6 4 7 4-2v18h14V21l4 2 4-7-9-6c-1 3-3 5-6 5s-5-2-6-5z" fill="#54b9f2" stroke="#143442" stroke-width="2.5" stroke-linejoin="round"/></svg>',
  comune:'<svg viewBox="0 0 48 48"><path d="M24 4v8" stroke="#143442" stroke-width="2"/><path d="M24 4h9l-2 2.5 2 2.5h-9z" fill="#e2392f"/><path d="M6 20 24 11l18 9z" fill="#f2be12" stroke="#143442" stroke-width="2.4" stroke-linejoin="round"/><rect x="8" y="20" width="32" height="4" fill="#fff" stroke="#143442" stroke-width="2"/><path d="M12 24v13M19 24v13M29 24v13M36 24v13" stroke="#143442" stroke-width="3.2"/><rect x="6" y="37" width="36" height="5" rx="1" fill="#fff" stroke="#143442" stroke-width="2.2"/></svg>',
  salute:'<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="18" fill="#fff" stroke="#143442" stroke-width="2.4"/><path d="M20 12h8v8h8v8h-8v8h-8v-8h-8v-8h8z" fill="#e2392f" stroke="#143442" stroke-width="2" stroke-linejoin="round"/></svg>',
  bonus:'<svg viewBox="0 0 48 48"><ellipse cx="20" cy="36" rx="13" ry="5" fill="#f2be12" stroke="#143442" stroke-width="2.2"/><ellipse cx="20" cy="30" rx="13" ry="5" fill="#f2be12" stroke="#143442" stroke-width="2.2"/><ellipse cx="20" cy="24" rx="13" ry="5" fill="#ffd84a" stroke="#143442" stroke-width="2.2"/><circle cx="33" cy="16" r="10" fill="#ffd84a" stroke="#143442" stroke-width="2.2"/><path d="M36 12.5a5 5 0 1 0 0 7M28.5 15h6M28.5 17.5h6" fill="none" stroke="#143442" stroke-width="2" stroke-linecap="round"/></svg>',
  regione:'<svg viewBox="0 0 48 48"><circle cx="36" cy="12" r="5" fill="#ffd84a"/><path d="M3 40 17 16l8 12 6-8 14 20z" fill="#6aa9d8" stroke="#143442" stroke-width="2.4" stroke-linejoin="round"/><path d="M17 16l-4 7 4-2 3 3z" fill="#fff"/><path d="M3 40h42" stroke="#4ccd73" stroke-width="5"/></svg>',
  metro:'<svg viewBox="0 0 48 48"><rect x="5" y="20" width="12" height="20" fill="#9ecbff" stroke="#143442" stroke-width="2.2"/><rect x="17" y="8" width="14" height="32" fill="#c79bff" stroke="#143442" stroke-width="2.2"/><rect x="31" y="16" width="12" height="24" fill="#ffb27a" stroke="#143442" stroke-width="2.2"/><path d="M21 14h6M21 20h6M21 26h6M9 26h4M35 22h4M35 28h4" stroke="#143442" stroke-width="2"/></svg>',
  ragazzi:'<svg viewBox="0 0 48 48"><path d="M17 12a7 7 0 0 1 14 0" fill="none" stroke="#143442" stroke-width="2.6"/><rect x="10" y="12" width="28" height="30" rx="8" fill="#3fd17a" stroke="#143442" stroke-width="2.4"/><rect x="15" y="26" width="18" height="11" rx="3" fill="#ffd84a" stroke="#143442" stroke-width="2"/><path d="M15 30h18" stroke="#143442" stroke-width="2"/></svg>',
  onu:'<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="16" fill="#5ac6e8" stroke="#143442" stroke-width="2.4"/><path d="M8 24h32M24 8c-7 8-7 24 0 32M24 8c7 8 7 24 0 32M11 15h26M11 33h26" fill="none" stroke="#fff" stroke-width="2"/><circle cx="24" cy="24" r="16" fill="none" stroke="#143442" stroke-width="2.4"/></svg>',
  ue:'<svg viewBox="0 0 48 48"><rect x="4" y="9" width="40" height="30" rx="4" fill="#2f5bd3" stroke="#143442" stroke-width="2.2"/>'+[...Array(12)].map((_,i)=>{const a=i*Math.PI/6;return `<circle cx="${(24+9*Math.cos(a)).toFixed(1)}" cy="${(24+9*Math.sin(a)).toFixed(1)}" r="1.9" fill="#ffd84a"/>`}).join('')+'</svg>',
  arrow:'<svg viewBox="0 0 40 40"><path d="M7 20h22M20 9l11 11-11 11" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  back:'<svg viewBox="0 0 40 40"><path d="M33 20H11M20 9 9 20l11 11" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  play:'<svg viewBox="0 0 20 20"><path d="M5 3l12 7-12 7z" fill="currentColor"/></svg>',
};
const PUMPKIN = '<svg viewBox="0 0 30 28" aria-hidden="true"><path d="M15 6c0-3 1-5 4-6" stroke="#7cb342" stroke-width="2.6" fill="none" stroke-linecap="round"/><ellipse cx="9" cy="17" rx="8" ry="10" fill="#f07f1e"/><ellipse cx="21" cy="17" rx="8" ry="10" fill="#f07f1e"/><ellipse cx="15" cy="17" rx="7" ry="10.5" fill="#ff9a2e"/></svg>';
const ic = k => `<img class="pi" src="ico/${k}.webp" alt="">`;
const scene = k => `<img class="scene" src="scene/${k}.webp" alt="">`;

const AGE = [{id:'0-3',l:'0–3',a:0,b:3,c:'var(--l1)'},{id:'3-6',l:'3–6',a:3,b:6,c:'var(--l2)'},{id:'6-12',l:'6–12',a:6,b:12,c:'var(--l4)'},{id:'12+',l:'12+',a:12,b:99,c:'var(--l5)'}];
const state = {age:null, free:false, day:null, cat:null, cs:'c'};
const resetFilters = () => { state.age=null; state.free=false; };
const fitAge = (a0,a1) => { if(!state.age) return true; const r=AGE.find(x=>x.id===state.age); if(a0==null&&a1==null) return true; return (a0??0) <= r.b && (a1??99) >= r.a; };
const evOK = e => fitAge(e.a0!=null?e.a0/12:null, e.a1!=null?e.a1/12:null) && (!state.free||e.free);
const plOK = p => fitAge(p.a0,p.a1) && (!state.free||p.pr==='gratis');

const EVCATS = [
  {id:'storie',t:'Storie e letture',s:'Storie',icon:'storie',g:'var(--c6)'},
  {id:'lab',t:'Laboratori e giochi',s:'Giochi',icon:'lab',g:'var(--c3)'},
  {id:'show',t:'Spettacoli e feste',s:'Spettacoli',icon:'spettacoli',g:'var(--c7)'},
  {id:'musei',t:'Musei e natura',s:'Musei',icon:'museo',g:'var(--c5)'},
];
const SEC = {
  'Dove andare':{id:'dove',nav:'Posti',g:'var(--c3)',nc:'#6fb6ff',icon:'posti',txt:'Posti aperti quasi sempre, per un pomeriggio libero o un giorno di pioggia: musei, parchi, biblioteche, ludoteche, fattorie.',tip:'Le biblioteche civiche e le eduteche del Comune sono gratis.'},
  'Corsi e sport':{id:'corsi',nav:'Corsi',g:'var(--c5)',nc:'#b5e04a',icon:'corsi',txt:'Attività da fare tutto l’anno, una o due volte a settimana. Servono soprattutto a settembre e a gennaio, quando si iscrivono i bambini.',tip:'Molte scuole fanno una lezione di prova gratuita: chiedetela.'},
  'Negozi e feste':{id:'negozi',nav:'Negozi',g:'var(--c7)',nc:'#ffa04d',icon:'negozi',txt:'Giocattoli, vestiti, usato e posti per la festa di compleanno.',tip:'L’usato per bambini dura poco e costa poco: c’è una categoria apposta.'},
};
const CAT = {
  'Musei e castelli':'castello','Parchi e giardini':'parco','Biblioteche':'biblioteca','Ludoteche ed eduteche':'ludoteche','Fattorie, natura e parchi avventura':'fattoria',
  'Giochi al coperto e piscine':'giochi-coperto','Teatro, circo, musica, arte':'arte','Scienza, scacchi, lingue, coding':'scacchi','Ginnastica, arti marziali, arrampicata':'sport2',
  'Danza, equitazione, pattinaggio, squadra':'danza','Nuoto':'nuoto','Abbigliamento e usato':'vestiti','Giocattoli e librerie':'giocattoli','Feste di compleanno':'feste'};
const GLOSS = ['var(--c1)','var(--c2)','var(--c3)','var(--c4)','var(--c5)','var(--c6)','var(--c7)','var(--c8)','var(--c9)'];
const AIUTI_IC = {scuola:'a-scuola',salute:'a-salute',disabilita:'a-disabilita',bonus:'a-bonus',famiglia:'a-famiglia',ragazzi:'a-ragazzi',quotidiani:'a-quotidiani'};
const DAYS = WEEK.map(id=>{const d=new Date(id+'T12:00:00Z');return [d.toLocaleDateString('it-IT',{weekday:'short',timeZone:'UTC'}).replace('.','').toUpperCase(),String(d.getUTCDate()),id];});
const dayName = (id,o) => new Date(id+'T12:00:00Z').toLocaleDateString('it-IT',{timeZone:'UTC',...o});
const DC = ['#5ac6e8','#f2d14d','#4ccd73','#ff8b51','#c79bff','#9adf6c','#ff8fb0'];

function buildTree(){
  const root = {id:'home',t:'Prima pagina',kids:[]};
  root.kids.push({id:'settimana',t:'Questa settimana!',nav:'Eventi',g:'var(--c4)',nc:'#ffd23f',icon:'eventi',kind:'week',items:()=>NAV.events,kids:[]});
  for(const [name,s] of Object.entries(SEC)){
    const pl = NAV.places.filter(p=>p.s===name);
    const node = {...s,t:name,kind:'places',items:()=>pl,kids:[]};
    node.kids = [...new Set(pl.map(p=>p.k))].map((k,i)=>({id:s.id+'-'+i,t:k,g:GLOSS[(i*2+1)%9],icon:CAT[k]||'gioco',kind:'places',items:()=>pl.filter(p=>p.k===k),leaf:true}));
    root.kids.push(node);
  }
  const voce = (v,icon) => ({id:'v-'+v.id,t:v.t,kind:'voce',icon:v.id==='U01'?icon:'v-'+v.id,v});
  const aiuti = {id:'aiuti',t:'Aiuti e servizi',nav:'Aiuti',g:'var(--c8)',nc:'#c9a8ff',icon:'aiuti',kind:'aiuti',kids:[],items:()=>AIUTI.cats.flatMap(c=>c.voci)};
  aiuti.kids = AIUTI.cats.map((c,i)=>{ const icon=AIUTI_IC[c.id]||'aiuti';
    const n = {id:'aiuti-'+c.id,t:c.t,g:GLOSS[i%9],icon,kind:'aiuti',leaf:true,items:()=>c.voci};
    n.kids = c.voci.map(id=>voce(AIUTI.voci[id],icon)); return n; });
  root.kids.push(aiuti);
  const urg = voce(AIUTI.voci.U01,'a-urgente'); urg.parent = aiuti;
  const index = {[urg.id]:urg}; (function walk(n,parent){n.parent=parent;index[n.id]=n;(n.kids||[]).forEach(k=>walk(k,n));})(root,null);
  return {root,index};
}
const {root,index} = buildTree();
let cur = root;
const pathOf = n => { const p=[]; for(let x=n;x;x=x.parent) p.unshift(x); return p; };
const section = n => pathOf(n)[1];
const count = n => n.kind==='week'?n.items().filter(evOK).length : n.kind==='places'?n.items().filter(plOK).length : n.items().length;
const unit = n => n.kind==='week'?'eventi':n.kind==='aiuti'?'voci':'posti';

/* ---- barra in alto: logo, sezioni, Indietro ---- */
function topHTML(){
  const L = 'bambini'.split(''); const cols=['#ff5a5f','#ffb000','#3fd17a','#2fa3ff','#c46bff','#ff7a1a','#2fd0c4'];
  const logo = `<button class="logo" data-go="home" aria-label="Prima pagina"><small>la settimana dei</small><b>${L.map((l,i)=>`<span class="${i===6?'pk':''}" style="color:${cols[i]};--y:${i%2?'-1px':'1px'}">${i===6?'ı'+PUMPKIN:l}</span>`).join('')}</b></button>`;
  const sec = section(cur);
  const nav = root.kids.map(n=>`<button data-open="${n.id}" style="--nc:${n.nc}" aria-current="${sec===n}">${ic(n.icon)}<span>${n.nav}</span></button>`).join('');
  let h = `<header class="top"><div class="in">${logo}<nav class="nav" aria-label="Sezioni">${nav}</nav></div>`;
  if(cur!==root){
    const p = pathOf(cur); const up = cur.parent;
    h += `<div class="back"><div class="in"><button class="bk" data-go="${up.id}">${SVG.back} Indietro</button>
      <span class="path">${p.slice(0,-1).map(n=>`<button data-go="${n.id}">${esc(n===root?'Prima pagina':n.t)}</button><i>›</i>`).join('')}<b>${esc(cur.t)}</b></span></div></div>`;
  }
  return h + '</header>';
}
function daysHTML(){
  return `<div class="days ${state.day?'picked':''}">${DAYS.map((d,i)=>{const id=d[2];return `<button class="day" data-day="${id}" aria-pressed="${state.day===id}" style="--dc:${DC[i]}"><span>${d[0]}</span><b>${d[1]}</b></button>`}).join('')}</div>`;
}
function filtersHTML(){
  if(cur.kind==='aiuti'||cur.kind==='voce') return '';
  return `<div class="ages"><span class="lab">Età</span>${AGE.map(a=>`<button class="ag" data-age="${a.id}" aria-pressed="${state.age===a.id}" style="--ac:${a.c}">${a.l}</button>`).join('')}<button class="tg" data-free aria-pressed="${state.free}">Gratis</button></div>`;
}
function render(anim){
  let h = topHTML();
  if(cur===root){
    h += `<section class="strip"><div class="in"><div class="strip-h"><h1 class="big-t">Questa settimana!<small>${NAV.events.length} eventi da ${dayName(WEEK[0],{weekday:'long'})} a ${dayName(WEEK[6],{weekday:'long'})}</small></h1>
      <button class="go-arrow" data-open="settimana">Tutti <i>${SVG.arrow}</i></button></div>${daysHTML()}</div></section>`;
    h += `<main class="panel"><div class="in ${anim?'enter':''}">${homeHTML()}${note()}</div></main>`;
  } else {
    const sub = cur.kind==='voce' ? esc(cur.v.sub) : cur.kind==='aiuti' ? '' : cur.kind==='week' ? weekSub() : `${count(cur)} ${unit(cur)}${state.age?' per '+AGE.find(a=>a.id===state.age).l+' anni':''}`;
    h += `<section class="strip"><div class="in">${scene(cur.icon)}<div class="head" style="--g:${cur.g}"><span class="hi">${ic(cur.icon)}</span><h1 class="big-t">${esc(cur.t)}${sub?`<small>${sub}</small>`:''}</h1></div>
      ${cur.txt?`<p class="intro">${esc(cur.txt)}</p>`:''}${cur.tip?`<div class="tip"><b>Consiglio:</b> ${esc(cur.tip)}</div>`:''}${cur.kind==='week'?'<div style="height:10px"></div>'+daysHTML():''}</div></section>`;
    h += `<main class="panel"><div class="in ${anim?'enter':''}">${cur.kind==='week'?weekHTML():cur.kind==='voce'?voceHTML(cur):nodeHTML(cur)}${note()}</div></main>`;
  }
  $('#app').innerHTML = h;
}
const note = () => `<p class="note">Torino e dintorni. Date, orari e prezzi degli eventi sono controllati sui siti di chi li organizza: le fonti sono nelle schede. Orari e aperture dei posti possono cambiare, controllate sul loro sito prima di andare. Loghi dei rispettivi proprietari. <a href="calendario.html">Calendario della settimana con l’orologio delle età</a></p>`;
function weekSub(){
  const n = NAV.events.filter(evOK).filter(e=>!state.cat||e.c===state.cat).filter(e=>!state.day||e.occ.some(o=>o.startsWith(state.day))).length;
  return `${n} eventi ${state.day ? 'di '+new Date(state.day+'T12:00').toLocaleDateString('it-IT',{weekday:'long',day:'numeric'}) : `dal ${dayName(WEEK[0],{day:'numeric',month:'long'})} al ${dayName(WEEK[6],{day:'numeric',month:'long'})}`}`;
}
function evCard(e){
  return `<button class="card" data-ev="${e.id}"><span class="pic">${e.img?`${evArt(e,'ph')}`:''}<span class="age">${esc(shortAge(e))}</span>${e.free?'<span class="age free">gratis</span>':''}</span>
    <span class="t">${esc(e.t)}</span><span class="m">${esc(dayLabel(state.day?e.occ.find(o=>o.startsWith(state.day)):e.occ[0]))} · ${esc(e.com)}</span><span class="play">${SVG.play} Scopri</span></button>`;
}
function shortAge(e){ if(e.a0==null&&e.a1==null) return 'tutti'; const a=e.a0!=null?Math.floor(e.a0/12):0, b=e.a1!=null?Math.ceil(e.a1/12):null; return b!=null?`${a}–${b}`:`${a}+`; }
function homeHTML(){
  const soon = NAV.events.slice().sort((a,b)=>a.occ[0]<b.occ[0]?-1:1);
  const pick = soon.find(e=>e.img&&!Number.isInteger(e.cell)) || soon[0];
  if(!pick) return `<div class="empty">In questi giorni non abbiamo ancora eventi. Intanto guardate i posti qui sotto.</div><h2>E poi, tutto l’anno</h2>${catsHTML(root.kids.slice(1))}`;
  let h = `<article class="feat">${evArt(pick,'fimg')}<div class="tx"><span class="kick">Da non perdere</span><h3>${esc(pick.t)}</h3><p>${esc(pick.d.split('. ')[0])}.</p>
    <button class="play" data-ev="${pick.id}">${SVG.play} Scopri</button></div></article>`;
  const ev = soon.filter(e=>e.img&&e!==pick).slice(0,6);
  h += `<h2>In arrivo</h2><div class="grid">${ev.map(evCard).join('')}</div>`;
  h += `<h2>E poi, tutto l’anno</h2>${catsHTML(root.kids.slice(1))}`;
  return h;
}

const DESC = {'Dove andare':'Musei, parchi, biblioteche, fattorie','Corsi e sport':'Teatro, nuoto, musica, lingue, judo','Negozi e feste':'Giocattoli, vestiti, usato, compleanni','Aiuti e servizi':'Scuola, salute, bonus, famiglia, ragazzi',
  'Musei e castelli':'Musei per bambini, castelli e regge','Parchi e giardini':'Prati, giochi e alberi','Biblioteche':'Libri da leggere e prendere in prestito','Ludoteche ed eduteche':'Stanze piene di giochi, con educatori',
  'Fattorie, natura e parchi avventura':'Animali, orti, percorsi sugli alberi','Giochi al coperto e piscine':'Per i giorni di pioggia','Teatro, circo, musica, arte':'Palco, strumenti, colori',
  'Scienza, scacchi, lingue, coding':'Inglese, scacchi, programmazione','Ginnastica, arti marziali, arrampicata':'Muoversi, cadere bene, arrampicare','Danza, equitazione, pattinaggio, squadra':'Danza, cavalli, pattini, squadra',
  'Nuoto':'Corsi in piscina, dai neonati in su','Abbigliamento e usato':'Vestiti nuovi e di seconda mano','Giocattoli e librerie':'Giochi e libri per ragazzi','Feste di compleanno':'Sale e animatori per la festa'};
for(const c of AIUTI.cats) DESC[c.t]=c.d;
const RT = ['-1.5deg','1.2deg','1deg','-1.2deg','-1deg','1.5deg'];
function catsHTML(list){
  const st = state.cs;
  return `<div class="cg ${st}">${list.map((n,i)=>{
    const c = (n===root.kids[1]||n===root.kids[2]||n===root.kids[3]) ? n.items().length : count(n);
    const u = unit(n);
    if(st==='a'){ const lg = n.kind==='places'?[...new Set(n.items().filter(p=>p.logo&&!p.dk).map(p=>p.logo))].slice(0,3):[];
      return `<button class="cA" data-open="${n.id}" style="--g:${n.g}"><span class="hd">${ic(n.icon)}<em>${c}</em></span><b>${esc(n.t)}</b><span class="lgs">${lg.length?lg.map(l=>`<img src="${l}" alt="">`).join(''):`<i>${esc(DESC[n.t]||c+' '+u)}</i>`}</span></button>`; }
    if(st==='b') return `<button class="cB" data-open="${n.id}" style="--g:${n.g}"><span class="ic">${ic(n.icon)}</span><span class="tx"><b>${esc(n.t)}</b>${DESC[n.t]?`<small>${esc(DESC[n.t])}</small>`:''}</span><em>${c}<span>${u}</span></em></button>`;
    return `<button class="cC" data-open="${n.id}" style="--g:${n.g};--r:${RT[i%6]}">${ic(n.icon)}<b>${esc(n.t)}</b><small><span>${n.kind==='aiuti'?'':c+' '+u}</span><span>→</span></small></button>`;
  }).join('')}</div>`;
}
function weekHTML(){
  let h = `<div class="grow ${state.cat?'picked':''}">${EVCATS.map(c=>`<button class="glossy" data-cat="${c.id}" aria-pressed="${state.cat===c.id}" style="--g:${c.g}">${ic(c.icon)}<span>${c.s}</span></button>`).join('')}</div>`;
  if(state.cat||state.day) h += `<div class="allrow"><button class="go-arrow" data-allev>Tutti <i>${SVG.arrow}</i></button></div>`;
  if(state.cat) h += filtersHTML();
  const v = NAV.events.filter(e=>!state.cat||e.c===state.cat).filter(evOK);
  let any = false;
  for(const [,,day] of DAYS){
    if(state.day && state.day!==day) continue;
    const of = v.filter(e=>e.occ.some(o=>o.startsWith(day))).sort((a,b)=>(a.occ.find(o=>o.startsWith(day))>b.occ.find(o=>o.startsWith(day))?1:-1));
    if(!of.length) continue; any = true;
    const keep = state.day; state.day = day;
    h += `<div class="dayh">${new Date(day+'T12:00').toLocaleDateString('it-IT',{weekday:'long',day:'numeric',month:'long'})}</div><div class="grid">${of.map(evCard).join('')}</div>`;
    state.day = keep;
  }
  return h + (any?'':`<div class="empty" style="margin-top:14px">Nessun evento con questi filtri. Provate a togliere un filtro.</div>`);
}
let typeSel = null;
function nodeHTML(n){
  let h = filtersHTML();
  if(n.kind==='aiuti' && n.leaf) return h + `<div style="height:14px"></div>${vociHTML(n.kids)}`;
  if(n.kids && n.kids.length) h += `${n.kind==='aiuti'?'<div style="height:14px"></div>':'<h2>Scegli una categoria</h2>'}${catsHTML(n.kids)}`;
  if(n.id==='aiuti') h += urgHTML();
  if(n.leaf && n.kind==='places'){
    const it = n.items(), v = it.filter(plOK);
    const types = [...new Set(it.map(p=>p.ty).filter(Boolean))];
    h += `<h2>I posti <small>${v.length}</small></h2>`;
    if(types.length>1) h += `<div class="types"><button class="tg" data-ty="" aria-pressed="${!typeSel}">tutti</button>${types.map(t=>`<button class="tg" data-ty="${esc(t)}" aria-pressed="${typeSel===t}">${esc(t)}</button>`).join('')}</div>`;
    const w = v.filter(p=>!typeSel||p.ty===typeSel).sort((a,b)=>(b.ev?1:0)-(a.ev?1:0)||(b.logo?1:0)-(a.logo?1:0)||a.n.localeCompare(b.n));
    const pc = section(n).g;
    h += w.length ? `<div class="grid">${w.map(p=>`<button class="card" data-pl="${p.id}"><span class="pic ${p.logo?'haslogo':''} ${p.dk?'dark':''}" style="--pc:color-mix(in srgb,${pc},#fff 55%)">${p.logo?`<img class="lg" src="${p.logo}" alt="Logo di ${esc(p.n)}">`:`<img class="pimg" src="ico/${n.icon}.webp" alt="">`}${p.ente?`<img class="by" src="${p.ente}" alt="Gestito da un ente pubblico">`:''}<span class="age">${p.a0!=null?`${p.a0}–${p.a1??'+'}`:'tutti'}</span>${p.pr==='gratis'?'<span class="age free">gratis</span>':''}</span>
      <span class="t">${esc(p.n)}</span><span class="m">${esc(p.ty||'')} · ${esc(p.com||'')}${p.ev?` · <b style="color:#b04a17">${p.ev.length} ${p.ev.length>1?'eventi':'evento'}</b>`:''}</span><span class="play">${SVG.play} Scopri</span></button>`).join('')}</div>`
      : `<div class="empty">Nessun posto con questi filtri. Provate a togliere un filtro.</div>`;
  }
  return h;
}
/* ---- aiuti: categorie, voci, aiuto urgente ---- */
const urgHTML = () => `<button class="urg" data-open="v-U01">${ic('a-urgente')}<b>Serve aiuto urgente?</b><span>112, pronto soccorso dei bambini, numeri per chi ha paura</span></button>`;
const vociHTML = list => `<div class="grid">${list.map(n=>`<button class="card" data-open="${n.id}"><span class="pic"><img class="pimg" src="scene/${n.icon}.webp" alt=""></span><span class="t">${esc(n.t)}</span><span class="m">${esc(n.v.sub)}</span><span class="play">${SVG.play} Scopri</span></button>`).join('')}</div>`;
function voceHTML(n){
  const v = n.v, rel = v.rel.filter(id=>id!=='U01'&&AIUTI.voci[id]).map(id=>index['v-'+id]);
  return `<article class="voce">${v.html}</article>${v.note?`<p class="vnote">${esc(v.note)}</p>`:''}${rel.length?`<h2>Guardate anche</h2>${vociHTML(rel)}`:''}`;
}
function dayLabel(o){ if(!o) return ''; const d=new Date(o.slice(0,10)+'T12:00'); const t=o.slice(11,16); return d.toLocaleDateString('it-IT',{weekday:'short',day:'numeric'})+(t?' · '+t:''); }

/* ---- schede ---- */
function sheet(html){
  const d=document.createElement('div'); d.className='sheet'; d.innerHTML=`<div role="dialog" aria-modal="true"><button class="close" data-x>${SVG.back.replace('<svg','<svg width="16" height="16"')} Torna all’elenco</button>${html}</div>`;
  d.addEventListener('click',ev=>{ if(ev.target===d||ev.target.closest('[data-x]')) d.remove(); });
  document.body.appendChild(d); d.querySelector('.close').focus();
}
const link = (url,label) => { try{ if(!['https:','http:'].includes(new URL(url).protocol)) return ''; }catch(e){ return ''; } return `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} ↗</a>`; };
const evById = id => NAV.events.find(e=>e.id===id);
function showEvent(id){
  const e = evById(id); const pl = e.place!=null ? NAV.places[e.place] : null;
  sheet(`${evArt(e,'hero')}<h3>${esc(e.t)}</h3>
    <p><strong>${e.occ.map(dayLabel).join(' · ')}</strong></p><p>${esc(e.venue)} · ${esc(e.com)}</p><p>${esc(e.d)}</p>
    <p><strong>${esc(e.age)} · ${esc(e.cost)}</strong></p>${e.booking?`<p>${esc(e.booking)}</p>`:''}<p>${link(e.url,'Sito di chi lo organizza')}</p><p class="src">${esc(e.org)}${e.checked?` · informazioni controllate il ${esc(e.checked.split('-').reverse().join('/'))}`:''}. Variazioni da controllare alla fonte.</p>
    ${pl?`<button class="go" data-pl="${pl.id}">Scopri questo posto: ${esc(pl.n)} →</button>`:''}`);
}
function showPlace(id){
  const p = NAV.places[id];
  sheet(`${p.logo||p.ente?`<img src="${p.logo||p.ente}" alt="" style="max-height:70px;max-width:60%;display:block;margin:4px 0;padding:6px 8px;border-radius:8px;background:${p.dk?'#26201f':'#fff'}">`:''}<h3>${esc(p.n)}</h3><p><strong>${esc(p.ty||'')} · ${esc(p.com||'')}${p.a0!=null?` · ${p.a0}–${p.a1??'+'} anni`:''}${p.pr?` · ${esc(p.pr)}`:''}</strong></p>
    ${p.ind?`<p>${esc(p.ind)}</p>`:''}<p>${esc(p.d)}</p>${p.url?`<p>${link(p.url,'Sito del posto')}</p>`:''}
    ${p.ev?`<h2>Prossimi eventi qui</h2>${p.ev.map(id=>{const e=evById(id);return `<button class="go" data-ev="${e.id}">${esc(e.t)} · ${dayLabel(e.occ[0])}</button>`}).join('')}`:''}`);
}

function go(n, push=true, keepDay=false){
  typeSel = null; resetFilters(); state.cat = null; if(!keepDay) state.day = null;
  cur = n; render(true); window.scrollTo(0,0);
  if(push) try{ history.pushState({id:n.id,day:state.day},'',n===root?location.pathname:'#'+n.id); }catch(e){}
}
document.addEventListener('click',ev=>{
  const t = ev.target.closest('button'); if(!t) return;
    if(t.dataset.open) go(index[t.dataset.open]);
  else if(t.dataset.go) go(index[t.dataset.go]);
  else if(t.dataset.day){
    if(cur===root){ state.day=t.dataset.day; t.parentElement.classList.add('picked'); t.setAttribute('aria-pressed','true'); setTimeout(()=>go(index.settimana,true,true),260); }
    else { state.day = state.day===t.dataset.day?null:t.dataset.day; render(); }
  }
  else if(t.dataset.cat){ resetFilters(); state.cat = state.cat===t.dataset.cat?null:t.dataset.cat; render(); }
  else if(t.dataset.allev!==undefined){ resetFilters(); state.cat=null; state.day=null; render(); }
  else if(t.dataset.age!==undefined){ state.age = state.age===t.dataset.age?null:t.dataset.age; render(); }
  else if(t.dataset.free!==undefined){ state.free=!state.free; render(); }
  else if(t.dataset.ty!==undefined){ typeSel=t.dataset.ty||null; render(); }
  else if(t.dataset.ev){ document.querySelector('.sheet')?.remove(); showEvent(t.dataset.ev); }
  else if(t.dataset.pl){ document.querySelector('.sheet')?.remove(); showPlace(+t.dataset.pl); }
  else if(t.dataset.voce){ const n=index['v-'+t.dataset.voce]; if(n) go(n); }
});
addEventListener('popstate',e=>{ document.querySelector('.sheet')?.remove(); state.day=e.state?.day||null; go(index[e.state?.id]||root,false,true); });
addEventListener('keydown',e=>{ if(e.key==='Escape') document.querySelector('.sheet')?.remove(); });

const start = index[location.hash.slice(1)]; if(start) cur=start;
try{ history.replaceState({id:cur.id},''); }catch(e){}
render(false);

/* ---- scritta animata «5per1000ci»: parte enorme e velocissima, si posa in basso a destra, sotto compare la pillola nera; resta 5 secondi. Una volta al giorno, solo in prima pagina. ---- */
document.fonts.ready.then(function intro(){
  if(cur!==root) return;
  const today = romeDate(new Date());
  try{ if(localStorage.getItem('intro5x1000')===today) return; localStorage.setItem('intro5x1000',today); }catch(e){}
  const WORD = '5per1000ci', cols = ['#ff5a5f','#ffb000','#3fd17a','#2fa3ff','#c46bff','#ff7a1a','#2fd0c4'];
  const ov = document.createElement('div'); ov.className = 'intro5';
  ov.innerHTML = `<b>${[...WORD].map((c,i)=>`<span style="color:${cols[i%7]}">${c}</span>`).join('')}</b>`;
  // la pillola sta sotto la scritta: tiene solo lo spazio del testo, il testo vero è quello che arriva volando
  const pill = document.createElement('button'); pill.className = 'pill5'; pill.type = 'button'; pill.setAttribute('aria-label',WORD);
  pill.innerHTML = `<span style="visibility:hidden">${WORD}</span>`;
  document.body.append(pill, ov);
  const big = ov.firstChild, bw = big.scrollWidth, W = innerWidth, H = innerHeight;
  pill.style.fontSize = ((pill.clientWidth-28)/bw*46)+'px';
  const ch = bw/WORD.length, k = Math.max(W,H)*1.3/ch, pb = pill.getBoundingClientRect();
  const dx = pb.left+pb.width/2-W/2, dy = pb.top+pb.height/2-H/2, end = (pill.clientWidth-28)/bw;
  const done = () => { ov.remove(); pill.remove(); };
  pill.addEventListener('click', done);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches, FLY = reduce ? 0 : 1300;
  big.animate([
    {transform:`translate(${ch*.5*k}px,0) scale(${k})`},
    {transform:`translate(${dx}px,${dy}px) scale(${end})`}
  ],{duration:FLY,easing:'cubic-bezier(.2,.9,.25,1)',fill:'forwards'});
  const fade = [{opacity:1},{opacity:1,offset:.95},{opacity:0}];
  pill.animate([{opacity:0},{opacity:1,offset:.04},{opacity:1,offset:.95},{opacity:0}],{duration:5500,delay:FLY,fill:'both'}).onfinish = done;
  big.animate(fade,{duration:5500,delay:FLY,fill:'forwards'});
});
