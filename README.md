### Práctica 11

Noelia Ibáñez Silvestre

alu0101225555

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct11-async-sockets-alu0101225555/badge.svg?branch=master)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct11-async-sockets-alu0101225555?branch=master)

[![Sonar-Cloud](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct11-async-sockets-alu0101225555/actions/workflows/sonarcloud.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct11-async-sockets-alu0101225555/actions/workflows/sonarcloud.yml)

[![Tests](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct11-async-sockets-alu0101225555/actions/workflows/node.js.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct11-async-sockets-alu0101225555/actions/workflows/node.js.yml)

## Introducción

En esta práctica tendrá que partir de la implementación de la aplicación de procesamiento de notas de texto que llevó a cabo en la Práctica 9 para escribir un servidor y un cliente haciendo uso de los sockets proporcionados por el módulo `net` de Node.js.

## Desarrollo

Para llevar a cabo el desarrollo de esta práctica, partimos de una estructura similar a la que desarrollamos en la práctica 9.

A continuación se detallan los archivos y sus especificaciones:

- **note.ts:**

Define la estructura de una nota y sus respectivos atributos: usuario al que pertenece, título, cuerpo y color de la nota.

```
export class Note {
    
    constructor(private user: string, private title: string, private body: string, private color: string) {}

    getUser(){
        return this.user;
    }

    getTitle(){
        return this.title;
    }

    getBody(){
        return this.body;
    }

    getColor(){
        return this.color;
    }
}
```

- **commands.ts:**

Implementa los comandos que son posibles usar en la aplicación:

1. `addN()`: permite añadir una nota a un usuario si existe el directorio, en caso contrario creará dicha carpeta y añadirá la nota. Retornará `true` si todo ha ido correctamente. 

2. `modifyN()`: permite modificar una nota si existe. En caso de no existir la nota o el directorio del usuario, retornará `false`.

3. `removeN()`: permite eliminar una nota de un usuario, comprobando previamente su existencia. Devuelve `true` si consiguió eliminar dicha nota.

4. `readN()`:  permite leer una nota determinada. Si la nota existe, devolverá una nueva nota con la información de la nota consultada.

5. `listN()`: permite listar las notas de un determinado usuario. Si el directorio existe, carga las notas en un array que devolverá posteriormente.

```
export class Command {

    constructor(){}

    addN(userN: Note) {

        let note: Note = userN;
        let toJSON = JSON.stringify(note, null, 2);
        let dir: string = "../P11/users" + userN.getUser();
        let titleJSON = removeSpaces(userN.getTitle());
        let JSONnote: string = dir + "/" + titleJSON + ".json";

        if (fs.existsSync(dir)) {
            if (!fs.existsSync(JSONnote)) {
                fs.writeFileSync(JSONnote, toJSON);
                return true;
            }
            return false;
        }else {
            fs.mkdirSync(dir);
            fs.writeFileSync(JSONnote, toJSON);
            return true;
        }
    }

    modifyN(userN: Note) {

        let note: Note = userN;
        let toJSON = JSON.stringify(note, null, 2);
        let dir: string = "../P11/users" + userN.getUser();
        let titleJSON = removeSpaces(userN.getTitle());
        let JSONnote: string = dir + "/" + titleJSON + ".json";

        if (fs.existsSync(dir)) {
            if (fs.existsSync(JSONnote)) {
                fs.writeFileSync(JSONnote, toJSON);
                return true;
            }
            return false;
        }else {
            return false;
        }
    }

    removeN(userN: string, title: string) {

        let dir: string = "../P11/users" + userN;
        let titleJSON = removeSpaces(title);
        let JSONnote: string = dir + "/" + titleJSON + ".json";

        if (fs.existsSync(dir)) {
            if (fs.existsSync(JSONnote)) {
                fs.rmSync(JSONnote);
                return true;
            }else {
                return false;
            }
        }
        return false;
    }

    readN(userN: string, title: string) {

        let dir: string = "../P11/users" + userN;
        let titleJSON = removeSpaces(title);
        let JSONnote: string = dir + "/" + titleJSON + ".json";

        let content = fs.readFileSync(JSONnote);
        let userNote = JSON.parse(content.toString());

        let salida = new Note(userN, userNote.title, userNote.body, userNote.color);
        
        return salida;
    }

    listN(userN: string) {

        let dir: string = "../P11/users" + userN;
        let userList: Note[] = [];

        if (fs.existsSync(dir)) {
            fs.readdirSync(dir).forEach((note) => {
                let content = fs.readFileSync(dir + "/" + note);
                let userNote = JSON.parse(content.toString());

                let salida = new Note(userN, userNote.title, userNote.body, userNote.color);

                userList.push(salida);
            });
        }
        return userList;
    }
}
```

- **types.ts:**

Define los propios tipos para las peticiones y respuestas del cliente y servidor.

```
export type RequestType = {
    type: 'add' | 'modify' | 'remove' | 'read' | 'list' ;
    user: string;
    title?: string;
    body?: string;
    color?: string;
}

export type ResponseType = {
    type: 'add' | 'modify' | 'remove' | 'read' | 'list';
    success: boolean;
    notes?: Note[];
}
```

- **client.ts:**

Establece conexión con el puerto 60300 para, posteriormente, permitir al usuario enviar peticiones al servidor a través del tipo de datos que definimos como `requestNote` y haciendo uso de `yargs`. A continuación, el cliente procesa la información recibida del servidor, elige la "opción" correspondiente y finalmente imprime un mensaje de error o éxito. 

```
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
    client.write(JSON.stringify(requestNote) + '\n', (er) => {
        if(er) {
            console.log(chalk.red('ERROR en la petición cliente-servidor'));
        }
    });

    /**
     * Resultado de la petición cliente-servidor
     */
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
    client.on('error', (er) => {
        console.log(chalk.red('ERROR en la conexión'));
    });

}
```

- **eventEmitterClient.ts:**

Clase que hereda de eventEmitter. A diferencia de la parte del servidor que está incluida en la misma clase. 
```
export class MessageClient extends EventEmitter {

    constructor(connection: EventEmitter) {
        super();
        let wholeData = '';
        connection.on('data', (chunks) => {
            wholeData += chunks;
        });

        connection.on('end', () => {
            const req = JSON.parse(wholeData);
            this.emit('msg', req);
        });
    }
}
```

- **server.ts:**

Extiende de `EventEmitter` para poder recibir y enviar eventos a través de sockets. A continuación, establecerá la conexión y analizará con el `switch` que petición debe realizar a la clase `Command`.
```
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
```

## Conclusión

El desarrollo de esta práctica no ha concluido con el resultado esperado ya que contiene fallos con la comunicación entre sockets por parte del cliente.

## Enlaces

- [src](src)
- [docs](docs)
- [test](tests)