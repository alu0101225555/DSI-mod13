import * as chalk from 'chalk';
import * as net from 'net';
import {Note} from './note';
import {ResponseType} from './types';
import {Command} from './commands';
import EventEmitter from 'events';

export class Server extends EventEmitter {

    constructor() {
        super();
        
        /**
         * Creación del servidor. Es un objeto 'socket'
         */
        const server = net.createServer({allowHalfOpen: true}, (connection) => {
            //let myRequest = '';
            //connection.on('data', (chunk) => {
                //myRequest += chunk;
            //});

            //console.log(`Cliente conectado`);
            this.run(connection);
        });

        server.listen(60300, () => {
            console.log('Esperando conexión del cliente');
        });
    }

    run(connection: net.Socket) {
        console.log(chalk.green('Usuario conectado'));

        connection.on('req', (msg) => {
            let req = msg;
            let userList = new Command();
            let response: ResponseType = {
                type: 'list',
                success: true
            };

            let userN = new Note(req.user, req.title, req.body, req.color);

            switch(req.type) {
                case 'add':
                    response.type = 'add';
                    if(!userList.addN(userN)) {
                        response.success = false;
                    }
                break;
                case 'modify':
                    response.type = 'modify';
                    if(!userList.modifyN(userN)) {
                        response.success = false;
                    }
                break;
                case 'remove':
                    response.type = 'remove';
                    if(!userList.removeN(req.userN, req.title)) {
                        response.success = false;
                    }
                break;
                case 'read':
                    response.type = 'read';
                    let note = userList.readN(req.userN, req.title);
                    if(note.getTitle() == "") {
                        response.success = false;
                    }else {
                        response.notes = [note];
                    }
                break;
                case 'list':
                    response.type = 'list';
                    let notes = userList.listN(req.userN);
                    if(notes.length == 0) {
                        response.success = false;
                    }else {
                        response.notes = notes;
                    }
                break;
                default:
                    console.log(chalk.red('ERROR. Comando desconocido'));
                break;
            }

            /**
             * Se pasa al JSON
             */
            connection.write(JSON.stringify(response), (er) => {
                if (er) {
                    console.log(chalk.red('ERROR en la solicitud'));
                }else {
                    console.log(chalk.green('Solicitud resuelta'));
                    connection.end();
                }
            });
        });
    //});
}
}
const a = new Server();