/**
 * Clase que define la estructura de una nota
 */
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