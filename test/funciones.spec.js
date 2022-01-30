import funciones from "../funciones.js";
import index from "../index";
//import utils from "../utils";
//import cli from "../cli";


//import fs from 'fs';
//import fetch from 'node-fetch';

describe('pathExists', () => {
  it('Deberia ser una función', () => {
    expect(typeof funciones.pathExists).toBe('function')
  });
  it('Deberia retornar si existe la ruta ', () => {
    expect(funciones.pathExists('README.md')).toBe(true)
  });
  it('Deberia retornar que no existe la ruta ', () => {
    expect(funciones.pathExists('READ876ME.md')).toBe(false)
  });
});

describe('convertPathInAbsolute', () => {
  it('Deberia ser una función', () => {
    expect(typeof funciones.convertPathInAbsolute).toBe('function')
  });
  it('Deberia retornar una ruta absoluta', () => {
    expect(funciones.convertPathInAbsolute('README.md')).toEqual('C:\\Users\\Laboratoria\\Desktop\\MD-LINKS\\LIM016-md-links\\README.md')
  });
  it('Deberia retornar una ruta absoluta', () => {
    const pathAbsolute = 'C:\\Users\\Laboratoria\\Desktop\\MD-LINKS\\LIM016-md-links\\README.md'
    expect(funciones.convertPathInAbsolute('C:\\Users\\Laboratoria\\Desktop\\MD-LINKS\\LIM016-md-links\\README.md')).toStrictEqual(pathAbsolute)
  });
});

describe('pathIsDirectory', () => {
  it('Deberia ser una función', () => {
    expect(typeof funciones.pathIsDirectory).toBe('function')
  });
  it('Deberia retornar true para directorio', () => {
    expect(funciones.pathIsDirectory('C:\\Users\\Laboratoria\\Desktop\\MD-LINKS\\LIM016-md-links')).toBe(true)
  });
  it('Deberia retornar false para una ruta de archivo', () => {
    expect(funciones.pathIsDirectory('README.md')).toBe(false)
  });
});

describe('pathIsFile', () => {
  it('Deberia ser una función', () => {
    expect(typeof funciones.pathIsFile).toBe('function')
  });
  it('Deberia retornar false para una ruta de directorio', () => {
    expect(funciones.pathIsFile('C:\\Users\\Laboratoria\\Desktop\\MD-LINKS\\LIM016-md-links')).toBeFalsy() //cuando no le importe qué es un valor y quiera asegurarse de que un valor sea falso en un contexto booleano.
  });
  it('Deberia retornar true para archivo', () => {
    expect(funciones.pathIsFile('README.md')).toBeTruthy() //igual que el toBeFalsy pero para true 
  });
});

describe('travelDirectoryAndFile', () => {
  it('Deberia ser una función', () => {
    expect(typeof funciones.travelDirectoryAndFile).toBe('function')
  });
  it('Deberia recorrer la ruta, listar y filtrar por .md', () => {
    const result = [
      'prueba\\archivo.md',
      'prueba\\hola\\personal.md',
      'prueba\\vacio.md'
    ];
    expect(funciones.travelDirectoryAndFile('prueba')).toEqual(result)
  });
  it('Deberia listar y filtrar el archivo .md y retornar un array con la ruta absoluta de ese archivo', () => {
    const arrayFile = [
      'C:\\Users\\Laboratoria\\Desktop\\MD-LINKS\\LIM016-md-links\\rotos.md'
    ];
    expect(funciones.travelDirectoryAndFile(funciones.convertPathInAbsolute('rotos.md'))).toEqual(arrayFile)
  });
});

describe('readFileAndExtractLinks', () => {
  it('Deberia ser una función', () => {
    expect(typeof funciones.readFileAndExtractLinks).toBe('function')
  });
  it('Deberia leer el archivo md y extraer el href, text y file', () => {
    const objetoLinks = [
      {
        href: 'https://go7647438985ogle.com',
        text: '[este link esta roto]',
        file: 'C:\\Users\\Laboratoria\\Desktop\\MD-LINKS\\LIM016-md-links\\rotos.md'
      },
      {
        href: 'https://devellOper.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/',
        text: '[Array roto - MDN]',
        file: 'C:\\Users\\Laboratoria\\Desktop\\MD-LINKS\\LIM016-md-links\\rotos.md'
      }
    ]
    expect(funciones.readFileAndExtractLinks('./rotos.md')).toEqual(objetoLinks)
  });
});

describe('readDirectory', () => {
  it('Deberia ser una función', () => {
    expect(typeof funciones.readDirectory).toBe('function')
  });
  it('Deberia leer archivos .md de un directorio y extraer el href, text y file', () => {
    const objetoLinksDirectory = [
      {
        href: 'https://nodejs.org/es/',
        text: '[Node.js]',
        file: 'C:\\Users\\Laboratoria\\Desktop\\MD-LINKS\\LIM016-md-links\\prueba\\hola\\personal.md'
      },
      {
        href: 'https://developers.google.com/v8/',
        text: '[motor de JavaScript V8 de Chrome]',
        file: 'C:\\Users\\Laboratoria\\Desktop\\MD-LINKS\\LIM016-md-links\\prueba\\hola\\personal.md'
      },
      {
        href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
        text: '[Funciones — bloques de código reutilizables - MD',
        file: 'C:\\Users\\Laboratoria\\Desktop\\MD-LINKS\\LIM016-md-links\\prueba\\hola\\personal.md'
      },
      {
        href: 'https://jestjs.io/docs/es-ES/asynchronous',
        text: '[Tests de código asincrónico con Jest - Documenta',
        file: 'C:\\Users\\Laboratoria\\Desktop\\MD-LINKS\\LIM016-md-links\\prueba\\hola\\personal.md'
      },
      {
        href: 'https://jestjs.io/docs/es-ES/asynchronous',
        text: '[Tests de código asincrónico con Jest - Documenta',
        file: 'C:\\Users\\Laboratoria\\Desktop\\MD-LINKS\\LIM016-md-links\\prueba\\hola\\personal.md'
      },
      {
        href: 'https://jestjs.io/docs/es-ES/asynchronous',
        text: '[Tests de código asincrónico con Jest - Documenta',
        file: 'C:\\Users\\Laboratoria\\Desktop\\MD-LINKS\\LIM016-md-links\\prueba\\hola\\personal.md'
      }
    ]
    expect(funciones.readDirectory(funciones.travelDirectoryAndFile('./prueba'))).toEqual(objetoLinksDirectory)
  });
});


//<<<<<<<<<<.....MD LINKS......>>>>>>>>>>
describe('Probando la funcion mdLinks', () => {
  it('Deberia ser una función', () => {
    expect(typeof index.mdLinks).toBe('function')
  });
  it('Si option es igual a false, rechaza la promesa y retorna un array de objetos con href, text y file', () => {
    const arrayObj = [
      {

        href: 'https://go7647438985ogle.com',
        text: '[este link esta roto]',
        file: 'C:\\Users\\Laboratoria\\Desktop\\MD-LINKS\\LIM016-md-links\\rotos.md',
      },
      {
        href: 'https://devellOper.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/',
        text: '[Array roto - MDN]',
        file: 'C:\\Users\\Laboratoria\\Desktop\\MD-LINKS\\LIM016-md-links\\rotos.md'

      },
    ]
    return index.mdLinks('C:\\Users\\Laboratoria\\Desktop\\MD-LINKS\\LIM016-md-links\\rotos.md', { validate: false })
      .then((result) => {
        expect(result).toEqual(arrayObj)
      });
  });
  it('Si option es igual a true, resuelve la promesa y retorna un array de objetos con href, text, file, status, ok/fail', () => {
    const arrayObjTrue = [
      {
        href: 'https://go7647438985ogle.com',
        text: '[este link esta roto]',
        file: 'C:\\Users\\Laboratoria\\Desktop\\MD-LINKS\\LIM016-md-links\\rotos.md',
        status: 'broken',
        ok: 'fail'
      },
      {
        href: 'https://devellOper.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/',
        text: '[Array roto - MDN]',
        file: 'C:\\Users\\Laboratoria\\Desktop\\MD-LINKS\\LIM016-md-links\\rotos.md',
        status: 'broken',
        ok: 'fail'
      }
    ]
    return index.mdLinks('C:\\Users\\Laboratoria\\Desktop\\MD-LINKS\\LIM016-md-links\\rotos.md', { validate: true })
      .then((result) => {
        expect(result).toEqual(arrayObjTrue)
      });
  });
});