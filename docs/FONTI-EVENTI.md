# Fonti degli eventi per bambini

Aggiornato: **1 novembre 2026**. È l'elenco unico di tutti i posti dove cerchiamo gli eventi per bambini e famiglie della Città metropolitana di Torino, con le regole per cercare e per aggiungere fonti nuove.

## In breve

- **Eventi pubblicati finora:** 199 (dal 18 ottobre al 30 novembre 2026; 93 sono ancora da venire). Altri 4 sono stati ritirati.
- **Organizzatori da cui abbiamo preso almeno un evento:** 66.
- **Fonti in tutto nel registro:** 128 (14 aggregatori, 70 fonti attive, 44 fonti tranquille), più 1 PDF mensile e 1 newsletter.
- **La fonte che dà più eventi:** le Biblioteche civiche torinesi (40 eventi), lette soprattutto dal loro PDF mensile.
- **TorinoBimbi** ci ha fatto scoprire 23 eventi, ma serve solo per scoprire: il link sul sito porta sempre all'organizzatore.

**Come si leggono i numeri.** «Eventi presi» = eventi pubblicati sul sito con quella fonte come organizzatore (dal 18 ottobre a oggi, compresi quelli già passati). Per gli aggregatori il numero dice invece quanti eventi abbiamo **scoperto** lì e poi confermato sul sito dell'organizzatore. Un evento con più date conta una volta. Le fonti con 0 sono quelle che leggiamo ma che finora non hanno dato eventi nel periodo cercato.

## 1. Le regole per cercare ogni volta

1. **Zona:** solo Città metropolitana di Torino. **Età:** bambini 0–12 anni e famiglie.
2. **Gli aggregatori servono solo a scoprire.** Prima di pubblicare si apre la **pagina dell'organizzatore** (o la sua biglietteria ufficiale) e si prendono da lì data, ora, luogo, prezzo, età e prenotazione.
3. **Il link sul sito porta sempre all'organizzatore**, mai a TorinoBimbi (decisione di Manlio del 31/10/2026).
4. **Non inventare nulla:** se un dato non c'è, si lascia vuoto e si scrive perché.
5. **Sì:** spettacoli, letture, laboratori, visite per famiglie con data e ora, feste, eventi «per tutta la famiglia», attività genitore + neonato in cui partecipa il bambino (es. «Io e papà», «Primi passi»).
6. **No:** corsi a più incontri, attività riservate alle scuole, incontri solo per adulti, attività sempre aperte senza data (escape room, museo aperto), eventi già finiti, eventi fuori zona.
7. **Riserva per i siti bloccati:** se il sito dell'organizzatore non si apre (biblioteche civiche, Comune di Torino) si può usare la scheda TorinoBimbi scrivendo nella nota «sito organizzatore bloccato, dati da TorinoBimbi»; al giro dopo si riprova l'organizzatore e si corregge il link. Se non c'è nessuna pagina dell'organizzatore, l'evento resta fuori.
8. **Risparmio:** al massimo **una** ricerca Google per fonte; un sito che non si apre si riprova **una sola volta**, poi si va avanti. Per le fonti tranquille si legge solo la pagina eventi. Niente pagine d'archivio.
9. **Descrizioni** in 2–3 frasi di italiano semplice, scritte con parole nostre (non copiate).
10. **Pubblicazione:** gli eventi vanno in linea senza aspettare Manlio (sua decisione del 21/10/2026): PR, build, test, unione, poi una riga a Manlio su cosa è comparso.

### Quando si legge cosa

| Giro | Quando | Cosa si legge |
|---|---|---|
| Aggiornamento completo | Lunedì 07:57 (ora sospeso per il costo) | Tutti gli aggregatori, tutte le fonti **attive**, le fonti **tranquille** del turno della settimana (turno A nelle settimane pari, B nelle dispari), i festival solo se le date cadono nei 14 giorni. Periodo: settimana corrente + successiva. |
| Controllo del weekend | Giovedì 07:51 | Solo gli aggregatori: programmi del weekend, «Tutta la famiglia» e pagine per età di TorinoBimbi. |
| Controllo leggero | Martedì, mercoledì, venerdì 07:47 | Solo gli aggregatori; se non c'è niente di nuovo, nessun messaggio. |
| Agenda delle biblioteche | Fine di ogni mese | PDF «In Biblioteca» del mese dopo (o newsletter in Gmail). |

## 2. Le regole per salvare fonti nuove

1. **Ogni organizzatore nuovo** trovato su un aggregatore va aggiunto al registro (`registro-fonti.json`) come fonte **attiva**, con l'indirizzo della sua pagina eventi, così dal giro dopo si legge direttamente lui.
2. Per ogni fonte si scrive nel registro: nome, categoria, indirizzo della pagina eventi giusta (non la home se c'è un calendario), una **nota per chi cerca** (dove guardare, cosa evitare, se il sito è difficile) e la data di aggiunta.
3. **Dopo ogni giro del lunedì** si aggiorna il registro:
   - una fonte che ha dato eventi diventa **attiva** e prende la data di oggi come «ultimo evento»;
   - una fonte attiva **senza eventi da 4 settimane** diventa **tranquilla**, nel turno (A o B) che ha meno fonti.
4. Se un sito non si legge (bloccato, vuoto, solo Facebook, calendario Google incorporato) lo si scrive nella nota, con la data e l'alternativa (biglietteria, newsletter, PDF).
5. **Fonti proposte da Manlio** (es. il suo documento «Aggregatore Eventi Bambini Torino» del 12/10/2026) si provano una volta: se danno eventi entrano come attive, altrimenti come tranquille, o tra le scartate con il motivo.
6. **Ricerche che fanno nascere fonti nuove:** ogni file di ricerca profonda che Manlio manda va copiato anche nella sua cartella Documenti > Ricerche profonde.
7. Ogni volta che il registro cambia molto, si aggiorna anche **questo file**.

## 3. PDF, newsletter e agende mensili

| Fonte | Dove si trova | Eventi presi | Come si legge |
|---|---|---:|---|
| **PDF «In Biblioteca – <mese>»** delle Biblioteche civiche torinesi | Link nella pagina [bct.comune.torino.it/agenda](https://bct.comune.torino.it/agenda) (novembre: `/sites/default/files/articoli/2026-10/In_Biblioteca_Novembre_2026.pdf`) | 23 nuovi + le date di novembre di altri 7 (contati sopra nelle Biblioteche civiche) | Esce a fine mese per il mese dopo. Sezioni da leggere: «Appuntamenti per bambini e ragazzi» e «Nutrirsi di cultura 0-6». Dal cloud il sito dà 503: si legge dal Chrome di Manlio (il PDF non ha testo copiabile: si decomprime nella pagina). Manlio vuole che il PDF di dicembre si faccia in automatico. |
| **Newsletter mensile delle Biblioteche civiche** | Gmail di Manlio, mittente `newsletterbiblioteche@comune.torino.it` (iscritto il 31/10/2026) | ancora 0 (la prima deve arrivare) | Si legge con il collegamento Gmail dai thread del progetto. Non è ancora provato che le routine automatiche riescano a leggere la Gmail. |
| **Programma Genitori&Figli del Gruppo Abele** | [PDF settembre–dicembre 2026](https://www.gruppoabele.org/documenti/schede/gef_settembre_2026_card.pdf) | 0 | Quasi tutti laboratori settimanali (esclusi); trovato un solo Family Lab. |
| **Programma Pagliacce Festival** | PDF sul sito [pagliacce.it](https://www.pagliacce.it/festival-pagliacce/) | 2 (contati nei festival) | Solo nei giorni del festival (ottobre). |
| **Programma ZOOM Halloween** | PDF su [eventi.zoomtorino.it](https://eventi.zoomtorino.it/halloween) | 1 (contato nei festival) | Solo nel periodo di Halloween. |
| **Nutrirsi di cultura 0-6** | [cultura0-6.it](https://www.cultura0-6.it/lora-del-racconto-2026/) | 3 eventi scoperti qui | Portale del progetto 0-6 anni (musei e biblioteche); gli eventi si confermano sulla pagina del museo o della biblioteca. |
| **Abbonamento Musei** | [abbonamentomusei.it](https://abbonamentomusei.it/) | 3 scoperti + 8 eventi della Pinacoteca Agnelli presi dalle sue schede | Schede ufficiali con date e orari; utili quando il sito del museo non si legge (Pinacoteca Agnelli). |

## 4. Aggregatori (solo per scoprire)

Su questi siti si **scopre** l'evento, poi lo si conferma sul sito dell'organizzatore. Non si mettono mai come link sul sito.

| Aggregatore | Pagine da leggere | Eventi scoperti qui | Note |
|---|---|---:|---|
| **TorinoBimbi** | [/tutta-la-famiglia](https://www.torinobimbi.it/tutta-la-famiglia), pagine per età [/0-3-anni](https://www.torinobimbi.it/0-3-anni), /3-6-anni, /6-10-anni, /sopra-i-10-anni, [/genitori](https://www.torinobimbi.it/genitori); [/weekend](https://www.torinobimbi.it/weekend) e [/agenda](https://www.torinobimbi.it/agenda) solo nei controlli brevi | 23 | Il più ricco. «Weekend» è solo un'etichetta, non tutto il fine settimana; «Agenda» mostra solo oggi (quasi tutti corsi). Le pagine /page/2 ripetono la prima. Da «Genitori» solo attività con il bambino presente. Solo per scoprire: link sempre all'organizzatore. |
| **Giovani Genitori** | [giovanigenitori.it](https://www.giovanigenitori.it/) | 7 | Box «Prossimi eventi» in home, senza link alle schede; molte voci sono a Milano. |
| **Viaggiapiccoli** | [viaggiapiccoli.com](https://www.viaggiapiccoli.com/eventi-bambini-torino-piemonte-ottobre/) (articolo del mese) | 5 | Articoli mensili «eventi bambini Torino e Piemonte». |
| **FamilyGO – Torino** | [familygo.eu](https://www.familygo.eu/vacanze-con-bambini/eventi/torino/torino-eventi-per-bambini/) | 5 | Elenco eventi Torino e articoli singoli. |
| **GuidaBimbi** | [guidabimbi.com/eventi](https://www.guidabimbi.com/eventi/) | 4 | Molte voci sono corsi, open day o fuori periodo. |
| **Torino Oggi** (giornale) | [torinoggi.it](https://www.torinoggi.it/) | 3 | La sezione eventi spesso è in errore; si legge la home. |
| **Il Mercoledì** (giornale) | [ilmercoledi.news](https://www.ilmercoledi.news/category/cultura-e-spettacoli/) | 1 | Pochi spunti; fonte tranquilla. |
| **Il Tacco di Bacco · ForKids** | [iltaccodibacco.it/torino/forkids](https://iltaccodibacco.it/torino/forkids/) e le pagine dei comuni vicini (/rivoli/forkids/, /settimo-torinese/, /nichelino/…) | 0 (2 spunti, già presenti) | Aggiunto il 20/10/2026. Usare «carica altri». |
| **GuidaTorino · Bambini** | [guidatorino.com/eventi/torino/bambini](https://www.guidatorino.com/eventi/torino/bambini) + articolo settimanale «Cosa fare a Torino questa settimana» | 0 (3 spunti, già presenti) | Aggiunto il 20/10/2026. Poche schede ma con data e luogo. |
| **Kid Pass** | [kidpass.it/eventi](https://kidpass.it/eventi/) | 0 | Finora nessun evento nella zona. |
| **Comune di Torino – Eventi** | [comune.torino.it/vivere-comune/eventi](https://www.comune.torino.it/vivere-comune/eventi) (filtri Famiglia/Minore) ed [eventi.comune.torino.it](https://eventi.comune.torino.it/) | 0 | Quasi solo eventi per adulti. Dal cloud dà 503. |

## 5. Organizzatori (fonti originali)

Qui si conferma ogni evento. **Attiva** = si legge a ogni giro del lunedì. **Tranquilla (turno A/B)** = si legge a settimane alterne. «Non nel registro» = organizzatore trovato una volta tramite un altro sito: va aggiunto al registro se torna.

### Biblioteche e librerie (69 eventi)

| Fonte | Sito | Eventi presi | Come la leggiamo | Note per chi cerca |
|---|---|---:|---|---|
| Biblioteche civiche torinesi (Comune di Torino) | [bct.comune.torino.it](https://bct.comune.torino.it/eventi-attivita?cerca=&sede=&dal=&al=&target=96&tipologia=All) | 40 | attiva (anche agenda del Comune) | Fonte originale per letture e laboratori. Dal cloud risponde 503: si apre dal Chrome di Manlio. Si legge soprattutto dal PDF mensile «In Biblioteca» e dalla newsletter (vedi sezione 3). |
| Biblioteca Archimede (Settimo Torinese) | [bibliotecarchimede.it](https://www.bibliotecarchimede.it/news-eventi/) | 8 | attiva | News/Eventi della Biblioteca Archimede; scheda del torneo 24 ottobre letta. |
| Binaria (libreria del Gruppo Abele) | [binariagruppoabele.org](https://www.binariagruppoabele.org/eventi/) | 7 | attiva | Calendario Binaria e schede individuali; distinguere Torino e Rivalta e leggere tutte le date nel testo. |
| Comune di Chivasso: biblioteca e rassegna «Vitamina C… come Cultura» | [comune.chivasso.to.it](https://www.comune.chivasso.to.it/it/eventi/64428/vitamina-c-come-cultura-a-verrua-savoia-2513866-2513868-2513869-2513871) | 4 | attiva | Comune di Chivasso: Biblioteca Civica e comunicati; non confondere attività per adulti e bambini. |
| Biblioteca civica Arduino / Comune di Moncalieri | [comune.moncalieri.to.it](https://www.comune.moncalieri.to.it/) | 3 | attiva | Comune di Moncalieri: schede dei Martedì dei ragazzi e sezione Eventi; Biblioteca Arduino. |
| Biblioteca di Avigliana | [avigliananotizie.it](https://avigliananotizie.it/ottobre-in-biblioteca/) | 3 | attiva | Ottobre in biblioteca: programma di Avigliana, controllare singole date e destinatari. |
| Libreria Therese | [libreriatherese.it](https://libreriatherese.it/) | 2 | attiva | Therese: Sono solo storie e iscrizioni ai laboratori bambini. |
| Biblioteca Barbara Allason (Pecetto Torinese) | [comune.pecetto.to.it](https://www.comune.pecetto.to.it/) | 1 | attiva | Biblioteca comunale Barbara Allason, Pecetto Torinese: letture per bambini (31/10 e 7/11 viste su TorinoBimbi, non confermate sul sito). |
| Biblioteca Tancredi Milone (Venaria Reale) | [bibliotecavenariareale.it](https://www.bibliotecavenariareale.it/category/eventi/) | 1 | attiva | Biblioteca Tancredi Milone: Eventi/News e singole schede; selezionare fascia d'età. |
| Biblioteca G. E. Mottini · Comune di Caluso | [comune.caluso.to.it](https://comune.caluso.to.it/novita/laboratori-per-bambini-in-biblioteca-2/) | 0 | tranquilla (turno B) | Comune di Caluso: leggere anche Novità/Avvisi, programma e allegati. |
| Libreria Capitan Tomìn, via Casalis 44/B, Torino | [libreriacapitantomin.it](https://www.libreriacapitantomin.it/) | 0 | attiva | Libreria Capitan Tomìn, via Casalis 44/B, Torino: incontri e letture per bambini. |
| Trebisonda | — | 0 | tranquilla (turno B) | Trebisonda: Eventi e 3BISBimbi; distinguere corsi e incontri per adulti. |

### Teatro, circo e musica (29 eventi)

| Fonte | Sito | Eventi presi | Come la leggiamo | Note per chi cerca |
|---|---|---:|---|---|
| Casa del Teatro Ragazzi e Giovani (anche «Gioca alla fiaba») | [casateatroragazzi.it](https://casateatroragazzi.it/) | 7 | attiva | Casa del Teatro: programma famiglie, scheda e biglietteria della replica; scuola primaria è un canale diverso. [31/10/2026: la home arriva VUOTA al lettore automatico; anche fondazionetrg.it. |
| MagdaClan Circo (Bunker) | [magdaclan.com](https://www.magdaclan.com/) | 5 | attiva | Tendone al Bunker, via Paganini. Spettacoli di circo anche per famiglie. Il sito arriva vuoto al lettore automatico (31/10/2026): usare la biglietteria diyticket.it (cercare MagdaClan). Aggiunta 31/10/2026. |
| Casa Gianduja (Marionette Grilli) | [marionettegrilli.it](https://marionettegrilli.it/) | 3 | attiva | Casa Gianduja: programma del museo-teatro e singoli spettacoli. |
| Unione Musicale | [unionemusicale.it](https://unionemusicale.it/) | 3 | attiva | Unione Musicale: programma Kids e singola scheda; Teatro Vittoria è una sede, non un secondo calendario. |
| Fondazione Tancredi di Barolo – MUSLI | [fondazionetancredidibarolo.com](https://www.fondazionetancredidibarolo.com/project/eventi_ottobre-2026/) | 2 | non nel registro |  |
| Casa BIT | [casa-bit.it](https://www.casa-bit.it/10-rassegna-del-piccolo-teatro-di-casa-bit/) | 1 | tranquilla (turno A) | Casa BIT: rassegna del piccolo teatro; separare corsi e spettacoli. |
| CPG Strada delle Cacce (spettacoli dei Ghiss Bross) | [cpgtorino.it](https://www.cpgtorino.it/calendario/) | 1 | tranquilla (turno A) | CPG Strada delle Cacce: calendario; selezione dei singoli spettacoli per famiglie, non tutta la musica serale. |
| FLIC Scuola di Circo + Accademia dei Folli | [flicscuolacirco.it](https://flicscuolacirco.it/calendario-stagione-spettacoli-2026-2027/) | 1 | attiva | FLIC: calendario stagione spettacoli 2026-2027; Oscillante 2025 rimane archivio. |
| La Bottega Teatrale | [labottegateatrale.it](https://www.labottegateatrale.it/calendario-spettacoli-le-figure-dellinverno-2026-2027.html) | 1 | tranquilla (turno A) | La Bottega Teatrale: calendario Le figure dell'inverno 2026-2027. |
| Lingotto Musica ETS | [eventbrite.it](https://www.eventbrite.it/e/lorchestra-silenziosa-delle-piante-sotto-lo-stesso-cielo-festival-tickets-2000007247516/) | 1 | non nel registro |  |
| Polo del ’900 | [polodel900.it](https://polodel900.it/) | 1 | non nel registro |  |
| S.T.A.R. – Storie Territori Arte Relazioni | [valdistorie.it](https://www.valdistorie.it) | 1 | attiva | Serate di racconti per bambini (es. «Voci») allo Spazio Pro – Teatro Provvidenza, Torino. Aggiunta 21/10/2026: trovata su TorinoBimbi (Tutta la famiglia/Genitori), mai letta prima. |
| Teatro Civico Garybaldi / Comune di Settimo | [comune.settimo-torinese.to.it](https://www.comune.settimo-torinese.to.it/) | 1 | tranquilla (turno A) | Comune di Settimo: sezione Eventi e schede del Garybaldi. |
| Teatro della Concordia (Venaria) | [teatrodellaconcordia.it](https://www.teatrodellaconcordia.it/programma-prossimi-eventi/) | 1 | attiva | Concordia: usare stagione 2026-2027; diverse schede dei registri precedenti sono già concluse. |
| Casa Fools | [casafools.it](https://www.casafools.it/domeniche-spettacolari/) | 0 | tranquilla (turno B) | Casa Fools: Domeniche spettacolari; non riusare automaticamente date del festival passato. |
| Gravity The Show | [gravityshow.it](https://gravityshow.it/) | 0 | tranquilla (turno A) | Gravity: tappa locale e singole repliche in biglietteria; serie temporanea. |
| Mulino ad Arte | — | 0 | tranquilla (turno A) | Mulino ad Arte: stagioni 2026-2027 e biglietterie; controllare comune, escludendo Bene Vagienna dal perimetro locale. |
| Teatro Cardinal Massaia | [teatrocardinalmassaia.com](https://teatrocardinalmassaia.com/stagione/) | 0 | tranquilla (turno B) | Teatro Cardinal Massaia: recuperato dominio .com, sezione Stagione; controllare destinatari dei singoli spettacoli. |
| Teatro Regio | [teatroregio.torino.it](https://www.teatroregio.torino.it/calendario) | 0 | tranquilla (turno B) | Teatro Regio: In famiglia e calendario corrente; non usare la vecchia pagina Tutti dal Barbiere 2023. |

### Musei, scienza e arte (57 eventi)

| Fonte | Sito | Eventi presi | Come la leggiamo | Note per chi cerca |
|---|---|---:|---|---|
| Pinacoteca Agnelli (date lette su Abbonamento Musei) | [abbonamentomusei.it](https://abbonamentomusei.it/en/evento/piccole-domeniche-3/) | 10 | attiva, tranquilla (turno B) | Pinacoteca Agnelli: schede famiglie, tutte le date e immagini delle anteprime. |
| OGR Torino | [ogrtorino.it](https://ogrtorino.it/calendar) | 9 | attiva | OGR: calendario Education/Kids4Future e schede; conferma di prenotazione distinta dall'etichetta in elenco. |
| MU-CH – Museo della Chimica | [mu-ch.it](https://www.mu-ch.it/) | 7 | attiva | MU-CH: programmazione, pagina della singola replica e biglietteria; niente date dedotte da pagine del 17 ottobre. |
| GAM Torino (prenotazioni CoopCulture) | [gamtorino.it](https://www.gamtorino.it/it/education/famiglie-1) | 4 | attiva | GAM: Dipartimento Educazione/Famiglie rinvia a CoopCulture per calendario e prenotazione; recuperato percorso attuale, vecchia biglietteria in errore. |
| Fondazione Cosso – Castello di Miradolo | [fondazionecosso.com](https://www.fondazionecosso.com/) | 3 | tranquilla (turno B) | Fondazione Cosso: eventi e Domenica dei piccoli al Castello di Miradolo. |
| La Venaria Reale | [lavenaria.it](https://lavenaria.it/evento/festa-della-nascita/) | 3 | non nel registro |  |
| Museo Regionale di Scienze Naturali | [mrsntorino.it](https://mrsntorino.it/) | 3 | attiva | MRSN: calendario e schede; foto di bambini non conferma età o destinazione familiare. |
| MAcA – Museo A come Ambiente | [acomeambiente.org](https://www.acomeambiente.org/blog/category/eventi/) | 2 | attiva | MAcA: Eventi e singoli laboratori; Mostruosamente sostenibili confermato il 24 ottobre 2026. |
| MAUTO | [museoauto.com](https://www.museoauto.com/) | 2 | attiva | MAUTO: schede eventi; leggere tutte le repliche nel testo, biglietti del laboratorio distinti dall'ingresso al museo. |
| Munlab – Ecomuseo dell’argilla (Cambiano) | [munlabtorino.it](https://www.munlabtorino.it/eventi-2026/) | 2 | attiva | Munlab: usare Eventi 2026; la pagina generica dei laboratori contiene ricorrenze senza anno sufficiente. |
| Musei Reali | [museireali.beniculturali.it](https://museireali.beniculturali.it/events/calendario-settembre-dicembre-2026/) | 2 | attiva | Musei Reali: Educazione/Famiglie e iniziative in programma; aprire il dettaglio. |
| Associazione Ar.c.A. Almese (Valle di Susa Tesori) | [vallesusa-tesori.it](https://www.vallesusa-tesori.it/) | 1 | non nel registro |  |
| Castello di Rivoli | [castellodirivoli.org](https://www.castellodirivoli.org/articolo/famiglie-nuovi-appuntamenti-sabato-al-museo/) | 1 | attiva | Castello di Rivoli: programma famiglie, dettagli e prenotazione del laboratorio. |
| Fondazione Tancredi di Barolo – MUSLI con Museo del Risparmio | [fondazionetancredidibarolo.com](https://www.fondazionetancredidibarolo.com/project/eventi_ottobre-2026/) | 1 | non nel registro |  |
| Infini.To – Planetario (Pino Torinese) | [planetarioditorino.it](https://planetarioditorino.it/home/bambini-laboratori-spettacoli-exhibit/lo-spazio-ai-bambini) | 1 | attiva | Pino Torinese. «Lo Spazio ai bambini»: planetario + laboratorio nei weekend. Aggiunta 31/10/2026 (prima trovata su TorinoBimbi). Sito leggibile. |
| MAO – Museo d’Arte Orientale | [maotorino.it](https://maotorino.it/) | 1 | attiva | MAO: schede attività famiglie; controllare programma e prenotazione. |
| Museo Accorsi-Ometto | [fondazioneaccorsi-ometto.it](https://www.fondazioneaccorsi-ometto.it) | 1 | attiva | Via Po 55, Torino. Attività per bambini con data (es. Giallo al museo, Halloween). Info info@fondazioneaccorsi-ometto.it. Aggiunta 21/10/2026: trovata su TorinoBimbi (Tutta la famiglia/Genitori), mai letta prima. |
| Museo della Preistoria di Vaie | [museopreistoriavaie.it](https://www.museopreistoriavaie.it/aperti-tutte-le-domeniche-tra-bosco-e-museo/) | 1 | attiva | Museo di Vaie: notizie e aperture 2026; ricorrenze solo con periodo documentato. |
| Palazzina di Caccia di Stupinigi (Ordine Mauriziano) | [ordinemauriziano.it](https://www.ordinemauriziano.it/palazzina-stupinigi/eventi/una-giornata-con-la-regina/) | 1 | attiva | Stupinigi: sito Fondazione Ordine Mauriziano, Eventi e singole proposte famiglie. |
| PAV – Parco Arte Vivente | [parcoartevivente.it](https://parcoartevivente.it/pav-kids/) | 1 | tranquilla (turno B) | Calendario PAV Kids 2026 letto: 11 ottobre poi 8 novembre (domeniche 11-12:30, 4-10 anni, 7 € bambino + 4 € adulto). Letta anche la home e /attivita/weekend/. |
| Somewhere (tour per famiglie) | [somewhere.it](https://www.somewhere.it/) | 1 | attiva | Somewhere: tour guidati a pagamento per famiglie (Museo Egizio, Torino Magica) con calendario e posti liberi. |
| Museo del Risorgimento | — | 0 | tranquilla (turno B) | Museo del Risorgimento: eventi e visite per famiglie; servizi permanenti distinti dagli appuntamenti. |
| Museo Egizio | [museoegizio.it](https://museoegizio.it/esplora/visite/) | 0 | tranquilla (turno B) | Museo Egizio: Tour/Visite e Appuntamenti; Kids&Family è anche un progetto digitale, non confonderlo con le visite in presenza. |
| Museo Lavazza – laboratori famiglie | [ticketlandia.com](https://www.ticketlandia.com/m/event/laboratori-famiglie-museo-lavazza) | 0 | attiva | Laboratori per famiglie la domenica (anche 0-3 anni), via Bologna 32, Torino. Prenotazione su Ticketlandia. Aggiunta 21/10/2026: trovata su TorinoBimbi (Tutta la famiglia/Genitori), mai letta prima. |
| Museo Nazionale del Cinema | [museocinema.it](https://www.museocinema.it/it/visite-guidate) | 0 | tranquilla (turno B) | Museo del Cinema: calendario Attività per tutti e Famiglie; distinguere visite su richiesta. |
| Parco del Lago Pistono | [archeolagopistono.it](https://www.archeolagopistono.it/news/) | 0 | attiva | Parco del Lago Pistono: News e aperture del mese. Ottobre 2026 indica 11 e 25: nessuna replica dedotta per il 18. |

### Natura, parchi e fattorie (16 eventi)

| Fonte | Sito | Eventi presi | Come la leggiamo | Note per chi cerca |
|---|---|---:|---|---|
| Parchi Reali | [parchireali.it](https://www.parchireali.it/) | 7 | attiva | Parchi Reali: schede eventi e repliche nel testo, controllare comune e ritrovo. |
| Ecomuseo delle Miniere (Val Germanasca) | [ecomuseominiere.it](https://www.ecomuseominiere.it/orario-autunnale-visite-a-scopriminiera-e-scoprialpi/) | 3 | attiva | Ecomuseo delle Miniere: calendario e orario autunnale 2026; alcune visite richiedono almeno otto partecipanti. |
| Nel Bosco con Helix | [nelboscoconhelix.com](https://www.nelboscoconhelix.com/) | 3 | attiva | Helix: notizie ed escursioni per famiglie; Accademia è un percorso formativo da distinguere dalle uscite singole. |
| Arnica – Cascina Brero | [arnicatorino.it](https://www.arnicatorino.it/cascina-brero/) | 1 | attiva | Arnica/Cascina Brero: proposte attività e rinvio ai calendari dei parchi; evitare duplicati. |
| Giardino di Rosero (Pino Torinese) | [giardinodirosero.understory.io](https://giardinodirosero.understory.io) | 1 | attiva | Il Giardino di Rosero, Pino Torinese: Campo di Zucche (ottobre-1 novembre) con turni prenotabili. |
| Parco Avventura Tre Querce | [ticket.p3q.it](https://ticket.p3q.it/) | 1 | non nel registro |  |
| Camminare Lentamente (Chieri) | — | 0 | attiva | Feste e passeggiate per piccolissimi al Parco Tepice del Pellegrino, Chieri. Aggiunta 21/10/2026: trovata su TorinoBimbi (Tutta la famiglia/Genitori), mai letta prima. |
| Fattoria Sociale Paideia | — | 0 | tranquilla (turno B) | Fattoria Sociale Paideia: Eventi, distinta da Centro Paideia e festival. |
| Gran Paradiso | [pngp.it](https://www.pngp.it/iniziative) | 0 | tranquilla (turno B) | Gran Paradiso: iniziative del parco; controllare lato piemontese, età, difficoltà e iscrizione. Le pagine estive restano storiche. |
| Ludocascina La Ciliegia e il Gioanin | — | 0 | attiva | Valle San Pietro, Pecetto Torinese. Giornate in fattoria per famiglie. Contatto info@laciliegiaeilgioanin.it. Aggiunta 21/10/2026: trovata su TorinoBimbi (Tutta la famiglia/Genitori), mai letta prima. |

### Case del quartiere, ludoteche e famiglie (6 eventi)

| Fonte | Sito | Eventi presi | Come la leggiamo | Note per chi cerca |
|---|---|---:|---|---|
| Barrito (Casa del Quartiere) | [barrito.to.it](https://www.barrito.to.it/) | 4 | attiva | Programma mensile Sabati Giocondi; leggere ogni data e prenotazione. |
| Cascina Roccafranca | [cascinaroccafranca.it](https://www.cascinaroccafranca.it/30-10-halloween-in-piazza-livio-bianco-e-in-cascina/) | 1 | attiva | Cascina Roccafranca: eventi e proposte bambini; non includere corsi continuativi. |
| Spazio ZeroSei | [spaziozerosei.it](https://spaziozerosei.it/calendario-eventi/) | 1 | attiva, tranquilla (turno B) | Spazio ZeroSei: calendario eventi e schede; controllare prenotazioni e fasce in mesi. |
| Bagni di via Agliè | — | 0 | tranquilla (turno A) | Bagni di via Agliè: scheda della Rete con canali social ufficiali; agenda corrente non leggibile sul profilo della Rete, controllo sociale necessario a ogni giro. |
| Cartiera – Punto prestito e lettura | [cartiera.to.it](https://www.cartiera.to.it) | 0 | attiva | Via Fossano 8, Torino. Laboratori di cucina «L'officina del gusto» (sabati alterni), feste di Halloween e altre feste. Se il sito non ha il calendario, la scheda TorinoBimbi rimanda a info@cartiera.to.it. |
| Casa del Quartiere di San Salvario | [casadelquartiere.it](https://www.casadelquartiere.it/) | 0 | tranquilla (turno A) | Casa San Salvario: notizie ed eventi, distinguere corsi e gestori delle singole attività. |
| Casa nel Parco | [casanelparco.it](https://www.casanelparco.it/category/eventi/) | 0 | tranquilla (turno B) | Casa nel Parco: notizie e calendario, solo attività rivolte ai bambini. |
| Cecchi Point | [cecchipoint.it](https://www.cecchipoint.it/eventi/) | 0 | tranquilla (turno B) | Cecchi Point: Eventi e notizie, programma Pagliacce corrente; non duplicare la rassegna. |
| Centro per le Relazioni e le Famiglie (Comune di Torino) | — | 0 | attiva | Attività genitore + bambino con data (es. «Io e papà», Eduteca Agorà via Fossano 8). Solo quelle con il bambino presente; gli incontri solo per adulti sono esclusi. |
| La Leche League Torino | [lllitalia.org](https://www.lllitalia.org) | 0 | attiva | Incontri gratuiti di sostegno all'allattamento con i bimbi (es. Cascina Roccafranca). Vanno in Eventi come 0-1 anni solo se data e luogo sono confermati. |
| Le Serre di Grugliasco | — | 0 | tranquilla (turno A) | Le Serre di Grugliasco: calendario Eventi/News e organizzatore del singolo appuntamento. |
| Ludoteca Serendipity (Comune di Torino) | — | 0 | attiva | Corso Orbassano 264. «Primi passi per genitori e bebè» e altre attività genitore + bambino. Aggiunta 21/10/2026: trovata su TorinoBimbi (Tutta la famiglia/Genitori), mai letta prima. |
| Più SpazioQuattro | [piuspazioquattro.it](https://www.piuspazioquattro.it/famiglie-e-bambini/) | 0 | tranquilla (turno A) | Più SpazioQuattro: Famiglie e bambini e notizie; ora Casa diffusa, controllare la sede di ogni evento. |
| Officine CAOS (Vallette) | [officinecaos.net](https://www.officinecaos.net/) | 0 | tranquilla (turno B) | Officine CAOS/Vallette: attività e appuntamenti della Casa; distinguere corsi e pubblico generale. |

### Laboratori, sport e feste (8 eventi)

| Fonte | Sito | Eventi presi | Come la leggiamo | Note per chi cerca |
|---|---|---:|---|---|
| 45° Nord Entertainment Center | [45nord.com](https://www.45nord.com/) | 2 | non nel registro |  |
| Baby Gym Torino (Asd Ibis Sport) | [babygym-to.com](https://www.babygym-to.com/) | 2 | attiva | Via Vespucci 36, Torino. Oltre ai corsi fa feste a tema con data (es. Halloween 1/11): quelle sono eventi. Aggiunta 21/10/2026: trovata su TorinoBimbi (Tutta la famiglia/Genitori), mai letta prima. |
| Associazione Chicco di Grano | [chiccodigrano.it](https://chiccodigrano.it/) | 1 | attiva | Via Brissogne 39, Torino. Porte aperte e laboratori con data; i corsi continuativi sono esclusi. Aggiunta 21/10/2026: trovata su TorinoBimbi (Tutta la famiglia/Genitori), mai letta prima. |
| CH4 Sporting Club | [ch4sportingclub.it](https://ch4sportingclub.it/news/) | 1 | attiva | CH4 Sporting Club, via Trofarello 10, Torino: laboratori e feste per bambini nelle News. |
| Kids&Us con To Be Experience | [tobexperience.it](https://tobexperience.it/) | 1 | attiva | Kids&Us Torino Casale e Rivoli con To Be Experience (The Place, Green Pea): laboratori in inglese a tema. Trovato con TorinoBimbi il 26/10/2026. |
| Officine S | [officine-s.it](https://officine-s.it/) | 1 | attiva | Corso Mortara 24, Torino. Laboratori e pomeriggi di gioco gratuiti. Ha solo Facebook/Instagram: se non c'è una pagina ufficiale leggibile, segnalarlo. |
| A.C. Open Space / Oasi Dream Zone | [oasidreamzone.it](https://www.oasidreamzone.it) | 0 | attiva | Corso Savona 111, Moncalieri. Feste a tema per bambini (Halloween, Día de los muertos). Aggiunta 21/10/2026: trovata su TorinoBimbi (Tutta la famiglia/Genitori), mai letta prima. |
| Archimente (San Didero/Susa) | — | 0 | attiva | Archimente (San Didero/Susa): Circo in famiglia 8/11 visto su TorinoBimbi, pagina ufficiale non trovata. |
| Club Green Park, Rivoli | [clubgreenpark.it](https://www.clubgreenpark.it/) | 0 | attiva | Club Green Park, Rivoli: feste per bambini; la pagina di Halloween 2026 non indicava l’anno (escluso il 26/10). |
| Kreative Club, via Arvier, Torino | [kreativeclub.it](https://www.kreativeclub.it/) | 0 | attiva | Kreative Club, via Arvier, Torino: feste e laboratori con data. |
| La Mamma dei Biscotti | — | 0 | attiva | Laboratori di biscotti in più sedi (Binaria, Bunbury via Frinco 26). Contatto lamammadeibiscotti@gmail.com. Aggiunta 21/10/2026: trovata su TorinoBimbi (Tutta la famiglia/Genitori), mai letta prima. |

### Festival ed eventi di stagione (14 eventi)

| Fonte | Sito | Eventi presi | Come la leggiamo | Note per chi cerca |
|---|---|---:|---|---|
| Graphic Days | [graphicdays.it](https://www.graphicdays.it/2026/torino/graphicdays/visite-guidate-1200h-e-1600h/) | 6 | attiva | Graphic Days: programma della singola edizione, distinguere mostre e laboratori per bambini. |
| Oktoberfest – Luna Park della Pellerina | [oktoberfest.torino.it](https://oktoberfest.torino.it/il-luna-park) | 2 | attiva | Oktoberfest: pagina Luna Park; periodo 17 ottobre–1 novembre 2026; distinguere orari parco, ristorazione e spettacoli. |
| Pagliacce Festival | [pagliacce.it](https://www.pagliacce.it/festival-pagliacce/) | 2 | tranquilla (turno B) | Pagliacce: programma bambini 2026 in PDF; edizione 14-18 ottobre, poi archiviare le date. |
| Artissima Junior | [artissima.art](https://www.artissima.art/artissima-junior-2026/) | 1 | attiva | Artissima Junior durante la fiera Artissima (inizio novembre). Pagina con pochi dettagli. |
| Il Villaggio della Zucca | [ilvillaggiodellazucca.it](https://ilvillaggiodellazucca.it) | 1 | non nel registro |  |
| Paratissima Kids | [paratissima.it](https://www.paratissima.it/paratissima-kids-2026/) | 1 | attiva | Paratissima Kids: laboratori e visite per bambini durante Paratissima (fine ottobre-novembre). |
| ZOOM Torino (Cumiana) | [eventi.zoomtorino.it](https://eventi.zoomtorino.it/halloween) | 1 | attiva | ZOOM: pagina Halloween e programma PDF 2026; attività diurne e serali distinte, biglietteria da verificare. |
| Teatro a Pedali | [teatroapedali.it](https://www.teatroapedali.it/edizione-2026/) | 0 | tranquilla (turno A) | Teatro a Pedali: edizione 2026; verificare sede e periodo, non la vecchia edizione 2023. |

### Comuni, giornali locali e altro (0 eventi)

| Fonte | Sito | Eventi presi | Come la leggiamo | Note per chi cerca |
|---|---|---:|---|---|
| Comune di Borgaro Torinese | [comune.borgaro-torinese.to.it](https://www.comune.borgaro-torinese.to.it/notizia/grazie-doc-una-grande-festa-per-salutare-i-pediatri-che-hanno-accompagnato-generazioni-di-bambini/) | 0 | tranquilla (turno B) | Comune di Borgaro: notizie e avvisi. Grazie doc del 16 ottobre è concluso e non va riproposto. |
| Comune di Pont Canavese | — | 0 | tranquilla (turno B) | Comune di Pont Canavese: Eventi e avvisi; selezionare attività esplicitamente adatte ai bambini. |
| Comune di Rivoli | [comune.rivoli.to.it](https://www.comune.rivoli.to.it/Vivere-il-comune/Eventi) | 0 | tranquilla (turno A) | Comune di Rivoli: Eventi, calendario e Biblioteca Alda Merini. |
| Comune di Vinovo | — | 0 | tranquilla (turno A) | Comune di Vinovo: Eventi e avvisi; distinguere iniziative familiari e servizi amministrativi. |
| FaGioco Magico (ludoteca Vanchiglia, via Santa Giulia 12) | [fagiocomagico.it](https://www.fagiocomagico.it/calendario) | 0 | tranquilla (turno B) | Il calendario è un Google Calendar incorporato, non leggibile. Home: ultimo post giugno 2026 (Atelier ai Giardini Reali, ogni martedì da giugno); il resto sono corsi continuativi. Utile nel giro: poco, offerta soprattutto a corsi. |
| Gruppo Abele - Genitori&Figli | [gruppoabele.org](https://www.gruppoabele.org/documenti/schede/gef_settembre_2026_card.pdf) | 0 | attiva | Programma PDF settembre-dicembre 2026 letto. Trovato un Family Lab il 24/10; il resto sono laboratori ricorrenti settimanali (esclusi). |
| La Gang del Pensiero (libreria, corso Telesio 23, Torino) | [lagangdelpensiero.com](https://www.lagangdelpensiero.com/blog-5/) | 0 | tranquilla (turno A) | Blog fermo a settembre 2025; lagangdelpensiero.it e Facebook non leggibili (robots). Utile nel giro: no, non aggiornato online. |
| La Libreria dei Ragazzi (Torino, via Stampatori) | [libreriadeiragazzitorino.it](https://www.libreriadeiragazzitorino.it/) | 0 | tranquilla (turno B) | Il sito mostra solo novità librarie, nessuna sezione eventi. libreriadeiragazzi.it bloccato (robots). lalibreriadeiragazzi.it è un'altra libreria (Brescia), da non confondere. |
| Rete delle Case del Quartiere | [retecasedelquartiere.org](https://www.retecasedelquartiere.org/) | 0 | tranquilla (turno A) | Il sito della Rete non ha agenda; le singole Case (San Salvario, Casa nel Parco, Più SpazioQuattro, Cecchi Point, Officine CAOS, Roccafranca, Bagni via Agliè) sono già nel giro. Non approfondito. |
| Teatro di Caselette (RassegnaT / RassegnaT Family) | [teatrocaselette.it](https://teatrocaselette.it/torino-spettacoli-teatrali/) | 0 | tranquilla (turno A) | Calendario online fermo a RassegnaT 2026 (gennaio-aprile); unico titolo famiglie 'Tutti in Valigia' 29/03/2026. La dicitura 'RassegnaT Family' compare solo in un'edizione 2018 su eventiesagre. |
| Turismovest | [turismovest.it](https://www.turismovest.it/eventi) | 0 | tranquilla (turno A) | Turismovest: Eventi e schede di Rivoli; non limitare il sito al Villaggio natalizio. |
## 6. Siti difficili o bloccati

| Sito | Problema | Cosa fare |
|---|---|---|
| Biblioteche civiche torinesi (bct.comune.torino.it) e Comune di Torino (comune.torino.it) | Dal 23–24 ottobre 2026 rispondono **503** ai computer cloud; dal Chrome di Manlio si aprono bene | Riprovare una volta per giro; usare il PDF mensile e la newsletter; in ultima istanza la scheda TorinoBimbi con la nota. |
| Casa del Teatro Ragazzi (casateatroragazzi.it), fondazionetrg.it, magdaclan.com | Arrivano **vuote** al lettore automatico, nel browser si aprono | Per MagdaClan usare la biglietteria diyticket.it; per la Casa del Teatro la biglietteria o il riassunto della ricerca Google della stessa pagina. |
| Pinacoteca Agnelli | Sito fatto in JavaScript, schede vuote | Date dalle schede di Abbonamento Musei. |
| Spazio ZeroSei, FaGioco Magico | Calendario in JavaScript o Google Calendar incorporato | Spesso non confermabili: lasciare fuori se non c'è altra pagina. |
| Officine S, Bagni di via Agliè, Gang del Pensiero | Solo Facebook/Instagram, o sito fermo | I social non si leggono: segnalarlo e lasciare fuori se manca una pagina ufficiale. |
| Giornale La Voce, libreriadeiragazzi.it | Bloccati da robots.txt | Non leggibili. |
| TorinoSette (La Stampa) | A pagamento, solo immagini | Solo dal Chrome di Manlio e su sua richiesta. |

Regola generale: se la pagina dell'organizzatore non si apre, si può confermare con il riassunto della ricerca Google di **quella stessa pagina ufficiale** (data, ora, luogo); se non basta, l'evento resta fuori. Gli eventi già pubblicati restano.

## 7. Fonti provate e scartate

- **TorinoSette** (La Stampa): pochi eventi per bambini, quasi tutti già presenti, a pagamento. Non è fonte settimanale.
- **Mentelocale Torino**: quasi niente per bambini.
- **Giornali locali** La Valsusa, L'Eco del Chisone, Il Risveglio, Giornale La Voce: provati il 19/10/2026, niente per bambini o non leggibili. Restano nel registro come tranquilli.
- **Kid Pass**: nessun evento in zona finora (resta come aggregatore).

## 8. Dove stanno i file

- **Registro delle fonti** (quello che usano le ricerche e le routine): `/mnt/project-files/ricerca-settimanale/registro-fonti.json`.
- **Metodo e istruzioni**: `/mnt/project-files/ricerca-settimanale/METODO-SETTIMANALE.md` e `ISTRUZIONI-RICERCA.md`.
- **Esempio di giro economico** (31/10/2026, 3 lettori): `/mnt/project-files/ricerca-settimanale/2026-10-31/PROMPT-LETTORI.md`.
- **Eventi pubblicati**: `catalog.json` nel repository (campo `discoverySources` = dove l'evento è stato scoperto).
- **Archivio storico delle fonti** della ricerca precedente (309 voci, 42 percorsi prioritari): sul Google Drive di Manlio (REGISTRO-FONTI, fonti-operative.tsv). Il documento di Manlio con le sue fonti: «Aggregatore Eventi Bambini Torino» (12/10/2026).
- **Questo file**: `docs/FONTI-EVENTI.md` nel repository e `/mnt/project-files/fonti/FONTI-EVENTI.md`.
