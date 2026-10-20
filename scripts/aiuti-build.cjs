/* Genera aiuti.js dalle schede della revisione Aiuti (file Markdown, una voce per file).
   Uso: node scripts/aiuti-build.cjs <cartella-schede> */
const fs=require('node:fs'),path=require('node:path');
const dir=process.argv[2], root=path.resolve(__dirname,'..');
if(!dir) throw new Error('indicare la cartella delle schede');
const CATS=[
  ['S','scuola','Scuola e studio','DSA, compiti, sostegno, scegliere la scuola'],
  ['H','salute','Salute e crescita','Pediatra, vaccini, sviluppo, consultori'],
  ['D','disabilita','Disabilità e inclusione','Assistenza, familiari, trasporto, sport'],
  ['B','bonus','Bonus e agevolazioni','Soldi per i figli, nido, bollette, sconti'],
  ['F','famiglia','Genitori e famiglia','Sostegno, separazione, affido, nido, estate'],
  ['R','ragazzi','Ragazzi e relazioni','Ascolto, bullismo, posti per ragazzi'],
  ['Q','quotidiani','Aiuti quotidiani','Spesa, vestiti, casa, servizi sociali'],
];
// sezioni di lavoro interne: non vanno sul sito
const HIDE=/^(Tessera|Decisioni|Rimandi|Cosa manca|Dubbi|Cosa resta fuori|Da completare|Già visto|Controllo dei link|Bonus per le mamme lavoratrici)/;

// testo per il sito: niente note di lavoro (fonti, lacune, rimandi ai rapporti)
const FIX=[
  [/Sede e diffusione:/g,'Dove vale:'],
  [/ — scheda [ABC]\b/g,''],[/ \((?:R\d\d|stessa fonte)[^)]*\)/g,''],[/, confermata dalla fonte del Comune/g,''],
  [/ \(dato del vecchio catalogo, da verificare\)/g,''],[/servizi propri non verificati/g,'servizi propri'],
  [/ \(importi non riportati nei rapporti\)/g,''],[/\(età esatte dell'edizione 2027 da verificare quando esce il bando\)/g,'(età esatte nel bando 2027)'],
  [/Non verificato: chiedere/g,'Chiedete'],[/procedura da trovare; intanto primo accesso/g,'chiedete al primo accesso'],
  [/Per la cintura i rapporti non hanno servizi affido verificati \([^)]*\): chi/g,'Chi'],
  [/; per Chieri e Ciriè nei rapporti non c'è un centro verificato/g,''],
  [/non abbiamo una conferma del 2026 che sia ancora aperto con questo orario/g,'telefonate prima per confermare che sia aperto con questo orario'],
  [/solo per CISA 12 abbiamo la pagina del servizio di assistenza a casa; per gli altri consorzi c'è il primo accesso/g,'per CISA 12 c\'è il servizio di assistenza a casa; per gli altri consorzi si parte dal primo accesso'],
  [/mediazione non confermata nei rapporti: chiedere/g,'chiedere se c\'è la mediazione'],
];
const INTERNAL=/\b(?:nei|i|nessun) rapport|da completare|da trovare|da verificare|non lo pubblichiamo|vecchia voce|non abbiamo|non sappiamo|non li scriviamo|non verificat|Lacuna|\bR\d\d\b|§/i;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let TITLES={};
function inline(s){
  let h=esc(s);
  h=h.replace(/(https?:\/\/[^\s<]+[^\s<.,;:)])/g,u=>{const d=u.replace(/^https?:\/\/(www\.)?/,'').split('/')[0];return `<a href="${u}" target="_blank" rel="noopener noreferrer">${d} ↗</a>`;});
  h=h.replace(/\b([\w.+-]+@[\w-]+(?:\.[\w-]+)+)\b/g,'<a href="mailto:$1">$1</a>');
  h=h.replace(/\*\*(.+?)\*\*/g,'<b>$1</b>').replace(/(^|[\s(])\*([^*]+)\*/g,'$1<i>$2</i>');
  h=h.replace(/(?:→\s*)?\b([SHDBFRQU]0\d)\b/g,(m,c)=>TITLES[c]?`<button class="vlink" data-voce="${c}">${esc(TITLES[c])}</button>`:m);
  return h;
}
const clean=line=>{
  for(const [a,b] of FIX) line=line.replace(a,b);
  if(/https?:\/\//.test(line)&&!/rapport|da completare|da trovare/i.test(line.replace(/https?:\/\/\S+/g,''))) return line;
  const parts=line.split(/(?<=[.!?](?:\*\*)?)\s+(?=[A-Z*«ÈÀ])/);
  return parts.filter(p=>!INTERNAL.test(p.replace(/https?:\/\/\S+/g,''))).join(' ');
};
function md(txt){
  const L=txt.split('\n'); let h='', i=0;
  while(i<L.length){
    let l=L[i];
    if(/^\|/.test(l)){ // tabella: una scheda per riga, senza colonne di lavoro
      const rows=[]; while(i<L.length&&/^\|/.test(L[i])){ rows.push(L[i].replace(/^\||\|$/g,'').split('|').map(c=>c.trim())); i++; }
      const head=rows[0], keep=head.map((c,j)=>!/^(Fonte|Stato)$/i.test(c)?j:-1).filter(j=>j>=0);
      h+='<div class="vtab">'+rows.slice(2).map(r=>'<div class="vrow">'+keep.map((j,n)=>{const v=clean(r[j]||'');if(!v)return '';return n===0?`<b class="vk">${inline(v)}</b>`:`<p><span>${esc(head[j])}:</span> ${inline(v)}</p>`;}).join('')+'</div>').join('')+'</div>';
      continue;
    }
    if(/^\s*-\s/.test(l)){
      h+='<ul>'; while(i<L.length&&/^\s*-\s|^\s{2,}\S/.test(L[i])){ let it=L[i].replace(/^\s*-\s/,''); i++;
        while(i<L.length&&/^\s{2,}\S/.test(L[i])&&!/^\s*-\s/.test(L[i])){ it+='<br>'+L[i].trim(); i++; }
        const c=it.split('<br>').map(clean).filter(Boolean); if(c.length&&c[0].replace(/\*\*[^*]*\*\*:?\s*/,'').trim()) h+='<li>'+c.map(x=>inline(x).replace(/^Link: /,'')).join('<br>')+'</li>'; }
      h+='</ul>'; continue;
    }
    if(l.trim()){ let para=l; i++; while(i<L.length&&L[i].trim()&&!/^\||^\s*-\s/.test(L[i])){ para+=' '+L[i]; i++; }
      const c=clean(para); if(c&&c.replace(/\*\*[^*]*\*\*:?\s*/,'').trim()) h+='<p>'+inline(c)+'</p>'; continue; }
    i++;
  }
  return h.replace(/<ul><\/ul>/g,'');
}
function parse(file){
  const t=fs.readFileSync(path.join(dir,file),'utf8'), id=file.slice(0,3);
  const head=t.split('\n')[0].replace(/^# [A-Z]\d\d — /,'').replace(/ \(bozza \d\)$/,'');
  const secs=[]; let cur=null;
  for(const line of t.split('\n')){
    const m=line.match(/^## (.*)/);
    if(m){ cur={h:m[1].trim(),lines:[]}; secs.push(cur); continue; }
    if(cur) cur.lines.push(line);
  }
  const tes=secs.find(s=>/^Tessera/.test(s.h)).lines.join('\n');
  const title=(tes.match(/\*\*Titolo:\*\*\s*(.+)/)||[])[1], sub=(tes.match(/\*\*Sottotitolo:\*\*\s*(.+)/)||[])[1];
  if(!title||!sub) throw new Error(file+': titolo o sottotitolo mancante');
  const rim=(secs.find(s=>/^Rimandi/.test(s.h))||{lines:[]}).lines.join(' ');
  const rel=[...new Set([...rim.matchAll(/\b([SHDBFRQU]0\d)\b/g)].map(m=>m[1]).filter(x=>x!==id))];
  const body=[]; let note='';
  for(const s of secs){
    if(HIDE.test(s.h)) continue;
    const txt=s.lines.join('\n').trim(); if(!txt) continue;
    if(/^Nota finale/.test(s.h)){ note=txt.replace(/^\*|\*$/g,'').trim(); continue; }
    body.push({h:/^Testo/.test(s.h)?'':s.h, md:txt});
  }
  return {id,name:head,t:title.trim(),sub:sub.trim(),body,note,rel};
}
const files=fs.readdirSync(dir).filter(f=>/^[A-Z]\d\d-.*\.md$/.test(f)).sort();
const voci=files.map(parse);
TITLES=Object.fromEntries(voci.map(v=>[v.id,v.t]));
for(const v of voci){ v.html=v.body.map(b=>(b.h?`<h2>${esc(b.h)}</h2>`:'')+md(b.md)).join(''); delete v.body; }
const out={cats:CATS.map(([p,id,t,d])=>({id,t,d,voci:voci.filter(v=>v.id[0]===p).map(v=>v.id)})),voci:Object.fromEntries(voci.map(v=>[v.id,v]))};
for(const c of out.cats) if(!c.voci.length) throw new Error('categoria vuota: '+c.t);
if(!out.voci.U01) throw new Error('manca U01');
fs.writeFileSync(path.join(root,'aiuti.js'),'/* Sezione Aiuti: 38 voci per bisogno più «Serve aiuto urgente?». Generato da scripts/aiuti-build.cjs. Ottobre 2026. */\nconst AIUTI = '+JSON.stringify(out).replaceAll('<h2>Sede e diffusione</h2>','<h2>Dove vale</h2>')+';\n');
console.log('voci',voci.length,'categorie',out.cats.map(c=>c.t+' '+c.voci.length).join(', '));
