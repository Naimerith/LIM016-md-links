# Markdown Links

## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Intalación](#2-instalación)
* [3. Plan de Acción](#3-plan-de-acción)
* [4. Instrucciones de Uso](#4-instrucciones-de-uso)
* [5. Autora](#5-autora)

***

## 1. Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...), y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.

## 2. Instalación 📥



## 3. Plan de Acción 📍


### Diagrama de Flujo de Api

### Diagrama de Flujo de CLI 


## 4. Instrucciones de Uso 📝
La librería se puede ejecutar de la siguiente manera a través de la terminal:

# mdlinks <path-to-file> [options]
  
  1. Si ingresa sólo mdlinks mostrará una guia de procedimiento para ingresar la ruta o pedir ayuda 
  ![mdlinks](https://user-images.githubusercontent.com/89501132/151981915-23b35d24-89d1-4f66-8b27-694077bd740f.png)

  2. Para solicitar ayuda y ver las Instrucciones de Uso:
  Ingrese ☛ mdlinks --help
  ![mdlinks_help](https://user-images.githubusercontent.com/89501132/151982277-d517fa11-94f4-4843-bf24-dba0b0d1e130.png)

  3. Para hacer una petición HTTP y averiguar si el link funciona o no.
   Ingrese ☛ mdlinks <path-to-file> --validate ó -v 
  El output en este caso incluye la palabra ok o fail después de la URL, así como el status de la respuesta recibida a la petición HTTP a dicha URL.
  ![mdlinks_ruta_v](https://user-images.githubusercontent.com/89501132/151984552-e251e1de-af70-4659-b522-80546cd11734.png)

  4. Para estadísticas básicas sobre los links.
   Ingrese ☛ mdlinks <path-to-file> --stats ó -s
  El output (salida) será un texto con el total de links y los links unicos. 
  ![mdlinks_ruta_s](https://user-images.githubusercontent.com/89501132/151984613-c172418b-69d1-4b40-afc9-7b0cc9c3c709.png)

  5.  Para obtener estadísticas que necesiten de los resultados de la validación podemos combinar comandos; 
  Ingrese ☛ mdlinks <path-to-file> --stats --validate ó --validate --stats
  El output (salida) será un texto con el total de links, los links unicos y los links rotos. 
  ![mdlinks_ruta_s_v](https://user-images.githubusercontent.com/89501132/151985028-355ba6fe-70dc-4a82-9253-dbb0c1570a67.png)


## 5. Autora 🙋
Naimerith Daniela Magdaleno Ovalles 
