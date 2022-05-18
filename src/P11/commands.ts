import {Note} from './note';
import * as fs from 'fs';
import { skipValidation } from 'yargs';

export function removeSpaces(cadena: string) {
    let result: string = cadena.replace(/\s/g,"");
    return result;
}

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