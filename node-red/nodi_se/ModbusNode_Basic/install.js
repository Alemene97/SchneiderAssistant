var path = require('path');
var os = require('os');
const fs = require('fs-extra')
var ndVer = process.version.split(".")[0];
var osTyp = (os.type() == 'Windows_NT') ? "windows" : "linux";
var homedir = require('os').homedir();
var noderedFolder = "C:\\Users\\aleme\\node-red\\node_modules"
console.log(" NDVERR ", ndVer);
console.log(" homedir ", noderedFolder);

try {
  if (!fs.existsSync(noderedFolder)) {
    fs.mkdirSync(noderedFolder)
  }
} catch (err) {
  console.error(err)
}
console.log("Copy the directories...")


    
    fs.copy('./modbus/' + osTyp + '-' + ndVer, noderedFolder, function (err) {
      if (err) return console.error(err)
      console.log("successfully installed Modbus files") 

      console.log("Restart node-red")
  	});


  // fs.remove('./dependencies', function (err) {
  //   if (err) {
  //     console.error("Error in installing required Library files");
  //   }
  //   console.error("successfully removed unnecessary required Library files");
  // });

  // fs.remove('modbus_install.js', function (err) {
  //   if (err) {
  //     console.error("Success");
  //   }
  //   console.error("Success");
  // });

//});



