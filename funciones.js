
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const myArgument = process.argv[2];

////////COMO SABER SI LA RUTA EXISTE/////////
const pathExists = function (ruta) {
  return fs.existsSync(ruta);
}
//console.log('la ruta existe?', pathExists(myArgument));

////////// CONVIERTO LA RUTA EN ABSOLUTA /////////// 
const convertPathInAbsolute = (ruta) => {
  if (path.isAbsolute(ruta)) {
    return ruta
  }
  return path.resolve(ruta)
}
//console.log('se convierte la ruta en absoluta', convertPathInAbsolute(myArgument));

//////////PREGUNTO SI ES UN DIRECTORIO///////////
const pathIsDirectory = (ruta) => {
  return fs.lstatSync(ruta).isDirectory()
}
//console.log('La ruta es un directorio?:', pathIsDirectory(myArgument));

////////PREGUNTO SI ES UN ARCHIVO//////////
const pathIsFile = function (ruta) {
  return fs.statSync(ruta).isFile()
}
//console.log('La ruta es un archivo?:', pathIsFile(myArgument));


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
//console.log('Estos son los archivos dentro de la ruta:', travelDirectoryAndFile(convertPathInAbsolute(myArgument)));

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
//console.log('Estos son los links dentro de el archivo:', readFileAndExtractLinks(myArgument));

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

//console.log('Estos son los links dentro de la ruta:', readDirectory(arrayFile)); 


////////VALIDAR LINKS CON PETICIONES HTTP////////
const validateLinks = (urls) => {
  return Promise.all(urls.map((arrayLinks) => {
    return fetch(arrayLinks.href)
      .then((resolve) => {
        const objResolve = {
          ...arrayLinks,
          status: resolve.status,
          ok: (resolve.status >= 200) && (resolve.status <= 399) ? "ok" : "fallo"
        }
        return objResolve;
      })
      .catch(() => {
        return {
          ...arrayLinks,
          status: "Este link esta roto",
          ok: "fallo"
        }
      })
  })
  )
}

validateLinks(readDirectory(arrayFile)).then(res => {
  console.log('Asi validamos los links:', res);
});


export default {
  pathExists,
  convertPathInAbsolute,
  pathIsDirectory,
  pathIsFile,
  travelDirectoryAndFile,
  readFileAndExtractLinks,
  readDirectory,
  validateLinks
}



