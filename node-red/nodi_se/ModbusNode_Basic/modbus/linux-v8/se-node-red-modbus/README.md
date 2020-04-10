# se-node-red-modbus [![Build Status](http://tfshybridpa.dev.wonderware.com:8080/tfs/IandT/_apis/public/build/definitions/8e20306d-fbeb-479d-a69d-9eafe22fc57f/9/badge)]

> Modbus v1.1.96 Node-Red Custom Nodes for Read and Write using TCP and Serial

## Description

This Node Package consists of 2 Node-Red Nodes:
 1. SEModbusRead
 2. SEModbusWrite

#### SE Modbus Read

Connects to a Modbus Device(Serial/TCP) to Read one or multiple register values at specified interval.
Function codes currently supported includes:
 * FC 1: Read Coil Status
 * FC 2: Read Input Status
 * FC 3: Read Holding Registers
 * FC 4: Read Input Registers
   
  Below is input/output detail for read node.

 #### Input 
  * None
	 
 #### Output 
  *  Data array in case of register read. 
  *  Modbus error response in case of failure.
	
#### SE Modbus Write

Connects to a Modbus Device(Serial/TCP) to Write one or multiple register values when the input is received.
Function codes currently supported include:
  * FC 5: Write Single Coil
  * FC 6: Write Single Holding Register
  * FC 15: Write Multiple Coils
  * FC 16: Write Multiple Holding Registers
    
Below is input/output detail of node.
   
  #### Input 
  * A word array or byte array in case of multiple write registers.
  * A word or byte in case of single write register.

 #### Output 
  * Data in CMS format having TagName or Address as Key
  * Modbus error response in case of failure.
   
 ## Prerequisite   
  * A 64-bit machine. Windows or Linux.
  * Node.js version 6.x and above.
  * Node-red server.
  * Any latest web browser with V8 engine(Advisabe chrome and firefox).
   


 ## Windows
  1. Install Node.js stable version. It can be downloaded from below link.
  </br><a href="https://nodejs.org/en/" target="_blank"> https://nodejs.org/en/</a> 
  2. Run "npm install -g node-red" command on command prompt to install Node-RED.

### Installation
#### Prerequisite

1. Node.js and Python v2.7 should be installed(make sure you set environment variable for python27).

2. Run the Pre_modbus_install_cmd batch file as administrator (Only if you are in Schneider Electric Network)

Download from below link:
http://wain05400.apa.gad.schneider-electric.com:81/mediawiki/index.php/File:Pre_modbus_install_cmd.bat

Use the below command to install se-node-red-modbus package (make sure you set the npm registry to internal registry)

```sh
$ npm set registry http://wain05400.apa.gad.schneider-electric.com:4873
$ cd .node-red
$ npm install se-node-red-modbus
```
Imporatant Information
 * The online installation process sometimes may fail due to Schnedier proxy issue.
 * If you face this issue below is the offline installation as a workaround 

```sh
Automated Offline installation
• Download the ModbusNode.Zip file from the link provide by the NRF team
• https://schneider-electric.box.com/s/fnvjwdd5ejqgv6vpvp3ppyh0a9oowm7e
• Unzip the ModbusNode folder
• Windows 
        click on install.bat file
• Linux (open the terminal cd {file location} and run below command
        $ node install.js
```

### Uninstallation

If SEModbusRead and SEModbusWrite or slave node(Configured in SEModbusRead and SEModbusWrite) are present in node flow follow these steps to uninstall
 * Delete the nodes from the flow 
 * Delete slave node(Configured in SEModbusRead and SEModbusWrite) from configuration node option present in Node-RED server.
 * Run the below command to uninstall
 * After uninstallation restart the Node-RED server


 ```sh
 $ cd .node-red
 $ npm uninstall se-node-red-modbus
```        


## Linux
  1. Install Node.js software. Follow the procedure mentioned in the below link.  
  <a href="https://nodejs.org/en/download/package-manager/" target="_blank"> https://nodejs.org/en/download/package-manager/</a> 
  2. Run "sudo npm install -g node-red" command on Linux terminal to install Node-RED.    

### Installation

Use the below command to install se-node-red-modbus package (make sure you set the npm registry to internal registry)

```sh
$ npm set registry http://wain05400.apa.gad.schneider-electric.com:4873
$ cd $HOME/.node-red
$ npm install se-node-red-modbus
```

### Uninstallation
If SEModbusRead and SEModbusWrite or slave node(Configured in SEModbusRead and SEModbusWrite) are present in node flow follow these steps to uninstall
 * Delete the nodes from the flow 
 * Delete slave node(Configured in SEModbusRead and SEModbusWrite) from configuration node option present in Node-RED server.
 * Run the below command to uninstall
 * After uninstallation restart the Node-RED server

 ```sh
 $ cd $HOME/.node-red
 $ npm uninstall se-node-red-modbus
```

## Usage
#### SEModbusRead
1. Choose a function code (FC) from the dropdown menu.
2. Select the coil/input/register start address (0:65535) and the quantity of coils/inputs/registers to be read from the start address.
3. Configure the Modbus read register/registers polling rate.
3. Select the slave type (Serial/TCP).
4. If slave selected is serial configure slave ID, Baud Rate, Parity, stop bits and Modbus Type (RTU, RTU Buffered or ASCII) and for TCP configure the IP address.
5. Logging: Configuration parameter for Enable or Disable the logging. Logging is by default Enabled.
6. Level: Configuration parameter for selecting the logging level. There are three logging levels Info, Debug and Error. Its default value is Error.
	 
#### SEModbusWrite
1. Choose a function code (FC) from the dropdown menu.
2. Select the coil/input/register start address (0:65535), and the quantity of coils/inputs/registers to be written from the start           address.
3. Select the slave type (Serial/TCP).
4. If slave selected is serial configure slave ID, Baud Rate, Parity, stop bits and Modbus Type (RTU, RTU Buffered or ASCII) and for TCP configure the IP address.
5. Logging: Configuration parameter for Enable or Disable the logging. Logging is by default Enabled.
6. Level: Configuration parameter for selecting the logging level. There are three logging levels Info, Debug and Error. Its default value is Error.
 
## Dependencies

This module depends on the following modules:
* fs-extra
* modbus-serial
* serialport
* stampit
* stately.js
* winston


## Known Issues
  * Serial communication in linux OS

## Limitation

Maximum number of Read Registers
* Read Coil Status:2000
* Read Input Status: 2000
* Read Holding Register:125
* Read Input Registers:125

Maximum number of Write Registers
* Force Single Coil: 1
* Preset Single Register: 1
* Force Multiple Coils: 1968
* Preset Multiple Registers: 123
* Reading of floating type value is not supported.

## Additional Information.
* In server configuration TCP type C701, Telnet is not verified.
* This node will not support topological type of address configuration
* In case of Serial type server configuration adding two different servers with same COM port is not advisable, as it will initiate two different instances for same COM port which may cause Modbus node not to function properly.
* If Modbus node used for serial devices more than 1 time in the node red flow, It is recommended to use Queue delay of 100ms or more, as serial slave device may not respond for multiple request at a time.
* Log file is saved inside the log folder inside node folder of existing installed se-node-red-modbus node. Log file is saved with name    Modbus.log and Modbus1.log(Backup file).
* The log file size is fixed to 25mb. Once the 25mb limit is crossed a new log file is created and the previous file is preserved as backup. If this new file again reaches 25mb the existing backup file is first deleted and then the current file is preserved as backup and a new file is created. This procedure is always repeated and the total space consumed would never cross 50MB.
    - Eg: Modbus.log-created
    - file1- reaches 25mb- file2 - created -File1 is backup file
    - file2 reaches 25mb - File1 is deleted - File2 is made backup file and file3 is created.
* File size is 25mb for all the se-node-red-modbus(SEModbusRead,SEModbusWrite) in the flow. Logs can be differentiated
  by node ID in the Log file.    
* Log file which captures the events from the node should not be deleted else the node events can’t be traced
* Log Folder should have READ/WRITE permission or Log events can’t be captured
* If selected Level in logging is error only error messages are logged. If selected level in logging is info both error and info messages are logged. If selected level in logging is debug all log messages error, info and debug are logged.  
* Time stamp for any node in the log file may differ from the time stamp in debug window.
* When nodes are not properly configured error status may not be displayed immediately.

## Contributors

* Michael Patri (Michael.Patri@schneider-electric.com)
* Babavali Sheik (Babavali.Sheik@schneider-electric.com)

## History
* 1.1.1 : A Node-RED Package for modbus node.
