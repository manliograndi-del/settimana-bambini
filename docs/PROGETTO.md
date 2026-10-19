# Architettura e stato del sito

Revisione tecnica: 18 ottobre 2026.

## File attivi

- index.html: struttura accessibile e caricamento dei tre script attivi.
- calendar.js: date Europe/Rome, finestra mobile, scadenze e conteggio copertura; condiviso con i controlli Node.
- catalog.json: eventi e organizzazioni. Ogni evento associa illustration ed eventualmente illustrationCell (0–15 per i fogli 4×4 storici).
- daily-catalog.js: catalogo autonomo generato; non dipende dai vecchi script.
- playful.js e playful.css: filtri, tessere, righe e dialoghi.
- scripts/catalog-tools.cjs, build.cjs e test.cjs: validazione, generazione riproducibile e controlli senza dipendenze esterne.

I vecchi app.js, data.js, verified.js, revision.js, details.js, remaining.js e style.css, non più caricati dall’interfaccia, sono stati rimossi il 19 ottobre 2026; restano recuperabili dalla cronologia git (ultimo commit che li contiene: ca4d90e). Non ricrearli per aggiungere eventi.

## Comportamento

Finestra oggi + sei giorni. I dati possono contenere tredici giorni di riserva. Le date passate sono nascoste; una sessione odierna con fine documentata scompare dopo la fine, altrimenti resta fino al giorno seguente. I controlli automatici verificano gli offset di Roma, compreso il cambio dell’ora.

Filtri per giorno, età e pulsanti sotto i giorni: Gratis (costBand free) e Fuori Torino (municipality diverso da Torino). Il pulsante «Tutte le categorie» fa comparire sotto quattro pulsanti a scelta multipla ricavati dal campo category: Storie e letture (Lettura), Laboratori e giochi (Laboratorio, Gioco e parchi, Sport, Associazioni e ludoteche), Spettacoli e feste (Teatro, Circo, Spettacoli, Cinema, Musica, Festa, Comuni) e Musei e natura (Museo, Musei e scienza, Natura); una nuova categoria va aggiunta a CATS in playful.js. Nessun secondo bambino attivo. L’orologio sceglie una fascia: 0–3, 3–6, 6–12 o oltre 12 anni (all’avvio tutte; un secondo tocco sulla stessa fascia o Esc tornano a tutte). Un’attività compare se la sua fascia in mesi si sovrappone a quella scelta. Età non dichiarate restano segnalate.

Sotto dieci risultati le schede diventano righe espandibili. Il controllo periodico non ricrea l’elenco se i risultati sono invariati; quando cambiano, conserva espansioni e focus dei risultati ancora presenti. Il dialogo usa il titolo dell’evento come nome accessibile. Gli stati vuoti distinguono assenza di giorni selezionati, filtri senza risultati e giornate non censite.

Le illustrazioni WebP sono derivate dagli originali PNG, conservati. Le foto ufficiali hanno un ripiego sull’illustrazione quando non sono disponibili. Nessuna nuova licenza o immagine ufficiale è implicita nell’ottimizzazione.

## Limiti editoriali

La revisione tecnica non è una verifica integrale degli eventi. Il 18 ottobre sono state ricontrollate le date di Pellerina e ZOOM e inserite repliche fino al 30 ottobre; la copertura resta poco diversificata. Le date verifiedAt restano distinte dai controlli parziali lastReview. Non confondere almeno un’attività al giorno con una ricerca completa.

Le ricerche e le piste sono gestite nel workspace privato. Il sito non scopre autonomamente eventi e non controlla in tempo reale cancellazioni o posti disponibili.

## Sviluppo e recupero

Clonare https://github.com/manliograndi-del/settimana-bambini in una cartella dedicata, creare un ramo di lavoro e controllare git status prima di modificare. Non inizializzare o pubblicare l’intero workspace editoriale.

Eseguire node scripts/build.cjs e node scripts/test.cjs, poi controllare in browser index.html o usare un server statico locale. Il report di build elenca attività disponibili e giorni mancanti sui tredici giorni; non è un controllo delle fonti. La build aggiorna le versioni cache in base al contenuto dei file.

Prima della pubblicazione recuperare lo stato remoto e confrontare le modifiche. In caso di regressione ripristinare i file del commit precedente in un nuovo commit, senza riscrivere la storia o sovrascrivere altri lavori. Baseline precedente al consolidamento: f4c500f039f038193f1bfcd87ee3376be3b43f51.
