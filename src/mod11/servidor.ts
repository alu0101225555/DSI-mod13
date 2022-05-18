import {spawn} from 'child_process';
import * as net from 'net';

/**
 * Clase que ejerce de servidor
 */
export class servidor {

    constructor() {
        
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

    /**
     * Método run 
     * @param connection recibe un objeto socket 
     */
    run(connection: net.Socket) {

        console.log(`Cliente conectado`);

        let comandoTexto = '';

        connection.on('data', (parte) => {
            comandoTexto += parte;
        });


        /**
         * Evento 'end': una vez finaliza ejecuta el comando que ha recibido del cliente teniendo en cuenta posibles errores
         */
        connection.on('end', () => {
            const comando = JSON.parse(comandoTexto);

            /**
             * Ejecuta el comando y el parámetro que recibe del cliente
             */
            const ejecucion = spawn(comando.comando, comando.argumentos);

            console.log(`Comando: `, comando.comando);
            console.log(`Argumento: `, comando.argumentos);

            let salida = '';
            ejecucion.stdout.on('data', (piece) =>  {
                salida += piece.toString();
                //console.log(`result = ` + salida);
                //connection.write(salida);
            });

            //console.log(`Salida: `, salida)

            
            ejecucion.on('error', () => {
                connection.write(`ERROR en comando "${comando.comando}": NO EXISTE\n`, () => {
                    connection.end();
                });
            });

            /**
             * Una vez se cierra: ejecuta la salida generada por el comando
             */
            ejecucion.on('close', () => {
                console.log(`Comando ejecutado. Salida en el cliente.\n`);
                connection.write(`Salida del comando "${comando.comando}": ${salida}\n`, () => {
                    connection.end();
                });

                //if(codigo == 0) {
                    //connection.write(`Salida del comando "${comando.comando}": ${salida}\n`, () => {
                        //connection.end();
                    //});
                //} else {
                    //connection.write(`ERROR en salida del comando debido a los parámetros\n`, () => {
                        //connection.end();
                    //});
                //}
            });

        })

        /**
         * Si se cierra cliente: emite mensaje de cliente desconectado
         */
        connection.on('close', () => {
            console.log(`Cliente desconectado`);
        });

    }
}

const a = new servidor()