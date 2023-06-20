//IMPORTAR PAQUETES REQUERIDOS DE NODE
const {response, json} = require('express')

//IMPORTAR MODELO 
const Jornadas = require('../models/jornada')


//MÉTODO GET (CONSULTAR) 
const jornadaGet = async (req, res = response) =>{
    const {nombre} = req.query //Desestructuración

    //Consultar todos los usuarios
    const jornada = await Jornadas.find()
    /*.find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
      });
*/
    res.json({
        jornada
    })   
}

//MÉTODO POST (INSERTAR)
const jornadaPost = async (req, res = response) => {
    const body = req.body;

    try {
        const jornada = new Jornadas(body);
        await jornada.save();

        res.json({
            msg: 'La inserción se realizó exitosamente'
        });
    } catch (error) {
        console.error(error);

        if (error.name === 'ValidationError') {
            const mensajesError = Object.values(error.errors).map(val => val.message);

            res.status(400).json({
                errores: mensajesError
            });
        } else {
            res.status(500).json({
                msg: 'Ocurrió un error en el servidor'
            });
        }
    }
};


//MÉTODO PUT (ACTUALIZAR)

const jornadaPut = async (req, res = response) => {
    const {
      _id,
      empleado,
      fechaRegistro,
      horaInicial,
      horaFinal,
      estado
      
    } = req.body;
    let mensaje = '';
  
    try {
      const jornada = await Jornadas.findByIdAndUpdate(
        {_id:_id},
        {
            empleado:empleado,
            fechaRegistro:fechaRegistro,
            horaInicial:horaInicial,
            horaFinal:horaFinal,
            estado:estado
        }
      )
      mensaje = 'La modificación se efectuó exitosamente';
    } catch (error) {
      mensaje = 'Se presentaron problemas en la modificación.';
    }
  
    res.json({
      mensaje
    })
  };
  
//MÉTODO DELETE (ELIMINAR)
const jornadaDelete = async (req, res = response) => {
    const { _id } = req.body;
  
    try {
      const jornada = await Jornadas.findByIdAndDelete(_id);
      if (!jornada) {
        return res.status(404).json({ error: 'Producción no encontrada' });
      }
      res.json({ message: 'La eliminación se efectuó exitosamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la producción' });
    }
  };

module.exports = {
    jornadaGet,
    jornadaPost,
    jornadaPut,
    jornadaDelete
}


