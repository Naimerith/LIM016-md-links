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
////////PREGUNTO SI ES UN ARCHIVO//////////
const pathIsFile = function (ruta) {
  return fs.statSync(ruta).isFile()
}
//////////LEER DIRECTORIO O ARCHIVO DE FORMA RECURSIVA///////////
const readDirectoryAndFile = (ruta) => {
  let arrayResult = [];
  if (pathIsDirectory(ruta)) {
    arrayDirectory = fs.readdirSync(ruta);
    arrayDirectory.forEach((archivo) => {
      const routeList = path.join(ruta, archivo);
      //console.log(routeList); 
      if (pathIsDirectory(routeList)) {
        arrayResult = arrayResult.concat(readDirectoryAndFile(routeList))
      }
      if (path.extname(routeList) === ".md") {
        arrayResult.push(routeList)
      }
    })
  } else {
    arrayResult.push(ruta)
  }
  return arrayResult
}
