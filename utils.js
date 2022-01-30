#!/usr/bin/env nodo  //De esa manera, le estamos diciendo a los sistemas *nix que el intérprete de nuestro archivo JavaScript debe /usr/bin/env nodebuscar el nodeejecutable instalado localmente.
import index from './index.js';
import chalk from 'chalk';

const statistics = (links) => {
    links.then(res => {
        const extractOnlyHref = res.map((elem) => elem.href); // entro en la promesa y obtengo los href solamente      //map me crea un nuevo array solo con el href 
        //console.log(extractOnlyHref);
        const hrefSinRepeat = new Set(extractOnlyHref); //elimino los links repetidos devuelve un objeto
        console.log(chalk.cyan.bold(` 
        ╔═══════ ≪ •❈• ≫ ═══════╗

            ➣ Total_Links:  ${extractOnlyHref.length}   \n\t\t
            ➣ Links_Unicos:  ${hrefSinRepeat.size} \n\t\t
            
        ╚═══════ ≪ •❈• ≫ ═══════╝
            `));
    });
}
//console.log(statistics(index.mdLinks("prueba\\hola", true)));

const broken = (links) => {
    links.then(res => {
        const brokenLinks = res.map((e) => e.status != 200);
        //console.log(brokenLinks);
        //console.log(brokenLinks, "hola");
        console.log(chalk.cyan.bold(` 
        ╔═══════ ≪ •❈• ≫ ═══════╗

            ➣ Total_Links:  ${statistics.total_links}  \n\t\t 
            ➣ Links_Unicos:  ${statistics.links_unicos} \n\t\t
            ➣ Links_Rotos:  ${brokenLinks.length}  

        ╚═══════ ≪ •❈• ≫ ═══════╝
            `));
    })
}
//console.log(broken(index.mdLinks("prueba\\hola", true)));

const templateFalse = (links) => {
    console.log(chalk.blueBright.dim(`
    ┌──────── ∘°❉°∘ ────────┐
        Links Encontrados 
    └──────── °∘❉∘° ────────┘
    `));
    links.then(res => {
        const mdlinksFalse = res.forEach(link => {
            console.log(chalk.cyan.bold(` 
            ➣ href:  ${link.href}   \n\t\t
            ➣ text:  ${link.text} \n\t\t
            ➣ file: ${link.file} \n 
            ┉┅━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┅┉
            `));
        })
    })
}

//console.log(templateFalse(index.mdLinks("prueba\\hola", true)));

const templateTrue = (links) => {
    console.log(chalk.blueBright.dim(`
    ┌──────── ∘°❉°∘ ────────┐
        Links Validados  
    └──────── °∘❉∘° ────────┘
    `));
    links.then(res => {
        const mdlinksTrue = res.forEach(link => {
            console.log(chalk.cyan.bold(` 
            ➣ href:  ${link.href}   \n\t\t
            ➣ text:  ${link.text} \n\t\t
            ➣ file: ${link.file} \n\t\t
            ➣ status: ${link.status} \n\t\t
            ➣ mensaje: ${link.ok} \n\t\t
            ┉┅━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┅┉
            `));
        })
    })
}
//console.log(templateTrue(index.mdLinks("prueba\\hola", true)));

const help = () => {
    return `
                              
                                    █▀▄▀█ █▀▄   █   █ █▄ █ █▄▀ █▀
                                    █ ▀ █ █▄▀   █▄▄ █ █ ▀█ █ █ ▄█
                                    ﹀﹀﹀﹀﹀﹀﹀﹀﹀﹀﹀﹀﹀﹀﹀﹀
            ╔══════════════════════════════════ ≪ •❈• ≫ ═══════════════════════════════════════╗

                                     ≪❈ INSTRUCCIONES DE USO ❈≫

            1. Ingresa un ruta: 
            ◞───────⊰·☆·⊱───────◟  
               mdlinks <ruta>        Resultado recibido: href, text, file.
            ◝───────⊰·☆·⊱───────◜
 
            2. Agrega cualquiera de las siguientes opciones: 

            ◞───────⊰·☆·⊱───────◟  
               --validate ó -v       Resultado recibido: href, text, file, status y mensaje.
            ◝───────⊰·☆·⊱───────◜

            ◞───────⊰·☆·⊱───────◟  
                --stats ó -s         Resultado recibido: total de links y links unicos. 
            ◝───────⊰·☆·⊱───────◜

            ◞───────⊰·☆·⊱───────◟  
                --validate --stats   Resultado recibido: total de links, links unicos y
                --stats --validate                       links rotos 
            ◝───────⊰·☆·⊱───────◜

            ╚══════════════════════════════════ ≪ •❈• ≫ ══════════════════════════════════════╝    `
}
//console.log(help())

export default {
    broken,
    statistics,
    help,
    templateFalse,
    templateTrue
}

