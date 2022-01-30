
import funciones from './funciones.js';


const mdLinks = (path, options) => {
    return new Promise((res, rej) => {
        const pathExist = funciones.pathExists(path); //verifico que la ruta existe  //devuelve un boleano 
        if (pathExist === false) { //si la ruta no existe muestro msj donde indico que no es valida 
            rej("The path entered is invalid")
        } else {
            const pathAbsolute = funciones.convertPathInAbsolute(path);
            const filterTheDirectoryByMd = funciones.travelDirectoryAndFile(pathAbsolute);
            const readMdFileAndExtractLinks = funciones.readDirectory(filterTheDirectoryByMd);
            if (options.validate === true) {
                res(funciones.validateLinks(readMdFileAndExtractLinks));
            } else {
                res(readMdFileAndExtractLinks);
            }
        }
    });
}

/* mdLinks(process.argv[2], { validate: true }) //esto es lo que debe retornar mi funcion // path que iria en el argumento 2 y un objeto con el validate: true
    .then(res => console.log(res))
    .catch(err => console.log(err));
 */

export default { mdLinks }






