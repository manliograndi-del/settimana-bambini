/* Mappa dei posti: legge LUOGHI da luoghi.js e li mostra con Leaflet e OpenStreetMap. */
(function(){
  const GROUPS={
    musei:{label:'Musei',c:'#b7a1ef',d:'#6d55b5'},
    parchi:{label:'Parchi',c:'#acda61',d:'#4f8a1f'},
    fattorie:{label:'Fattorie',c:'#ffda55',d:'#b78a1d'},
    ludoteche:{label:'Ludoteche',c:'#ffa6b6',d:'#b94e59'},
    coperto:{label:'Giochi al coperto',c:'#54b9f2',d:'#2b6f99'}
  };
  const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const map=L.map('map',{scrollWheelZoom:false}).setView([45.07,7.68],11);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);
  const layers={};
  for(const key of Object.keys(GROUPS)) layers[key]=L.layerGroup().addTo(map);
  for(const p of LUOGHI){
    const g=GROUPS[p.gruppo]; if(!g) continue;
    const site=/^https?:\/\//.test(p.sito||'')?`<a href="${esc(p.sito)}" target="_blank" rel="noopener">Sito</a>`:'';
    const dir=`<a href="https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lon}" target="_blank" rel="noopener">Come arrivare</a>`;
    const html=`<h3>${esc(p.nome)}</h3><p class="kind" style="color:${g.d}">${esc(g.label)}</p>`+
      (p.indirizzo?`<p>${esc(p.indirizzo)}</p>`:'')+(p.descrizione?`<p>${esc(p.descrizione)}</p>`:'')+`<div class="links">${site}${dir}</div>`;
    L.circleMarker([p.lat,p.lon],{radius:8,color:g.d,weight:2,fillColor:g.c,fillOpacity:.95}).bindPopup(html,{maxWidth:280}).addTo(layers[p.gruppo]);
  }
  const box=document.getElementById('mapFilters'), count=document.getElementById('mapCount');
  const total=()=>Object.keys(GROUPS).filter(k=>map.hasLayer(layers[k])).reduce((n,k)=>n+layers[k].getLayers().length,0);
  const showCount=()=>{count.textContent=`${total()} posti sulla mappa`;};
  for(const [key,g] of Object.entries(GROUPS)){
    const n=layers[key].getLayers().length; if(!n) continue;
    const b=document.createElement('button');
    b.className='chip'; b.setAttribute('aria-pressed','true'); b.style.setProperty('--c',g.c); b.style.setProperty('--d',g.d);
    b.innerHTML=`<span class="dot" aria-hidden="true"></span> ${esc(g.label)} (${n})`;
    b.addEventListener('click',()=>{
      const on=b.getAttribute('aria-pressed')!=='true';
      b.setAttribute('aria-pressed',String(on));
      if(on) layers[key].addTo(map); else map.removeLayer(layers[key]);
      showCount();
    });
    box.appendChild(b);
  }
  showCount();
})();
