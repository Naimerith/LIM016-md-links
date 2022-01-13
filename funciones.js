const fs = require('fs');
const path = require('path');

const myArgument = process.argv[2]; //la ruta que yo le pase en la terminal ([0]node, [1]nombre archivo, [2]ruta o archivo)

////////COMO SABER SI LA RUTA EXISTE/////////
const pathExists = function (ruta) {
  return fs.existsSync(ruta);
}

////////// CONVIERTO LA RUTA EN ABSOLUTA /////////// 
const convertPathInAbsolute = (ruta) => {
  if (path.isAbsolute(ruta)) {
    return ruta
  }
  return path.resolve(ruta)
}
console.log(convertPathInAbsolute(myArgument));
//////////PREGUNTO SI ES UN DIRECTORIO///////////
const pathIsDirectory = (ruta) => {
  return fs.lstatSync(ruta).isDirectory()
}

////////PREGUNTO SI ES UN ARCHIVO//////////
const pathIsFile = function (ruta) {
  return fs.statSync(ruta).isFile()
}

//////////RECORRER DIRECTORIO DE FORMA RECURSIVA///////////
const travelDirectoryAndFile = (ruta) => {
  let arrayResult = [];
  if (pathIsDirectory(ruta)) {
    const arrayDirectory = fs.readdirSync(ruta); 
    //console.log(arrayDirectory)
    arrayDirectory.forEach((archivo) => {
      const routeList = path.join(ruta, archivo); 
      //console.log(routeList); 
      if (pathIsDirectory(routeList)) { 
        arrayResult = arrayResult.concat(travelDirectoryAndFile(routeList)) 
      }
      if (path.extname(routeList) === ".md") {  
        arrayResult.push(routeList);  
      }
    })
  }else { 
    arrayResult.push(ruta)  
  }
  return arrayResult  
}
console.log(travelDirectoryAndFile(convertPathInAbsolute(myArgument)));

