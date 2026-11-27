/* Coordinate dei luoghi degli eventi per la mappa del giorno.
   Legge catalog.json, cerca su Photon (dati OpenStreetMap) i luoghi nuovi, aggiorna coordinate-eventi.json e scrive coordinate-eventi.js.
   Uso: node scripts/coordinate.cjs        (null = luogo senza indirizzo preciso: resta fuori dalla mappa; si può correggere a mano nel .json) */
const fs = require('node:fs'), path = require('node:path');
const root = path.resolve(__dirname, '..'), file = path.join(root, 'coordinate-eventi.json');
const coords = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
const {events} = JSON.parse(fs.readFileSync(path.join(root, 'catalog.json'), 'utf8'));
const today = new Date().toISOString().slice(0, 10);
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function photon(q) {
  for (let i = 0; i < 3; i++) {
    const r = await fetch('https://photon.komoot.io/api/?limit=1&lat=45.07&lon=7.68&q=' + encodeURIComponent(q), {headers: {'User-Agent': 'settimana-bambini/1.0'}});
    const t = await r.text(); if (!t.startsWith('{')) { await sleep(5000); continue; }
    const f = JSON.parse(t).features[0]; if (!f) return null;
    const [lon, lat] = f.geometry.coordinates;
    return Math.abs(lat - 45.07) < 0.6 && Math.abs(lon - 7.68) < 0.8 ? [+lat.toFixed(5), +lon.toFixed(5)] : null;
  }
  return null;
}
(async () => {
  const todo = [...new Set(events.filter(e => e.status === 'published' && e.occurrences.some(o => o.slice(0, 10) >= today)).map(e => e.venue))].filter(v => !(v in coords));
  for (const v of todo) {
    const e = events.find(x => x.venue === v), parts = v.split('·');
    let addr = (parts.length > 1 ? parts.slice(1).join(' ') : v).replace(/\(.*?\)/g, '').trim();
    if (!addr.toLowerCase().includes(e.municipality.toLowerCase())) addr += ', ' + e.municipality;
    coords[v] = await photon(addr) || await photon(parts[0].trim() + ', ' + e.municipality);
    console.log(coords[v] ? 'trovato ' : 'NON trovato', v);
    await sleep(1300);
  }
  const sorted = Object.fromEntries(Object.entries(coords).sort(([a], [b]) => a.localeCompare(b)));
  fs.writeFileSync(file, JSON.stringify(sorted, null, 1) + '\n');
  fs.writeFileSync(path.join(root, 'coordinate-eventi.js'), '/* Generato da scripts/coordinate.cjs. Luogo dell\'evento -> [lat, lon]. */\nconst COORD = ' + JSON.stringify(Object.fromEntries(Object.entries(sorted).filter(([, c]) => c))) + ';\n');
  console.log(todo.length + ' luoghi nuovi controllati');
})();
