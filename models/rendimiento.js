const { Schema, model } = require('mongoose')
const RendimientosSchema = Schema({

    numOrdenTrabajo: {
        type: String,
        unique: true,
        required: [true, 'La orden de trabajo es requerida']
    },

    referencia: {
        type: String,
        unique: true,
        required: [true, 'La referencia es requerida']
    },

    proceso: {
        type: String,
        required: true
    },

    empleado: {
        type: String,
        validate: {
            validator: function(value){
                return /^[A-Za-z\s]+$/.test(value);
            },
            message: 'Solo se permiten letras'
        },
        required: [true, 'El cliente es requerido'],
        
    },
    cantidad: {
        type: Number,
        validate: {
            validator: function(value){
                return /^[0-9]+$/.test(value);
            },
            message: 'Solo se permiten números'
        },
        required: [true, 'La cantidad es requerida']
    },
    talla: {
        type: String,
        required: [true, 'La talla es requerida'],
        enum: ['S','M','L','XL']
        
    },
    fechaRegistro: {
        type: Date
    },

    horaInicial: {
        type: String,
        required: [true, 'La hora es requerida']
    },
    horaFinal: {
        type: String,
        required: [true, 'La hora es requerida']
    },
    estado: {
        type: String,
        enum: ['En proceso', 'Terminado'],
        default: 'Pendiente'
    }
});

RendimientosSchema.pre('save', function (next) {
    this.fechaRegistro = new Date();
    next();
  });

module.exports = model('Rendimientos', RendimientosSchema);
