import express from 'express';
import {join} from 'path';
import * as fs from 'fs';
import { spawn } from 'child_process';

/**
 * creamos constante servidor que devuelve objeto express
 */
const servidor = express();

//execmd
servidor.get('/execmd', (req, res) => {

    /**
    * servidor comprueba si existe ruta 'execmd' y en caso contrario devuelve '404'
    */
    if(!fs.existsSync('execmd')) {
        res.status(404).json({mensaje: 'error'});
    }

    /**
     * se comprueba que recibe 2 parámetros, si no los recibe: muestra error. En caso contrario, ejecutamos spawn con los parámetros que le pasamos
     */
    if(!req.query.cmd || !req.query.args) {
        return res.send({
            error: 'Comandos inválidos'
        });
    }else {
        /*
        const comand = spawn(req.query.cmd.toString(), [req.query.args.toString()]);
        return res.send({
            output: comand.stdout.pipe(process.stdout),
        });
        */
       const cmd1 = req.query.cmd as string;
       const args1 = req.query.args as string;
       let salida = '';

        const command = spawn(cmd1, args1.split(' '))
        command.stdout.on('data', (piece) => {
            salida += piece.toString();
            return res.send({
                output: salida
            })
        })

        //console.log(salida);
        /*
        return res.send({
            output: salida
        })
        */
    }
    

});

/**
 * conectamos el servidor al puerto 3000 y muestra mensaje
 */
servidor.listen(3000, () => {
    console.log('Servidor conectado en puerto 3000');
});