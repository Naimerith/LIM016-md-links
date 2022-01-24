import funciones from './funciones.js';

const mdLinks = (path, options) => {
    return new Promise((res, rej) => {
        const pathAbsolute = funciones.convertPathInAbsolute(path); //convierto la ruta en absoluta //es un string
        const pathExist = funciones.pathExists(pathAbsolute); //verifico que la ruta existe  //devuelve un boleano 
        //console.log(pathAbsolute);
        //console.log(pathExist);
        if (pathExist === false) { //si la ruta no existe muestro msj donde indico que no es valida 
            rej("The path entered is invalid")
        } else { //si existe la ruta sigo...
            const filterTheDirectoryByMd = funciones.travelDirectoryAndFile(pathAbsolute);  //recorro el directorio y extraigo solo los archivos md //array con la ruta en un string
            const readMdFileAndExtractLinks = funciones.readDirectory(filterTheDirectoryByMd); //leo la ruta y extraigo los links en un array de objetos
            //console.log(filterTheDirectoryByMd);
            //console.log(readMdFileAndExtractLinks);
            if (options.validate === true) { //si es true se resuelve la promesa invocando mi funcion que contiene la peticion http
                res(funciones.validateLinks(readMdFileAndExtractLinks));
            } else { //sino resuelve el objeto que contiene el href, text y file 
                res(readMdFileAndExtractLinks);
            }
        }
    });
}

mdLinks(process.argv[2], { validate: true }) //esto es lo que debe retornar mi funcion // path que iria en el argumento 2 y un objeto con el validate: true
    .then(res => console.log('Promesa Resuelta: ', res))
    .catch(err => console.log(err));
