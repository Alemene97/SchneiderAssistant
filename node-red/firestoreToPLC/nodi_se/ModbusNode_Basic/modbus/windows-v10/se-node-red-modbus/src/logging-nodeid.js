/**
 Copyright (c) 2016,2017, Klaus Landsdorf (http://bianco-royal.de/)
 All rights reserved.
 node-red-contrib-modbus - The BSD 3-Clause License

 @author <a href="mailto:klaus.landsdorf@bianco-royal.de">Klaus Landsdorf</a> (Bianco Royal)
 **/
'use strict'
let fileName = null;
let isLoggerConfigured = false;
let log = null;
const fs = require('fs');
const path = require('path');
let logData = require("./logging")

let loggingVal
let filenameVal
let filepathVal
let filesizeVal
let sizeUnitVal
let logLevelVal;

module.exports.configure = function (logging, filename, filepath, filesize, sizeUnit, logLevel) {

  let logDir = null;

  let fileSize = 0;
  let lcllog = null;

  loggingVal = logging || 'info'
  filenameVal = filename
  filepathVal = filepath
  filesizeVal = filesize
  sizeUnitVal = sizeUnit
  logLevelVal = logLevel;


  const winston = require('winston');


  if (filepath == "")
    logDir = path.join(__dirname, 'log');
  else
    logDir = filepath + '/log'

  this.fileName = path.join(logDir + '/' + filename + '.log')

  if (!logging)
    return;

  if (sizeUnit == 'kb')
    fileSize = filesize * 1024
  else if (sizeUnit == 'mb')
    fileSize = filesize * 1048576
  else if (sizeUnit == 'gb')
    fileSize = filesize * 1073741824
  else
    fileSize = 1048576

  // Create the log directory if it does not exist
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }


  // const tsFormat = () => (new Date()).toLocaleTimeString();
  const tsFormat = () => (new Date()).toJSON();
  lcllog = new (winston.Logger)({
    transports: [
      new (winston.transports.File)({
        filename: this.fileName,
        timestamp: tsFormat,
        maxsize: fileSize,
        maxFiles: 2,
        tailable: true,
        level: 'debug'
      })
    ]
  });

  isLoggerConfigured = true;

  lcllog.logInfo = (logMessage, isLoggingEnabled, logLevel, node) => {
    let myFile = this.fileName;
    if (isLoggingEnabled) {
      isExists(myFile, function (status) {
        if (status) {
          isWritable(myFile, function (writeAccess) {
            if (writeAccess) {
              // console.log('exists and has write access')
              lcllog.info(logMessage);
            } else {
              // console.log('exists and does not has write access')
              let _msg = {};
              _msg.payload = { "Error": " No write permission for Node (" + node.id + ".log) log file, Please provide the write permission for file or containing folder" };
              node.send(_msg)
            }
          })
        } else {
          // console.log('file not exists')
          lcllog.info(logMessage);
        }
      })
    }
  }

  lcllog.logEvents = (logMessage, node) => {
    let myFile = this.fileName;
    isExists(myFile, function (status) {
      if (status) {
        isWritable(myFile, function (writeAccess) {
          if (writeAccess) {
            // console.log('exists and has write access')
            lcllog.info(logMessage);
          } else {
            // console.log('exists and does not has write access')
            let _msg = {};
            _msg.payload = { "Error": " No write permission for Node (" + node.id + ".log) log file , Please provide the write permission." };
            node.send(_msg)
          }
        })
      } else {
        // console.log('file not exists')
        lcllog.info(logMessage);
      }
    })
  }

  lcllog.logError = (logMessage, isLoggingEnabled, logLevel, node) => {
    let myFile = this.fileName;
    if (isLoggingEnabled) {
      isExists(myFile, function (status) {
        if (status) {
          isWritable(myFile, function (writeAccess) {
            if (writeAccess) {
              // console.log('exists and has write access')
              lcllog.error(logMessage);
            } else {
              // console.log('exists and does not has write access')
              let _msg = {};
              _msg.payload = { "Error": " No write permission for Node (" + node.id + ".log) log file , Please provide the write permission." };
              node.send(_msg)
            }
          })
        } else {
          // console.log('file not exists')
          lcllog.error(logMessage);
        }
      })
    }
  }
  return lcllog;
}


function isExists(fileName, callback) {
  fs.access(fileName, fs.constants.F_OK, (err) => {
    if (err) {
      // console.log(err);
      callback(false);
    } else {
      callback(true);
    }
  });
}
function isWritable(fileName, callback) {
  fs.access(fileName, fs.constants.F_OK | fs.constants.W_OK, (err) => {
    if (err) {
      // console.log(err);
      callback(false);
    } else {
      callback(true);
    }
  });
}