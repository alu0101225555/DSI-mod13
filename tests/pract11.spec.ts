import "mocha";
import {expect} from "chai";
import {Note} from "../src/P11/note";

describe('Test P11', () => {

    let nota = new Note("alu01", "prueba1", "esto es la prueba 1", "green")
    it('getUser()', () => {
        expect(nota.getUser()).to.be.equal("alu01");
    })

    it('getTitle()', () => {
        expect(nota.getTitle()).to.be.equal("prueba1");
    })

    it('getBody()', () => {
        expect(nota.getBody()).to.be.equal("esto es la prueba 1");
    })

    it('getColor()', () => {
        expect(nota.getColor()).to.be.equal("green");
    })
})