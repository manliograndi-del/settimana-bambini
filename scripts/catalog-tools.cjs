const fs = require('node:fs'), path = require('node:path'), crypto = require('node:crypto');
const {coverage} = require('../calendar.js');
const isUrl = value => { try { return ['http:','https:'].includes(new URL(value).protocol); } catch { return false; } };
function validDay(value) { return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0,10) === value; }
function validInstant(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/.test(value) || !validDay(value.slice(0,10)) || Number.isNaN(Date.parse(value))) return false;
  const parts = new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Rome',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).format(new Date(value)).replace(' ','T');
  return parts === value.slice(0,19);
}
function validate(data, root) {
  const errors = [], ids = new Set(), orgs = new Set(), occurrences = new Set();
  if (!Array.isArray(data.events) || !Array.isArray(data.organizations)) throw Error('Catalogo: events e organizations devono essere elenchi');
  for (const org of data.organizations) { if (!org.id || orgs.has(org.id)) errors.push('Organizzazione senza ID o duplicata: '+org.id); orgs.add(org.id); }
  for (const e of data.events) {
    const fail = message => errors.push(e.id+': '+message);
    if (!/^[a-z0-9_-]+$/.test(e.id || '') || ids.has(e.id)) fail('ID assente, non valido o duplicato');
    ids.add(e.id);
    if (e.status !== 'published') continue;
    if (e.isExample || !e.title?.trim() || !e.description?.trim() || !validDay(e.verifiedAt) || !isUrl(e.url)) fail('titolo, descrizione, verifica o fonte mancanti/non validi');
    if (!orgs.has(e.organizationId)) fail('organizzatore inesistente');
    if (!e.venue?.trim() || !e.municipality?.trim() || !e.costLabel?.trim() || !e.ageLabel?.trim()) fail('luogo, comune, costo o età mancanti');
    if (e.participationType === 'course') fail('corso continuativo nel catalogo spot');
    for (const field of ['ageMinMonths','ageMaxMonths']) if (e[field] != null && (!Number.isFinite(e[field]) || e[field]<0)) fail(field+' non valido');
    if (e.ageMinMonths != null && e.ageMaxMonths != null && e.ageMinMonths>e.ageMaxMonths) fail('intervallo età invertito');
    if (!/^[a-zA-Z0-9_-]+\.(png|webp|jpg)$/.test(e.illustration || '') || !fs.existsSync(path.join(root,e.illustration || ''))) fail('illustrazione obbligatoria assente');
    if (e.illustrationCell != null && (!Number.isInteger(e.illustrationCell) || e.illustrationCell<0 || e.illustrationCell>15)) fail('cella illustrazione non valida');
    if (!Array.isArray(e.occurrences) || !e.occurrences.length) {fail('nessuna occorrenza');continue;}
    const localDates = new Set();
    for (const value of e.occurrences) {
      const dateOnly = typeof value === 'string' && value.length === 10;
      if (dateOnly ? (!validDay(value) || e.timeUnknown !== true) : (!validInstant(value) || e.timeUnknown === true)) fail('data, offset Roma o timeUnknown incoerenti: '+value);
      const instant = dateOnly ? value : String(Date.parse(value));
      if (localDates.has(instant)) fail('occorrenza duplicata: '+value);
      localDates.add(instant);
      const key = [e.title,e.venue,e.municipality].map(s=>String(s).normalize('NFKC').trim().toLowerCase().replace(/\s+/g,' ')).concat(instant).join('|');
      if (occurrences.has(key)) fail('evento/luogo/occorrenza duplicati');
      occurrences.add(key);
    }
    if (e.startsAt && !e.occurrences.includes(e.startsAt)) fail('startsAt non presente nelle occorrenze');
    for (const [start,end] of Object.entries(e.occurrenceEnds || {})) if (!e.occurrences.includes(start) || !validInstant(end) || start.length===10 || Date.parse(end)<=Date.parse(start)) fail('fine evento non coerente: '+start);
    const m=e.officialImage;
    if (m && (m.status!=='approved' || !m.credit || !m.license || !m.alt || !validDay(m.reviewedAt) || ![m.src,m.sourceUrl,m.rightsUrl].every(u=>isUrl(u)&&u.startsWith('https:')))) fail('metadati immagine ufficiale incompleti');
  }
  if(errors.length) throw Error(errors.join('\n'));
  return {events:data.events.filter(e=>e.status==='published'&&!e.isExample).length,organizations:orgs.size};
}
function build(root, {checkOnly=false, now=new Date()}={}) {
  const data=JSON.parse(fs.readFileSync(path.join(root,'catalog.json'),'utf8')), result=validate(data,root), days=coverage(data.events,now);
  if(!checkOnly) {
    const script='/* Catalogo pubblico. Generato da scripts/build.cjs. */\nconst DATA = '+JSON.stringify({verifiedEvents:data.events.filter(e=>e.status==='published'&&!e.isExample),organizations:data.organizations})+';\n';
    fs.writeFileSync(path.join(root,'daily-catalog.js'),script);
    for(const page of ['index.html','calendario.html']) {
      let html=fs.readFileSync(path.join(root,page),'utf8');
      for(const name of ['daily-catalog.js','calendar.js','playful.js','playful.css','luoghi.js','nav.js','nav.css']) {
        const version=crypto.createHash('sha256').update(fs.readFileSync(path.join(root,name))).digest('hex').slice(0,12);
        html=html.replace(new RegExp('(["/])'+name.replace('.','\\.')+'(?:\\?v=[^"\\s]+)?','g'),'$1'+name+'?v='+version);
      }
      fs.writeFileSync(path.join(root,page),html);
    }
  }
  return {...result,days,missingDays:days.filter(d=>!d.count).map(d=>d.date)};
}
module.exports={validate,build,validDay,validInstant};
