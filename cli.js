#!/usr/bin/env node

import index from './index.js';
import utils from './utils.js';
import chalk from 'chalk';



const [, , ...args] = process.argv;
//const acceptUppercase = args[2].toLowerCase();

if (args.length === 0) { //si no ha ingresado nada 
    console.error(chalk.cyan.dim(`
    1. Ingresa un ruta:
            ◞──────────⊰·☆·⊱──────────◟  
            |   Ejemplo: mdlinks <ruta>        
            ◝──────────⊰·☆·⊱──────────◜
    
    ó ingrese --help para ver Instrucciones de Uso
            ◞──────────⊰·☆·⊱──────────◟  
            |   Ejemplo: mdlinks --help        
            ◝──────────⊰·☆·⊱──────────◜
    `))
}
if (args.length === 1 && args[0] === "--help") { //si agrego --help 
    console.log(chalk.yellow.dim(utils.help()))
}

/* if (args.length === 1 && args[0] === "mdlinks") { //si agrego mdlinks nuevamente 
    console.log(chalk.cyan.dim(`
    1. Ingresa un ruta:
            ◞──────────⊰·☆·⊱──────────◟  
            |   Ejemplo: mdlinks <ruta>        
            ◝──────────⊰·☆·⊱──────────◜
            `))
} */

if (args.length === 1 && args[0] != "--help") { //si agrego solo mdlinks mas la ruta//es el comportamiento por defecto 
    utils.templateFalse(index.mdLinks(args[0], { validate: false }));
}

if (args.length === 2 && args[1] === "--validate" || args[1] === "-v") { //este es si agrega la opcion de --validate o -v
    utils.templateTrue(index.mdLinks(args[0], { validate: true }));
}

if (args.length === 2 && args[1] === "--stats" || args[1] === "-s") { //este es si agrega la opcion de --validate o -v
    utils.statistics(index.mdLinks(args[0], { validate: false }));
}

if (args.length === 3 && args[1] === "--stats" || args[1] === "--validate" && args[2] === "--stats" || args[2] === "--validate") { //este es si agrega la opcion de --validate o -v
    utils.statistics(index.mdLinks(args[0], { validate: false }));
    utils.broken(index.mdLinks(args[0], { validate: false }));
}

