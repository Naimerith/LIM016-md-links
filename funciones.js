const fs = require('fs');
const path = require('path');

////////COMO SABER SI LA RUTA EXISTE/////////
const pathExists = function (ruta) {
  return fs.existsSync(ruta)
}
////////// CONVIERTO LA RUTA EN ABSOLUTA /////////// 
const convertPathInAbsolute = (ruta) => {
    if (path.isAbsolute(ruta)) {
      return ruta
    }
    return path.resolve(ruta)
  }
//////////PREGUNTO SI ES UN DIRECTORIO///////////
const pathIsDirectory = (ruta) => {
  return fs.lstatSync(ruta).isDirectory()
}
console.log(pathIsDirectory(process.argv[2]));

////////PREGUNTO SI ES UN ARCHIVO//////////
const pathIsFile = function (ruta) {
  return fs.statSync(ruta).isFile()
}
console.log(pathIsFile(process.argv[2])); 