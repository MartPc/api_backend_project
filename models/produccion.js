const { Schema, model } = require('mongoose')
const ProduccionesSchema = Schema({

    cliente: {
        type: String,
        validate: {
            validator: function(value){
                return /^[A-Za-z\s]+$/.test(value);
            },
            message: 'Solo se permiten letras'
        },
        required: [true, 'El cliente es requerido'],
        
    },
    numOrdenTrabajo: {
        type: String,
        unique: true,
        required: [true, 'La orden de trabajo es requerida']
    },
    fechaRegistro: {
        type: Date
    },
    fechaEntrega: {
        type: Date,
        required: [true, 'La fecha es requerida']
    },
    observaciones: {
        type: String,
        max: 500
    },

    // DETALLES DE PRODUCCIÓN

    referencia: {
        type: String,
        unique: true,
        required: [true, 'La referencia es requerida']
    },

    proceso: {
        type: String,
        required: true
    },

    cantProceso: {
        type: Number,
        validate: {
            validator: function(value){
                return /^[0-9]+$/.test(value);
            },
            message: 'Solo se permiten números'
        },
        required: [true, 'Las unids. son requeridas']
    },

    color: {
        type: String,
        required: [true, 'El color es requerido']
    },

    cantColor: {
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

    cantTalla: {
        type: Number,
        validate: {
            validator: function(value){
                return /^[0-9]+$/.test(value);
            },
            message: 'Solo se permiten números'
        },
        required: [true, 'La cantidad es requerida']
    },

    estado: {
        type: String,
        enum: ['En proceso', 'Terminado','Pendiente'],
        default: 'Pendiente'
    },

});

ProduccionesSchema.pre('save', function (next) {
    this.fechaRegistro = new Date();
    next();
  });

module.exports = model('Producciones', ProduccionesSchema);
