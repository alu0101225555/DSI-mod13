import './db/mongoose';
import { Student } from "./models/students";

const student = new Student({
    nombre: 'Noelia',
    apellidos: 'Ibanez Silvestre',
    edad: 21,
    email: 'alu0101@mail.es',
    titulacion: 'Ingenieria Informatica',
    asignaturas: ['DSI', 'SSI'],
    NIF: '01234567',
});

const student1 = new Student({
    nombre: 'Carla',
    apellidos: 'Lopez',
    edad: 21,
    email: 'alu0102@mail.es',
    titulacion: 'Matematica',
    asignaturas: ['Algebra', 'Calculo'],
    NIF: '98765',
});

