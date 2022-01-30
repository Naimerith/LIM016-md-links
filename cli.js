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
            |   Ejemplo: --help        
            ◝──────────⊰·☆·⊱──────────◜
    `))
}
if (args.length === 1 && args[0] === "--help") { //si agrego --help 
    console.log(chalk.yellow.dim(utils.help()))
}

if (args.length === 1 && args[0] === "mdlinks") { //si agrego solo mdlinks 
    console.error(chalk.cyan.dim(`
    1. Ingresa un ruta:
            ◞──────────⊰·☆·⊱──────────◟  
            |   Ejemplo: mdlinks <ruta>        
            ◝──────────⊰·☆·⊱──────────◜
            `))
}

if (args.length === 2 && args[0] === "mdlinks") { //si agrego solo mdlinks //es el comportamiento por defecto 
    utils.templateFalse(index.mdLinks(args[1], { validate: false }));
}

if (args.length === 3 && args[0] === "mdlinks" && args[2] === "--validate" || args[2] === "-v") { //este es si agrega la opcion de --validate o -v
    utils.templateTrue(index.mdLinks(args[1], { validate: true }));
}

if (args.length === 3 && args[0] === "mdlinks" && args[2] === "--stats" || args[2] === "-s") { //este es si agrega la opcion de --validate o -v
    utils.statistics(index.mdLinks(args[1], { validate: false }));
}

if (args.length === 4 && args[0] === "mdlinks" && args[2] === "--stats" || args[2] === "--validate" && args[3] === "--stats" || args[3] === "--validate") { //este es si agrega la opcion de --validate o -v
    //utils.statistics(index.mdLinks(args[1], { validate: false }));
    utils.broken(index.mdLinks(args[1], { validate: false }));
}

