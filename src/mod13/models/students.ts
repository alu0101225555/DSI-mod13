import {Document, Schema, model} from 'mongoose';
import isEmail from 'validator/lib/isEmail';


/**
 * Interfaz de un estudiante
 */
interface StudentDocumentInterface extends Document {
    nombre: string,
    apellidos: string[],
    edad: number,
    email: string,
    titulacion: string,
    asignaturas: string[],
    NIF: string
}

/**
 * Esquema de un estudiante mongoose
 */
const StudentSchema = new Schema<StudentDocumentInterface>({
    nombre: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate: (value: string) => {
            if (!value.match(/^[A-Z]/)) {
                throw new Error('The name of the student must start with a capital letter');
            }
        }
    },
    apellidos: {
        type: [String],
        required: false,
        trim: true,
    },
    edad: {
        type: Number,
        required: false,
        trim: true,
    },
    email: {
        type: [String],
        required: false,
        trim: true,
        validate: (value: string) => {
            if(!isEmail(value)) {
                throw new Error('Email not correct');
            }
        }
    },
    titulacion: {
        type: String,
        required: false,
        trim: true,
    },
    asignaturas: {
        type: [String],
        required: false,
        trim: true,
    },
    NIF: {
        type: Number,
        required: true,
        trim: true,
    },
});

export const Student = model<StudentDocumentInterface>('Student', StudentSchema);