const { Schema, model } = require('mongoose')
const JornadaSchema = Schema({

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
        enum: ['Cancelado','Pendiente'],
        default: 'Pendiente'
    }    
});

JornadaSchema.pre('save', function (next) {
    this.fechaRegistro = new Date();
    next();
  });

module.exports = model('Jornadas', JornadaSchema);
