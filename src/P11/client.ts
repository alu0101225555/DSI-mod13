import {RequestType} from './types';
import * as chalk from 'chalk';
import * as yargs from 'yargs';
import * as net from 'net';
import { MessageClient } from './eventEmitterClient';
/*
export class Client {

    constructor(){
        //let client = net.connect({port:60300});
    }
    /**
     * Establece la conexión con el puerto 60300
     */
     let client = net.connect({port:60300});
     let eventEmitter = new MessageClient(client);
     let requestNote: RequestType = {
         type:'list',
         user: ''
    /**
     * Comando: añadir
     */
    /*
    yargs.command({
        command: 'add',
        describe: 'Añadir una nota',
        builder: {
            user: {
                describe: 'Usuario de la nota',
                demandOption: true,
                type: 'string',
            },
            title: {
                describe: 'Título de la nota',
                demandOption: true,
                type: 'string',
            },
            body: {
                describe: 'Cuerpo de la nota',
                demandOption: true,
                type: 'string',
            },
            color: {
                describe: 'Color de la nota',
                demandOption: true,
                type: 'string',
            },
        },
        handler(argv) {
            if (typeof argv.user === 'string' && typeof argv.color === 'string' &&
        typeof argv.body === 'string' && typeof argv.title === 'string') {

                requestNote = {
                    type: 'add',
                    user: argv.user,
                    title: argv.title,
                    body: argv.body,
                    color: argv.color
                };

            }

        }
    });

    /**
     * Comando: modificar
     */
    /*
    yargs.command({
        command: 'modify',
        describe: 'Modificar una nota',
        builder: {
            user: {
                describe: 'Usuario de la nota',
                demandOption: true,
                type: 'string',
            },
            title: {
                describe: 'Título de la nota',
                demandOption: true,
                type: 'string',
            },
            body: {
                describe: 'Cuerpo de la nota',
                demandOption: true,
                type: 'string',
            },
            color: {
                describe: 'Color de la nota',
                demandOption: true,
                type: 'string',
            },
        },
        handler(argv) {
            if (typeof argv.user === 'string' && typeof argv.color === 'string' &&
        typeof argv.body === 'string' && typeof argv.title === 'string') {

                requestNote = {
                    type: 'modify',
                    user: argv.user,
                    title: argv.title,
                    body: argv.body,
                    color: argv.color
                };

            }

        }
    });

    /**
     * Comando: eliminar
     */
    /*
    yargs.command({
        command: 'remove',
        describe: 'Eliminar una nota',
        builder: {
            user: {
                describe: 'Usuario de la nota',
                demandOption: true,
                type: 'string',
            },
            title: {
                describe: 'Título de la nota',
                demandOption: true,
                type: 'string',
            },
        },
        handler(argv) {
            if (typeof argv.user === 'string' && typeof argv.title === 'string') {

                requestNote = {
                    type: 'remove',
                    user: argv.user,
                    title: argv.title,
                };

            }

        }
    });

    /**
     * Comando: leer
     */
    /*
    yargs.command({
        command: 'read',
        describe: 'Leer una nota',
        builder: {
            user: {
                describe: 'Usuario de la nota',
                demandOption: true,
                type: 'string',
            },
            title: {
                describe: 'Título de la nota',
                demandOption: true,
                type: 'string',
            },
        },
        handler(argv) {
            if (typeof argv.user === 'string' && typeof argv.title === 'string') {

                requestNote = {
                    type: 'read',
                    user: argv.user,
                    title: argv.title,
                };

            }

        }
    });

    /**
     * Comando: listar
     */
    /*
    yargs.command({
        command: 'list',
        describe: 'Listar las notas de un usuario',
        builder: {
            user: {
                describe: 'Usuario de la nota',
                demandOption: true,
                type: 'string',
            },
        },
        handler(argv) {
            if (typeof argv.user === 'string') {

                requestNote = {
                    type: 'list',
                    user: argv.user,
                };

            }

        }
    });

    yargs.parse();

    /**
     * Enviamos la petición al servidor
     */
    /*
    client.write(JSON.stringify(requestNote) + '\n', (er) => {
        if(er) {
            console.log(chalk.red('ERROR en la petición cliente-servidor'));
        }
    });

    /**
     * Resultado de la petición cliente-servidor
     */
    /*
    eventEmitter.on('msg', (req) => {
        switch(req.type) {
            case 'add':
                if(req.success) {
                    console.log(chalk.green('Nota añadida correctamente'));
                }else {
                    console.log(chalk.red('ERROR al añadir nota'));
                }
            break;
            case 'modify':
                if(req.success) {
                    console.log(chalk.green('Nota modificada correctamente'));
                }else {
                    console.log(chalk.red('ERROR al modificar nota'));
                }
            break;
            case 'remove':
                if(req.success) {
                    console.log(chalk.green('Nota eliminada correctamente'));
                }else {
                    console.log(chalk.red('ERROR al eliminar nota'));
                }
            break;
            case 'read':
                if(req.success) {
                    let colorImpr = chalk.keyword(req.notes[0].color);
                    console.log(colorImpr(req.notes[0].title));
                    console.log(colorImpr(req.notes[0].body));
                }else {
                    console.log(chalk.red('ERROR al leer nota'));
                }
            break;
            case 'list':
                if(req.success) {
                    let colorImpr;
                    req.notes.forEach((nota: any) => {
                        colorImpr = chalk.keyword(nota.color);
                        console.log(colorImpr(nota.title));
                    })
                }else {
                    console.log(chalk.red('ERROR al listar las notas'));
                }
            break;
            default:
                console.log(chalk.red('ERROR. Comando desconocido'));
            break;
        }
    });

    /**
     * Si no se establece conexión, muestra el siguiente mensaje de error
     */
/*
    client.on('error', (er) => {
        console.log(chalk.red('ERROR en la conexión'));
    });
     }*/
    }