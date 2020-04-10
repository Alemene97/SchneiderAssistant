# Node-Red Schneider Electric

Documentazione ufficiale: http://wain05400.apa.gad.schneider-electric.com:81/wiki/index.php/Main_Page

Procedura di installazione per Node-Red server con interfaccia Schneider e modulo di interfacciamento Modbus read/write.

- Installazione Node-Red Schneider
- Installazione nodi modbus


### 1 Installazione Node-Red Schneider

##### Prerequisiti

- Versione supportata di Node.js (https://nodered.org/docs/faq/node-versions) 

##### 1.1 Installazione

1. Eseguire il comando "npm install -g node-red" sul prompt dei comandi (la rete Schneider potrebbe non permetterne l'installazione)
2. Verificare l'installazione lanciando il comando "node-red" sul prompt dei comandi e accedendo al server tramite browser segnalato in output dal comando

##### 1.2 Personalizzazione header Schneider Electric 

Modifica del registro di npm per accedere ai moduli Schneider Electric, questi sono accessibili solamente se connessi con la rete Schneider e non tramite reti esterne.

1. Eseguire il comando "npm set registry http://wain05322.apa.gad.schneider-electric.com:4873" sul Prompt dei comandi
2. Entrare nella directory di node-red con il comando "cd .node-red"
3. Installare il pacchetto di personalizzazione dell'interfaccia con il comando "npm install se-node-red-builtime"



### 2 Installazione nodi modbus

L'installazione online prevista nella documentazione non è attualmente funzionante. E' possibile procedere al download del pacchetto e all'installazione manuale.

Link Download se-node-re-modbus: https://schneider-electric.box.com/s/fnvjwdd5ejqgv6vpvp3ppyh0a9oowm7e

1. Eseguire l' unzip dell' eseguibile scaricato
2. Lanciare il file install.bat (se il prompt dei comandi si chiude senza visualizzare un output lanciarlo tramire prompt dei comandi)

Se l'output segnalato è "ENOENT: no such file or directory" leggere nei dettagli successivi la versione vXX nella path richiesta dallo script (...\windows-vXX).
Si può tentare di risolvere il problema rinominando la cartella dove lo script tenta di recuperare il nodo da installare.

1. Entrare nella cartella estratta dall zip in precedenza
2. Entrare nella cartella "modbus"
3. Rinominare la cartella "windows-v10" con la versione richiesta dall script (windows-vXX, esempio "windows-v12")
4. Rilanciare lo script




