import { Student } from "../models/students";

const student2 = new Student({
    nombre: 'Pablo',
    apellidos: 'Garcia',
    edad: 21,
    email: 'alu0103@mail.es',
    titulacion: 'Ingenieria Informatica',
    asignaturas: ['DSI', 'SSI'],
    NIF: '002345',
});

Student.updateOne({NIF: '002345'}).then((result) => {
    
})