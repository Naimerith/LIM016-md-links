#!/usr/bin/env node
import index from './index.js';
import utils from './utils.js';
import chalk from 'chalk';


const [, , ...args] = process.argv;
//const acceptUppercase = args[2].toLowerCase();

if (args.length === 0) {
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
if (args.length === 1 && args[0] === "--help") {
    console.log(chalk.yellow.dim(utils.help()))
}

if (args.length === 1 && args[0] != "--help") {
    utils.templateFalse(index.mdLinks(args[0], { validate: false }));
}

if (args.length === 2 && args[1] === "--validate" || args[1] === "-v") {
    utils.templateTrue(index.mdLinks(args[0], { validate: true }));
}

if (args.length === 2 && args[1] === "--stats" || args[1] === "-s") {
    utils.statistics(index.mdLinks(args[0], { validate: false }));
}

if (args.length === 3 && args[1] === "--stats" || args[1] === "--validate" && args[2] === "--stats" || args[2] === "--validate") {
    utils.statistics(index.mdLinks(args[0], { validate: false }));
    utils.broken(index.mdLinks(args[0], { validate: false }));
}

