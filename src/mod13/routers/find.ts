import { Student } from "../models/students";

/**
 * Búsqueda de un estudiante por NIF
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

Student.findOne({NIF: '01234567'}).then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
})