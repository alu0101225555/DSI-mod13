import { Student } from "../models/students";


Student.deleteOne({NIF: '98765'}).then((result) => {
    console.log('Data deleted');
}).catch((error) => {
    console.log(error);
})