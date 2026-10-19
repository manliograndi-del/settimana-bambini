# La settimana dei bambini

Calendario illustrato per famiglie a Torino e nell’area metropolitana.

Sito: https://manliograndi-del.github.io/settimana-bambini/

Leggere [AGENTS.md](AGENTS.md) e [docs/PROGETTO.md](docs/PROGETTO.md) prima di lavorare sul sito.

## Uso e dati

Oggi e i sei giorni successivi, nel fuso Europe/Rome. Filtri per giorni, fascia d’età sull’orologio (0–3, 3–6, 6–12, oltre 12; all’avvio tutte) e tre pulsanti sotto i giorni: Gratis, Fuori Torino e Ogni settimana, tutti spenti all’avvio. Con meno di dieci risultati compaiono righe espandibili; altrimenti tessere illustrate. Le schede contengono fonti, costi e date di verifica. Età o prezzi ignoti non vengono inventati.

catalog.json è la fonte strutturata; daily-catalog.js è generato. calendar.js contiene le regole temporali; playful.js e playful.css gestiscono l’interfaccia. I vecchi script non vengono più caricati.

Lo scorrimento quotidiano non verifica nuove attività, cancellazioni o disponibilità. La ricerca editoriale prevista è settimanale, con una riserva di tredici giorni. Un giorno privo di schede non prova l’assenza di eventi nel territorio.

## Verifiche e generazione

Richiesto Node.js 20 o successivo. Non occorre installare dipendenze per questi comandi:

```text
node scripts/build.cjs --check
node scripts/build.cjs
node scripts/test.cjs
```

La build valida dati, riferimenti, illustrazioni, duplicati e date, produce daily-catalog.js e aggiorna le versioni cache in modo deterministico. Stampa la copertura dei tredici giorni. **Non pubblica online e non sostituisce il controllo delle fonti.**

Aprire index.html in browser per una prova locale. Prima della pubblicazione verificare anche mobile, touch, tastiera, dialoghi, focus e movimento ridotto. GitHub Pages usa main e la cartella radice.

## Immagini e materiali

Le tessere usano illustrazioni originali WebP, con PNG originali conservati. Le repliche mantengono la stessa illustrazione. illustrationCell identifica una cella dei fogli storici 4×4; le immagini singole non hanno questo campo. illustrations.json conserva la provenienza delle immagini.

Le immagini ufficiali nelle schede richiedono fonte, credito e condizioni di riuso documentate. In caso di errore di caricamento si mostra l’illustrazione originale.

Note di ricerca, archivi di lavoro, PDF e piste non confermate rimangono nel workspace editoriale privato. Non pubblicare quel workspace integralmente.
