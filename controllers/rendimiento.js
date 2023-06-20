//IMPORTAR PAQUETES REQUERIDOS DE NODE
const {response, json} = require('express')

//IMPORTAR MODELO 
const Rendimientos = require('../models/rendimiento')


//MÉTODO GET (CONSULTAR) 
const rendimientoGet = async (req, res = response) =>{
    const {nombre} = req.query //Desestructuración

    //Consultar todos los usuarios
    const rendimiento = await Rendimientos.find()
    /*.find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
      });
*/
    res.json({
        rendimiento
    })   
}

//MÉTODO POST (INSERTAR)
const rendimientoPost = async (req, res = response) => {
    const body = req.body;

    try {
        const rendimiento = new Rendimientos(body);
        await rendimiento.save();

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

const rendimientoPut = async (req, res = response) => {
    const {
      _id,
      numOrdenTrabajo,
      referencia,
      proceso,
      empleado,
      talla,
      cantidad,
      fechaRegistro,
      horaInicial,
      horaFinal,
      estado
      
    } = req.body;
    let mensaje = '';
  
    try {
      const rendimiento = await Rendimientos.findByIdAndUpdate(
        {_id:_id},
        {
            numOrdenTrabajo:numOrdenTrabajo,
            referencia:referencia,
            proceso:proceso,
            empleado:empleado,
            talla:talla,
            cantidad:cantidad,
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
const rendimientoDelete = async (req, res = response) => {
    const { _id } = req.body;
  
    try {
      const rendimiento = await Rendimientos.findByIdAndDelete(_id);
      if (!rendimiento) {
        return res.status(404).json({ error: 'Producción no encontrada' });
      }
      res.json({ message: 'La eliminación se efectuó exitosamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la producción' });
    }
  };

module.exports = {
    rendimientoGet,
    rendimientoPost,
    rendimientoPut,
    rendimientoDelete
}


