# Dialogflow README

## Dialogflow

### Concetti Base

- Agenti
Un agente è un modulo che contiente tutte le impostazioni e i dati di un progetto, più agenti sono affiancabili per la creazione di progetti complessi

- Intenti
Gli intenti categorizzano le intenzioni dell'utente espresse in linguaggio naturale (NLP, Natural Language Processing). Dialogflow abbina l'espressione in NLP dell'utente con l'intento corretto.
Vengono impostate delle frasi standard dette di Training dalle quali il machine learning di Dialogflow espande una lista di possibili frasi che scatenano l'intento.

- Entità 
Ogni paramentro di un'intento ha un tipo che in Dialogflow viene chiamato entità. Sono presenti delle entità di defaul (es. Date,Tempo,Colori,Indirizzi,..) ma è possibile creare delle entità personalizzate per ottente dei dati specifici.

- Fulfillment
Per ottentere risposte dinamiche da un intento si utilizzano i fulfillments. Quando abilitati per un intento questo chiama un servizio che deve essere definito. Dialogflow manda una richiesta webhook ad un webhook server e aspetta una risposta per restituire all'utente una risposta. 


### Setup

Nel progetto viene utilizzato un solo agente chiamato *multiEquipment*. Questo utilizza due intenti chiamati *setupMotor* e *setupValve*, i quali ripetono il comando chiesto in NLP dall'utente e aspettano una conferma come risposta. La conferma lancia un sottointento a seconda se è positiva o negativa.
Nel caso sia negativa il comando non viene mandato e si conclude l'intento, nel caso positivo invece viene lanciata una chiamata a una funzione la quale scrive un il comando sul database Firestore di Google Firebase. Il codice è visualizzabile sotto al menu Fulfillment sulla pagina di gestione dell'agente.


## Cloud Firestore

Si tratta di un servizio di Firebase, tool di sviluppo Google. Questo viene utilizzato nel progetto come tramite tra Dialogflow e un gateway che sta in ascolto delle modifiche del database. Questo gateway è indipendente da Firestore. 
Per ascoltare in tempo reale da Firestore rimando a questa documentazione https://cloud.google.com/firestore/docs/query-data/listen?hl=it .
Nel progetto viene utilizzato node-red data la sua immediatezza di utilizzo, la grande quantità di librerie pacchetti di nodi) già scritte e poiché implementato nelle IIoT box vendute da Schneider.

