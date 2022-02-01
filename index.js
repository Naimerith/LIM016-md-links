
import funciones from './funciones.js';


const mdLinks = (path, options) => {
    return new Promise((res, rej) => {
        const pathExist = funciones.pathExists(path);
        if (pathExist === false) {
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

/* mdLinks(process.argv[2], { validate: false }) 
    .then(res => console.log(res))
    .catch(err => console.log(err)); */


export default { mdLinks }






