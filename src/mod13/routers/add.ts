import { Student } from "../models/students";

/**
 * Creación de un estudiante
 */

const student = new Student({
    nombre: 'Noelia',
    apellidos: 'Ibanez Silvestre',
    edad: 21,
    email: 'alu0101@mail.es',
    titulacion: 'Ingenieria Informatica',
    asignaturas: ['DSI', 'SSI'],
    NIF: '01234567',
});

student.save().then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
})

