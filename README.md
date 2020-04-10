# SchneiderAssistant

Sviluppo comandi vocali Assistente Google per controllare un'impianto di automazione aziendale

16 dispositivi con 2 stati (ON-OFF) [MOTOR1-8 , VALVE 1-8]

## DialogFlow

###Info
Tool di sviluppo Google per creare progetti con il fine di interpretare una frase in linguaggio naturare da cui estrapolare dati numerici o testuali specifici.
Interprete linguaggio naturale utilizzato da Google Assistant, svincolabile da Google Assistant per eventuali soluzioni ad hoc. 

Tramite opportune entità e intenti vengono estrapolate informazioni riguardo al tipo di dispositivo, il numero di dispositivo e lo stato su cui impostarlo.


## Firestore Cloud

###Info
Funzione del tool Firebase di Google. Semplice database in licenza gratuita limitata.
Utilizzato come tramite da DialogFlow e Node-Red. Tramite che potrebbe essere eliminato in un futuro per far comunicare direttamente Node-RED a dialoflow.

Tramite funzioni specifiche ad hoc su Dialogflow viene di volta in volta aggiornata una tabella contentende tipo di dispositivo, numero di dispositivo e stato. Dati che assieme identificano un comando da passare a Node-RED

## Node-Red

###Info
Tramite nodi già sviluppati (pacchetto: node-red-contrib-cloud-firestore) Node-RED ascolta le variazioni di dati nel database e al verificarsi di questi eventi lancia un flusso

### Modbus
Il flusso gestisce il comando e genera un messaggio in formato json dalle informazioni lette sul database. Questo specifica l'indirizzo idoneo su cui scrivere lo stato del dispositivo. Tramite il nodo SEModbusWrite ( pacchetto: se-node-red-modbus) questo viene passato tramite protocollo modbus a Control-Expert

### Telegram
Tramite un nodo SEModbusRead Node-Red legge gli stati dei dispositivi e li passa ai nodi per la gestione di bot Telegram (pacchetto: node-red-contrib-telegrambot)


