import { FORMERR } from 'dns';
import yargs from 'yargs';
import { OperacionesNotas } from '../ejercicio3/P9/OpcionesNota';

const FM = new OperacionesNotas();
/**
 * Comando 'watch': observa cambios en directorio
 */
 yargs.command( {
    command: 'watch',
    describe: 'Observa cambios en un fichero',
    builder: {
        route: {
            describe: 'Ruta para observar',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if(typeof argv.route === "string") {
            FM.watch(argv.route);
        }else {
            console.log(`ERROR`);
        }
    }
});

yargs.parse();