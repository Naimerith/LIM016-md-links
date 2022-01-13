const fs = require('fs');
const path = require('path');

const myArgument = process.argv[2];

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
  } else {
    arrayResult.push(ruta)
  }
  return arrayResult
}
//console.log(travelDirectoryAndFile(convertPathInAbsolute(myArgument)));

/////////LEE EL ARCHIVO Y EXTRAE LOS LINKS////////////////
const readFileAndExtractLinks = (ruta) => {
  const arrayLinks = [];

  const expRegFile = /\[(.*)\]\((https*?:([^"')\s]+))/gi;
  const expRegUrl = /(((https?:\/\/)|(http?:\/\/)|(www\.))[^\s\n)]+)(?=\))/gi;
  const expRegTextUrl = /\[(.*)\]/gi;
  ////=== lee el archivo ===/////
  const readFile = fs.readFileSync(ruta, "UTF-8");

  const allLinksMd = readFile.match(expRegFile);
  const arrayOnlyUrl = readFile.match(expRegUrl);

  if (allLinksMd != null) {
    for (let i = 0; i < allLinksMd.length; i++) {
      const textMd = allLinksMd[i].match(expRegTextUrl)[0].substring(0, 49);
      const objLinks = {
        href: arrayOnlyUrl[i],
        text: textMd,
        file: convertPathInAbsolute(myArgument).toString()
      }
      arrayLinks.push(objLinks);
    }
  }
  return arrayLinks;
}
//console.log(readFileAndExtractLinks(myArgument));

///////FUNCION QUE LEE DIRECTORIOS Y EXTRAE LOS LINKS ////////
const readDirectory = (arrayFileMd) => {
  const arrayReadDirectory = [];
  arrayFileMd.forEach(file => {
    const arrayLinksDirectory = readFileAndExtractLinks(file);
    arrayReadDirectory.push(arrayLinksDirectory);
  })
  return arrayReadDirectory.flat();
}
const arrayFile = travelDirectoryAndFile(convertPathInAbsolute(myArgument));

console.log(readDirectory(arrayFile));


