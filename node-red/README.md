# Node-RED README

## Node-RED

Si tratta di un tool di programmazione grafica basata su flussi. Grazie a un editor grafico browser la programmazione dei flussi risulta molto semplice e allo stesso tempo molto potente. Basato su Node.JS è possibilie utilizzare dei nodi funzione per eseguire funzioni personalizzabili scritte in javascript.
In oltre è possibile creare nodi personalizzati.


## Nodi aggiuntivi ai nodi di default

Alcuni nodi già predisposti gestiscono la lettura in tempo reale del database e il bot telegram. 

### node-red-contrib-cloud-firestore

Regola l'accesso al database dove si trova il comando. Ad ogni variazione di questo il nodo *Firestore in* lancia un flusso con un messaggio contente un oggetto json da cui con opportune manipolazioni attraverso un nodo funzione ottengo un oggetto idoneo per l'invio tramite modbus. Le manipolazioni permettono di individuare indirizzo e stato dei dispositivi, creando un oggetto json che viene dato in ingresso al nodo *SEModbusWrite*

### se-node-red-modbus

Questi nodi vengono utilizzati in due flussi, uno per la scrittura e uno per la lettura.

Il flusso di scrittura *multiEquipmentPLC* è scatenato da una variazione nel database e utilizza il nodo *SEModbusWrite* come spiegato sopra.

Il flusso di lettura *TelegramBot* invece utilizza il nodo *SEModbusRead* in un loop che salva gli stati dei dispositivi su delle variabili globali. Queste vengono poi utilizzate da dei nodi a parte per il bot Telegram.

### node-red-contrib-telegrambot

Il pacchetto di nodi telegram permette la ricezione di messaggi inviati al bot, la gestione di questi e l'invio di risposte idonee. Gli utenti devono essere abilitati nel nodo di configurazione *telegram bot*. A seconda dei comandi inviati è possibile personalizzare le risposte.

Nel caso del progetto il comando */status* seguito da il nome di un dispositivo (MOTOR1,VALVE5,...) restituisce lo stato 1 o 0. Altri comandi più generali(MOTORS,VALVES,ALL) restituiscono lo stato di gruppi di dispositivi.

Il nodo *Telegram recevier* ha lo scopo di rispondere a un messaggio inviato da un utente non autorizzato con la risposta di default "Utente non autorizzato". Il nodo */status* è un nodo *command* che gestisce i comandi successivi al comando */status* appunto tramite un'apposita funzione.

# Setup

Per utilizzare i flussi node-red implementati è necessario avere una versione di Node-Red installata e i tre pacchetti di nodi elencati in precedenza. Il pacchetto se-node-red-modbus non è presente nella Palette dei nodi di node-red e va installato manualmente. Le informazioni per fare ciò sono contenute nella cartella *nodi_se*.