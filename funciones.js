const fs = require('fs');
const path = require('path');

////////COMO SABER SI LA RUTA EXISTE/////////
const pathExists = function (ruta) {
  return fs.existsSync(ruta)
}
////////// CONVIERTO LA RUTA EN ABSOLUTA /////////// 
const convertPathInAbsolute = (ruta) => {
    if (path.isAbsolute(ruta)) {
      return ruta
    }
    return path.resolve(ruta)
  }
