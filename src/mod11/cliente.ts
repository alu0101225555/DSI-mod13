import * as net from 'net';

/**
 * Clase que ejerce de cliente
 */
export class cliente {

    constructor() {}

    run() {

        /**
         * Si no recibe el nº de parámetros adecuados, emite error
         */
        if(process.argv.length < 3) {
            console.log(`ERROR. No se ha especificado comando\n`);
        } else {
            const client = net.connect({port: 60300});

            const comando = {
                comando: process.argv[2],
                argumentos: [''],
            };

            comando.argumentos.pop();
            

            for(let i = 3; i < process.argv.length; i++) {
                comando.argumentos.push(process.argv[i]);
            }
            

            /**
             * stringify recibe un objeto JSON y devuelve la representación en cadena del JSON
             */
            client.write(JSON.stringify(comando), () => {
                client.end();
            });

            /**
             * Imprime el resultado que recibe
             */
            let resultadoTexto = '';
            client.on('data', (parte) => {
                resultadoTexto += parte;
            });
            
            //console.log(resultadoTexto);
            client.on('end', () => {
                console.log(resultadoTexto);
            });
            
        }

    }
}

const c = new cliente();
c.run();