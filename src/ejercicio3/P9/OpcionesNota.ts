import {Nota} from '../P9/Nota';
import * as fs from 'fs';
import {existsSync, readFile, writeFileSync, mkdirSync, rmSync} from 'fs';
import * as chalk from 'chalk';

/**
 * Clase que se encarga de implementar las diferentes operaciones que se pueden realizar con cada nota
 */

export class OperacionesNotas {
    constructor(){}

    /**
     * Método para leer una nota
     * @param usuario nombre del usuario deseado
     * @param titulo titulo de la nota deseada
     */
    leer(usuario: string, titulo: string) {
        if (existsSync(`./src/ejercicio/JSON/${usuario}/${titulo}.json`)) {
            readFile(`./src/ejercicio/JSON/${usuario}/${titulo}.json`, (err, data) => {
                if(err) {
                    console.log(chalk.red("EEROR de lectura"));
                }else {
                    const aux = JSON.parse(data.toString());
                    switch (aux.color) {
                        case "Rojo":
                            console.log(chalk.red(`\n${aux.titulo}\n${aux.cuerpo}\n`));
                            break;
                        case "Verde":
                            console.log(chalk.green(`\n${aux.titulo}\n${aux.cuerpo}\n`));
                            break;
                        case "Azul":
                            console.log(chalk.blue(`\n${aux.titulo}\n${aux.cuerpo}\n`));
                            break;
                        case "Amarillo":
                            console.log(chalk.yellow(`\n${aux.titulo}\n${aux.cuerpo}\n`));
                            break;
                    }
                }
            });
        }else {
            console.log(chalk.red("ERROR: Nota inexistente"));
        }
    }

    /**
     * Método para agregar una nota
     * @param nota Nota que se desea crear
     * @param usuario Usuario al que se le desea añadir la nota
     */
    agregar(nota: Nota, usuario: string) {
        const ruta: string = './src/ejercicio/JSON' + usuario;
        const ficheroruta: string = './src/ejercicio/JSON' + usuario + '/' + nota.getTitulo() + '.json'; 

        if (existsSync(ruta)) {
    
            if (existsSync(ficheroruta)) {
              console.log(chalk.red("ERROR: Título ya usado"));
            } else {
              writeFileSync(ficheroruta, `{\n\t"titulo": "${nota.getTitulo()}",\n\t"cuerpo": "${nota.getCuerpo()}",\n\t"color": "${nota.getColor()}"\n}`);
              console.log(chalk.green("Nota agregada correctamente"));
            }
          } else {
            console.log(chalk.green("Directorio personal creado"));
            mkdirSync(ruta);
            writeFileSync(ficheroruta, `{\n\t"titulo": "${nota.getTitulo()}",\n\t"cuerpo": "${nota.getCuerpo()}",\n\t"color": "${nota.getColor()}"\n}`);
            console.log(chalk.green("Nota agregada correctamente"));
          }
    }

    /**
     * Método para eliminar una nota
     * @param titulo Titulo de la nota que se quiere eliminar
     * @param usuario Usuario al que pertenece la nota
     */
    eliminar(titulo: string, usuario: string) {
        const ficheroruta: string = './src/ejercicio/JSON' + usuario + '/' + titulo + '.json'; 

        if (existsSync(ficheroruta)) {
            rmSync(ficheroruta);
            console.log(chalk.green("Nota eliminada correctamente"));
          } else {
            console.log(chalk.red("ERROR: nota no encontrada"));
          }
    }

    /**
     * Método para editar una nota existente
     * @param usuario Usuario al que pertence una nota
     * @param titulo Titulo de la nota
     * @param cuerpo Cuerpo de la nota
     * @param color Color de la nota
     */
    editar(usuario: string, titulo: string, cuerpo: string, color: string) {
        const ficheroruta: string = './src/ejercicio/JSON' + usuario + '/' + titulo + '.json';
        
        if (existsSync(ficheroruta)) {
            writeFileSync(ficheroruta, `{\n\t"titulo": "${titulo}",\n\t"cuerpo": "${cuerpo}",\n\t"color": "${color}"\n}`);
            console.log(chalk.green("Nota modificada correctamente"));
          } else {
            console.log(chalk.red("Nota no encontrada"));
          }
    }

    /**
     * Método para "vigilar" cambios en el directorio
     * @param ruta ruta para analizar
     */
    watch(ruta: string) {
        const rutaExistente: boolean = existsSync(ruta);
        const direcc = ruta;
        const fichero = fs.readdirSync(direcc);

        if (rutaExistente == true) {
            fs.watch(direcc, (event: any, cont: string) => {
                console.log(`Se están produciendo cambios`);
                switch (event) {
                    case 'cambio':
                        console.log(`Se ha modificado el fichero` + cont);
                        break;
                    case 'renombrar':
                        const existeFich: boolean = existsSync(`${ruta}/${cont}`);
                        if (existeFich == true) {
                            console.log(`Se ha añadidio el fichero` + cont);
                        }else {
                            console.log(`Se ha eliminado el fichero` + cont);
                        }
                        break;
                }
                
                const fichero = fs.readdirSync(direcc);
                console.log(`El contenido del fichero actual es: ` + fichero);
    
            })

        }else {
            console.log(`ERROR. La ruta no existe`);
        }

    }
}