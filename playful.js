const $=id=>document.getElementById(id),esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const {romeDate,weekDates,occurrenceDate,upcoming,coverage}=Calendar;
let visibleWeek=weekDates();
const state={days:new Set(visibleWeek),age1:0,chosen:false,free:false,outside:false,weekly:false,cats:new Set()};
const catalog=DATA.verifiedEvents.filter(e=>e.status==='published'&&!e.isExample);
const BANDS=[{from:0,to:3,label:'Da 0 a 3 anni'},{from:3,to:6,label:'Da 3 a 6 anni'},{from:6,to:12,label:'Da 6 a 12 anni'},{from:12,to:null,label:'Oltre 12 anni'}];
function fit(e){
 if(!state.chosen)return {rank:0,label:''};
 if(e.ageMinMonths==null)return {rank:3,label:'Età da confermare'};
 const b=BANDS[state.age1],ok=(b.to==null||e.ageMinMonths<b.to*12)&&(e.ageMaxMonths==null||e.ageMaxMonths>=b.from*12);
 return {rank:ok?0:4,label:''};
}
const CATS=[{id:'storie',label:'Storie e letture',from:['Lettura']},{id:'lab',label:'Laboratori e giochi',from:['Laboratorio','Laboratori','Gioco e parchi','Sport','Associazioni e ludoteche']},{id:'show',label:'Spettacoli e feste',from:['Teatro','Circo','Spettacoli','Cinema','Musica','Festa','Comuni']},{id:'musei',label:'Musei e natura',from:['Museo','Musei e scienza','Natura']}];
function catOf(e){return CATS.find(c=>c.from.includes(e.category))?.id;}
const DAY=864e5;
function weekly(e){if(e.isRecurring===true)return true;const t=[...new Set(e.occurrences.map(occurrenceDate))].map(d=>Date.parse(d+'T12:00:00Z'));if(t.some(a=>t.includes(a+DAY)&&t.includes(a+2*DAY)))return false;return t.some(a=>t.includes(a+7*DAY));}
function outside(e){return !!e.municipality&&e.municipality!=='Torino';}
function ageText(){return BANDS[state.age1].label;}
function results(){return catalog.filter(e=>(!state.free||e.costBand==='free')&&(!state.outside||outside(e))&&(!state.weekly||weekly(e))&&(!state.cats.size||state.cats.has(catOf(e)))&&fit(e).rank!==4&&e.occurrences.some(d=>state.days.has(occurrenceDate(d))&&upcoming(d,e))).sort((a,b)=>fit(a).rank-fit(b).rank);}
function art(e){
 if(!/^[a-zA-Z0-9_-]+\.(png|webp|jpg)$/.test(e.illustration||''))return '<span class="art" role="img" aria-label="Illustrazione non disponibile"></span>';
 const i=e.illustrationCell, sprite=Number.isInteger(i);
 return '<span class="art" role="img" aria-label="Illustrazione originale: '+esc(e.title)+'" style="background-image:url('+esc(e.illustration)+');'+(sprite?'--x:'+(i%4*100/3)+'%;--y:'+(Math.floor(i/4)*100/3)+'%':'background-size:cover;background-position:center')+'"></span>';
}
function dates(e,short=false){return e.occurrences.filter(d=>state.days.has(occurrenceDate(d))&&upcoming(d,e)).map(d=>{if(short)return new Date(occurrenceDate(d)+'T12:00:00Z').toLocaleDateString('it-IT',{day:'numeric',month:'short',timeZone:'UTC'});return e.timeUnknown?new Date(d+'T12:00:00Z').toLocaleDateString('it-IT',{weekday:'short',day:'numeric',month:'short',timeZone:'UTC'})+' · orario da confermare':new Date(d).toLocaleString('it-IT',{weekday:'short',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit',timeZone:'Europe/Rome'});});}
function link(url,label){try{if(!['https:','http:'].includes(new URL(url).protocol))return '';return `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} ↗</a>`}catch{return '';}}
function approvedImage(e){const m=e.officialImage;return m&&m.status==='approved'&&[m.src,m.sourceUrl,m.rightsUrl].every(u=>{try{return new URL(u).protocol==='https:'}catch{return false}})&&m.credit&&m.license?m:null;}
function detailArt(e){const m=approvedImage(e);if(!m)return '<figure class="detail-media original-media">'+art(e)+'<figcaption>La nostra illustrazione, ispirata all’attività.</figcaption></figure>';return '<figure class="detail-media official-media"><div class="media-fallback">'+art(e)+'<small>La nostra illustrazione, ispirata all’attività.</small></div><img class="official-photo" src="'+esc(m.src)+'" alt="'+esc(m.alt||e.title)+'" loading="eager" decoding="async" referrerpolicy="no-referrer"><figcaption>'+esc(m.credit)+' · '+link(m.sourceUrl,'Fonte')+' · '+link(m.rightsUrl,m.license)+(m.authorUrl?' · '+link(m.authorUrl,'Autore'):'')+(m.note?'<br>'+esc(m.note):'')+'<br>Immagine mostrata integralmente, senza ritagli.</figcaption></figure>';}
function settleOfficialImage(img,ok){const figure=img.closest('.official-media');if(figure)figure.classList.toggle('photo-loaded',ok);}
document.addEventListener('load',ev=>{if(ev.target.matches?.('.official-photo'))settleOfficialImage(ev.target,true);},true);
document.addEventListener('error',ev=>{if(ev.target.matches?.('.official-photo'))settleOfficialImage(ev.target,false);},true);
function full(e,context="event"){return `<div class="full-info">${detailArt(e)}<h2 id="${context}-title-${esc(e.id)}">${esc(e.title)}</h2><p class="event-dates"><strong>${dates(e).map(esc).join('<br>')}</strong></p><p>${esc(e.venue)}</p><p>${esc(e.description)}</p><p><strong>${esc(e.ageLabel)} · ${esc(e.costLabel)}</strong></p>${e.durationLabel?`<p>${esc(e.durationLabel)}</p>`:''}${e.availabilityLabel?`<p><strong>${esc(e.availabilityLabel)}</strong></p>`:''}<p>${esc(e.booking)}</p>${link(e.url,'Sito organizzatore').replace('<a ','<a class="source-link" ')}<details class="source-details"><summary>Fonti e informazioni</summary><p>${esc(DATA.organizations.find(o=>o.id===e.organizationId)?.name)}<br>Informazioni consultate il ${esc(e.verifiedAt||"data non indicata")}. Disponibilità e variazioni da controllare alla fonte.</p>${e.lastReview?`<p>Controllo parziale del ${esc(e.lastReview.date)}: ${esc(e.lastReview.scope)}</p>`:''}<p>${esc(e.accessibility)}</p>${(e.relatedSources||[]).map(s=>'<p>'+link(s.url,s.label)+'</p>').join('')}${e.priceSource?link(e.priceSource,'Tariffe'):''}<p>Le illustrazioni delle tessere sono originali. Le immagini degli organizzatori, quando disponibili nella scheda, riportano fonte e crediti.</p></details></div>`;}
let lastView='';
function emptyMessage(){
 if(!state.days.size)return ['Scegli almeno un giorno','Tocca una carta del calendario per vedere gli appuntamenti.'];
 const available=catalog.some(e=>e.occurrences.some(d=>state.days.has(occurrenceDate(d))&&upcoming(d,e)));
 return available?['Nessun risultato con questi filtri','Prova altre età, altri giorni o spegni qualche pulsante.']:['Non abbiamo appuntamenti censiti per questi giorni','Il calendario può essere incompleto. Torna a controllare gli aggiornamenti.'];
}
function emptyHtml(){const [title,message]=emptyMessage();return '<section class="empty-state"><div class="empty empty-theatre" aria-hidden="true"><img src="empty-theatre-ages.webp" alt="" width="2086" height="2048"></div><h2>'+title+'</h2><p>'+message+'</p><button id="emptyReset">Mostra tutti gli appuntamenti</button></section>';}
function renderNow(){
 const opened=new Set([...document.querySelectorAll('.event-row[open]')].map(n=>n.dataset.key));
 const focused=document.activeElement,focusedRow=focused?.closest('[data-key]'),focusKey=focusedRow?.dataset.key;
 const focusIndex=focusedRow?[...focusedRow.querySelectorAll('summary,a,button,[tabindex]')].indexOf(focused):-1;
 const list=results(),isList=list.length<10;$('events').className=isList?'event-list':'poster-grid';const gaps=coverage(catalog,new Date(),7).filter(d=>state.days.has(d.date)&&!d.count);$('coverage').hidden=!gaps.length;$('coverage').textContent=gaps.length?'Alcuni giorni selezionati non hanno appuntamenti censiti. Il calendario può essere incompleto.':'';$('status').textContent=list.length+' attività'+(state.chosen?' · '+ageText():'')+(!list.length?' · '+emptyMessage()[0]:'');$('events').innerHTML=list.length?list.map(e=>{const badge=fit(e).label;if(isList)return `<details class="event-row" data-key="${e.id}"><summary>${art(e)}<span><span class="row-title">${esc(e.title)}</span><span class="row-meta">${esc([...new Set(dates(e,true))].join(', ')+' · '+e.municipality)}</span><span class="row-meta">${esc(e.costLabel)}</span>${badge?`<small class="row-fit">${badge}</small>`:''}</span><span class="arrow" aria-hidden="true">⌄</span></summary>${full(e)}</details>`;return `<button class="poster" data-key="${e.id}" data-event="${e.id}" aria-label="Apri ${esc(e.title)}">${art(e)}<span class="poster-title">${esc(e.title)}</span>${badge?`<small class="fit">${badge}</small>`:''}</button>`;}).join(''):emptyHtml();
 document.querySelectorAll('[data-event]').forEach(b=>b.onclick=()=>{$('detailContent').innerHTML=full(catalog.find(e=>e.id===b.dataset.event),'dialog');$('detail').setAttribute('aria-labelledby','dialog-title-'+b.dataset.event);$('detail').showModal();});if($('emptyReset'))$('emptyReset').onclick=()=>{$('reset').focus();reset()};
 document.querySelectorAll('[data-date]').forEach(b=>b.setAttribute('aria-pressed',String(state.days.has(b.dataset.date))));syncFilters();syncDial('age1');
 for(const row of document.querySelectorAll('.event-row'))if(opened.has(row.dataset.key))row.open=true;
 if(focusKey){const target=[...$('events').querySelectorAll('[data-key]')].find(n=>n.dataset.key===focusKey);if(target){const child=target.querySelectorAll('summary,a,button,[tabindex]')[focusIndex];(child||target.querySelector('summary')||target).focus({preventScroll:true});}else $('reset').focus({preventScroll:true});}
 lastView=viewSignature();}
function syncFilters(){for(const k of ['free','outside','weekly'])$(k).setAttribute('aria-pressed',String(state[k]));const n=state.cats.size;$('catLabel').textContent=!n?'Tutte le categorie':n===1?CATS.find(c=>state.cats.has(c.id)).label:n+' categorie';$('catButton').classList.toggle('active',n>0);$('catPanel').querySelectorAll('input').forEach(i=>i.checked=i.value?state.cats.has(i.value):!n);}
/* Quattro fasce di 67,5° ciascuna, da 0 (in basso a sinistra) a 12+ (in basso a destra). */
function bandStart(i){return -135+i*67.5;}
function angleBand(a){return Math.max(0,Math.min(3,Math.floor((a+135)/67.5)));}
const MARK_BAND={0:0,3:1,6:2,12:3,13:3};
function syncDial(id){const dial=$(id),band=state[id],start=bandStart(band);dial.style.setProperty('--angle',(start+33.75)+'deg');dial.style.setProperty('--arc-from',(start-16)+'deg');dial.querySelectorAll('[data-age]').forEach(n=>{const a=Number(n.dataset.age),ends=[BANDS[band].from,BANDS[band].to??13];n.classList.toggle('selected',state.chosen&&ends.includes(a));});dial.classList.toggle('unchosen',!state.chosen);dial.setAttribute('aria-valuenow',band);dial.setAttribute('aria-valuetext',state.chosen?BANDS[band].label:'Tutte le età');}
let audioContext;
function tick(){try{const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return;audioContext??=new Audio();if(audioContext.state==='suspended')audioContext.resume();const osc=audioContext.createOscillator(),gain=audioContext.createGain(),t=audioContext.currentTime;osc.type='triangle';osc.frequency.setValueAtTime(1100,t);osc.frequency.exponentialRampToValueAtTime(180,t+.025);gain.gain.setValueAtTime(.075,t);gain.gain.exponentialRampToValueAtTime(.001,t+.03);osc.connect(gain);gain.connect(audioContext.destination);osc.start(t);osc.stop(t+.035);}catch{}}
let renderTimer,renderVersion=0,initialized=false;
function render(){
 syncDial('age1');document.querySelectorAll('[data-date]').forEach(b=>b.setAttribute('aria-pressed',state.days.has(b.dataset.date)));syncFilters();
 if(!initialized){initialized=true;renderNow();return;}
 clearTimeout(renderTimer);const version=++renderVersion;
 renderTimer=setTimeout(async()=>{
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const oldNodes=[...$('events').children],nextIds=new Set(results().map(e=>e.id)),rects=new Map(oldNodes.map(n=>[n.dataset.key,n.getBoundingClientRect()]));
 const exits=oldNodes.filter(n=>!nextIds.has(n.dataset.key));
 if(!reduce)await Promise.all(exits.map(n=>n.animate([{opacity:1,transform:'scale(1)'},{opacity:0,transform:'scale(.85)'}],{duration:260,easing:'ease-in',fill:'forwards'}).finished.catch(()=>{})));
 if(version!==renderVersion){oldNodes.forEach(n=>n.getAnimations().forEach(a=>a.cancel()));return;}
 renderNow();
 if(!reduce)for(const n of $('events').children){const old=rects.get(n.dataset.key),now=n.getBoundingClientRect();n.animate(old?[{transform:'translate('+ (old.left-now.left)+'px,'+(old.top-now.top)+'px)',opacity:1},{transform:'translate(0,0)',opacity:1}]:[{opacity:0,transform:'scale(.85)'},{opacity:1,transform:'scale(1)'}],{duration:480,easing:'cubic-bezier(.2,.7,.2,1)'});}
 },220);
}
function reset(){Object.assign(state,{age1:0,chosen:false,free:false,outside:false,weekly:false,cats:new Set()});state.days=new Set(visibleWeek);render();}
for(const id of ['age1']){const dial=$(id);let dragging=false;function bandAt(ev){if(ev.target.dataset.age!==undefined)return MARK_BAND[ev.target.dataset.age];const r=dial.getBoundingClientRect(),x=ev.clientX-r.left-r.width/2,y=ev.clientY-r.top-r.height/2;return angleBand(Math.atan2(x,-y)*180/Math.PI);}function choose(band){if(state[id]!==band||!state.chosen){state[id]=band;state.chosen=true;tick();render();}}dial.addEventListener('pointerdown',ev=>{if(ev.button!==0)return;const band=bandAt(ev);if(state.chosen&&band===state[id]){state.chosen=false;tick();render();return;}dragging=true;dial.setPointerCapture(ev.pointerId);choose(band);});dial.addEventListener('pointermove',ev=>{if(dragging)choose(bandAt(ev))});for(const type of ['pointerup','pointercancel','lostpointercapture'])dial.addEventListener(type,()=>dragging=false);dial.addEventListener('keydown',ev=>{const steps={ArrowRight:1,ArrowUp:1,ArrowLeft:-1,ArrowDown:-1,PageUp:1,PageDown:-1};if(ev.key==='Escape'&&state.chosen){state.chosen=false;tick();render();return;}if(!(ev.key in steps)&&!['Home','End'].includes(ev.key))return;ev.preventDefault();state[id]=ev.key==='Home'?0:ev.key==='End'?3:state.chosen?Math.max(0,Math.min(3,state[id]+steps[ev.key])):(steps[ev.key]>0?0:3);state.chosen=true;tick();render();});}
function refreshCalendar(){const next=weekDates(),changed=next[0]!==visibleWeek[0];if(changed){visibleWeek=next;state.days=new Set(next);}document.querySelectorAll('[data-date]').forEach((b,i)=>{const date=visibleWeek[i],d=new Date(date+'T12:00:00Z');b.dataset.date=date;b.classList.toggle('weekend',d.getUTCDay()===0||d.getUTCDay()===6);b.querySelector('span').textContent=d.toLocaleDateString('it-IT',{weekday:'short',timeZone:'UTC'}).replace('.','').toUpperCase();b.querySelector('b').textContent=d.getUTCDate();b.querySelector('small').textContent=d.toLocaleDateString('it-IT',{month:'short',timeZone:'UTC'});b.setAttribute('aria-label',d.toLocaleDateString('it-IT',{weekday:'long',day:'numeric',month:'long',timeZone:'UTC'}));});document.querySelector('.footnote').textContent='Torino e dintorni · '+visibleWeek[0].split('-').reverse().join('/')+' – '+visibleWeek[6].split('-').reverse().join('/')+' · Illustrazioni originali. Date di verifica e fonti nelle schede.';}
refreshCalendar();
document.querySelectorAll('[data-date]').forEach(b=>b.onclick=()=>{const d=b.dataset.date;if(state.days.has(d)){state.days.delete(d);if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){b.classList.remove('puff');void b.offsetWidth;b.classList.add('puff');setTimeout(()=>b.classList.remove('puff'),500);}}else{state.days.add(d);b.classList.remove('puff');}render();});for(const k of ['free','outside','weekly'])$(k).onclick=()=>{state[k]=!state[k];render()};$('reset').onclick=reset;$('close').onclick=()=>$('detail').close();$('detail').addEventListener('click',e=>{if(e.target===$('detail')){const r=$('detail').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$('detail').close();}});render();

{const panel=$('catPanel'),button=$('catButton');panel.innerHTML='<label class="cat-all"><input type="checkbox" value=""> Tutte le categorie</label>'+CATS.map(c=>'<label><input type="checkbox" value="'+c.id+'"> '+c.label+'</label>').join('');
 const open=v=>{panel.hidden=!v;button.setAttribute('aria-expanded',String(v));};
 button.onclick=()=>{open(panel.hidden);if(!panel.hidden)panel.querySelector('input').focus();};
 panel.addEventListener('change',ev=>{const v=ev.target.value;if(!v)state.cats.clear();else if(ev.target.checked)state.cats.add(v);else state.cats.delete(v);if(state.cats.size===CATS.length)state.cats.clear();render();});
 panel.addEventListener('keydown',ev=>{if(ev.key==='Escape'){open(false);button.focus();}});
 document.addEventListener('click',ev=>{if(!panel.hidden&&!ev.target.closest('.cat-wrap'))open(false);});
 syncFilters();}
function viewSignature(){return JSON.stringify({days:[...state.days],age:state.chosen?state.age1:null,free:state.free,outside:state.outside,weekly:state.weekly,cats:[...state.cats],events:results().map(e=>[e.id,e.occurrences.filter(d=>state.days.has(occurrenceDate(d))&&upcoming(d,e))])});}
function refreshView(){refreshCalendar();if(viewSignature()!==lastView){render();if($('detail').open){const id=$('detail').getAttribute('aria-labelledby')?.replace('dialog-title-','');const event=catalog.find(e=>e.id===id);if(!event||!results().includes(event)){$('detail').close();$('reset').focus();}else{$('detailContent').querySelector('.event-dates strong').innerHTML=dates(event).map(esc).join('<br>');}}}}
setInterval(()=>{if(document.visibilityState==='visible')refreshView();},60000);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')refreshView();});

// Mantiene il ciclo Tab nella scheda, anche con link o immagini non disponibili.
$('detail').addEventListener('keydown',event=>{
 if(event.key!=='Tab')return;
 const targets=[...$('detail').querySelectorAll('button,a[href],summary,[tabindex="0"]')].filter(n=>!n.disabled&&n.getClientRects().length&&(n.checkVisibility?n.checkVisibility():!n.closest('details:not([open])')||n.tagName==='SUMMARY'));
 const first=targets[0],last=targets.at(-1);
 if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
 else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
});


// Restituisce il focus anche se il timer ha ricreato il pulsante di apertura.
$('detail').addEventListener('close',()=>{const id=$('detail').getAttribute('aria-labelledby')?.replace('dialog-title-','');const card=[...$('events').querySelectorAll('[data-key]')].find(n=>n.dataset.key===id);(card?.querySelector('summary')||card||$('reset')).focus({preventScroll:true});});
