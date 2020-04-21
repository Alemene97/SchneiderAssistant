# SchneiderAssistant

## Sviluppo comandi vocali Assistente Google per controllare un'impianto di automazione aziendale

Il progetto consiste nello sviluppo di un sistema che estenda il sistema di controllo di un impianto di automazione per consentire la gestione di specifiche situazioni tramite comandi vocali. 
Grazie ai servizi Google Cloud è possibile gestire le richieste fatte all' Assistente Google per generare una richiesta da gestire in loco al fine di comandare un impianto. I servizi in questione sono:
- [Actions Console] di Google, dove viene creato e gestito un progetto a livello superficiale. 
- [DialogFlow], toolkit di Google per creare le vere e proprie azioni che elaborano il linguaggio naturale ricevuto come input.
- [Firestore Cloud] all'interno di Firebase, grazie al quale è possibile collegare i sistemi tra Google Cloud e di interrogazione esterna, che fa da punto di appoggio per il comando.

L'interrogazione esterna serve a recuperare i dati ricavati dall'espressione in linguaggio naturale e gestirli in loco, dove risiede l'impianto. Questa, data la flessibilità di Google Cloud, si può ottenere in vari modi. Quello selezionato ha il vantaggio di essere implementabile in delle IoT Box affiancabili all'impianto SCADA in azienda:
- [Node-RED] è il tool implementabile su queste IoT box. Questo permette di programmare dei flussi a piacimento e prevede una ampia serie di librerie già predisposte che ne facilitano le implementazioni.

Il sistema in questione ha come punto centrale Node-RED, il quale comunica con l'impianto grazie a dei nodi di comunicazione appositi, restando in ascolto di variazioni sul database Firestore dove Dialogflow scrive i comandi interpretati dal linguaggio naturale ricevuto in ingresso. 

### Prototipo

Il progetto è stato sviluppato gradualmente attorno a un prototipo scaricabile da questa repository. Inizialmente dal controllo di un singolo dispositivo tramite un comando ON/OFF si è arrivati a una gestione di un sistema multidispositivo binario dove le variabili di comando riguardano [DEVICE], [NUMERO_DEVICE], [STATUS]. Il progetto in questione prevede infatti 16 dispositivi, 8 motori e 8 valvole, con 2 stati, acceso/spento per i motori e aperto/chiuso per le valvole, numerati da 1 a 8 ([VALVE1-VALVE8] e [MOTOR1-MOTOR8]).

## Actions Console

## DialogFlow

Si tratta, come già accennato, di un interprete linguaggio naturale utilizzato da Google Assistant, svincolabile da Google Assistant per eventuali soluzioni ad hoc. 

### Concetti Base

#### Agenti
- Agenti: Un agente è un modulo che contiente tutte le impostazioni e i dati di un progetto, più agenti sono affiancabili per la creazione di progetti complessi

#### Intenti
- Intenti: Gli intenti categorizzano le intenzioni dell'utente espresse in linguaggio naturale (NLP, Natural Language Processing). Dialogflow abbina l'espressione in NLP dell'utente con l'intento corretto. Vengono impostate delle frasi standard dette di Training dalle quali il machine learning di Dialogflow espande una lista di possibili frasi che scatenano l'intento.

#### Entità
- Entità: Ogni paramentro di un'intento ha un tipo che in Dialogflow viene chiamato entità. Sono presenti delle entità di defaul (es. Date,Tempo,Colori,Indirizzi,..) ma è possibile creare delle entità personalizzate per ottente dei dati specifici.

#### Fulfillment
- Fulfillment: Per ottentere risposte dinamiche da un intento si utilizzano i fulfillments. Quando abilitati per un intento questo chiama un servizio che deve essere definito. Dialogflow manda una richiesta webhook ad un webhook server e aspetta una risposta per restituire all'utente una risposta.


### Utilizzo nel prototipo

Nel progetto viene utilizzato un solo agente chiamato *multiEquipment*. Questo utilizza due intenti chiamati *setupMotor* e *setupValve*, i quali ripetono il comando chiesto in NLP dall'utente e aspettano una conferma come risposta. La conferma lancia un sottointento a seconda se è positiva o negativa.
Nel caso sia negativa il comando non viene mandato e si conclude l'intento, nel caso positivo invece viene lanciata una chiamata a una funzione la quale scrive un il comando sul database Firestore di Google Firebase. Il codice è visualizzabile sotto al menu Fulfillment sulla pagina di gestione dell'agente.

## Firestore Cloud

Si tratta di un servizio di Firebase, tool di sviluppo Google. Questo viene utilizzato nel progetto come tramite tra Dialogflow e un gateway che sta in ascolto delle modifiche del database. Questo gateway è indipendente da Firestore. 
Per ascoltare in tempo reale da Firestore rimando a questa documentazione https://cloud.google.com/firestore/docs/query-data/listen?hl=it .
Nel progetto viene utilizzato node-red data la sua immediatezza di utilizzo, la grande quantità di librerie pacchetti di nodi) già scritte e poiché implementato nelle IIoT box vendute da Schneider.

### Info
Funzione del tool Firebase di Google. Semplice database in licenza gratuita limitata.
Utilizzato come tramite da DialogFlow e Node-Red. Tramite che potrebbe essere eliminato in un futuro per far comunicare direttamente Node-RED a dialoflow.

Tramite funzioni specifiche ad hoc su Dialogflow viene di volta in volta aggiornata una tabella contentende tipo di dispositivo, numero di dispositivo e stato. Dati che assieme identificano un comando da passare a Node-RED

## Node-Red

### Info
Tramite nodi già sviluppati (pacchetto: node-red-contrib-cloud-firestore) Node-RED ascolta le variazioni di dati nel database e al verificarsi di questi eventi lancia un flusso

### Modbus
Il flusso gestisce il comando e genera un messaggio in formato json dalle informazioni lette sul database. Questo specifica l'indirizzo idoneo su cui scrivere lo stato del dispositivo. Tramite il nodo SEModbusWrite ( pacchetto: se-node-red-modbus) questo viene passato tramite protocollo modbus a Control-Expert

### Telegram
Tramite un nodo SEModbusRead Node-Red legge gli stati dei dispositivi e li passa ai nodi per la gestione di bot Telegram (pacchetto: node-red-contrib-telegrambot)


