//IMPORTAR PAQUETES REQUERIDOS DE NODE
const {response, json} = require('express')

//IMPORTAR MODELO 
const Producciones = require('../models/produccion')


//MÉTODO GET (CONSULTAR) 
const produccionGet = async (req, res = response) =>{
    const {nombre} = req.query //Desestructuración

    //Consultar todos los usuarios
    const produccion = await Producciones.find()
    /*.find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
      });
*/
    res.json({
        produccion
    })   
}

//MÉTODO POST (INSERTAR)
const produccionPost = async (req, res = response) => {
    const body = req.body;

    try {
        const produccion = new Producciones(body);
        await produccion.save();

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

const produccionPut = async (req, res = response) => {
    const {
      _id,
      cliente,
      numOrdenTrabajo,
      fechaRegistro,
      fechaEntrega,
      observaciones,
      estado,
      referencia,
      proceso,
      cantProceso,
      color,
      cantColor,
      talla,
      cantTalla
    } = req.body;
    let mensaje = '';
  
    try {
      const produccion = await Producciones.findByIdAndUpdate(
        {_id:_id},
        {
          cliente:cliente,
          numOrdenTrabajo:numOrdenTrabajo,
          fechaRegistro:fechaRegistro,
          fechaEntrega:fechaEntrega,
          observaciones:observaciones,
          estado:estado,
          referencia:referencia,
          proceso:proceso,
          cantProceso:cantProceso,
          color:color,
          cantColor:cantColor,
          talla:talla,
          cantTalla:cantTalla
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
const produccionDelete = async (req, res = response) => {
    const { _id } = req.body;
  
    try {
      const produccion = await Producciones.findByIdAndDelete(_id);
      if (!produccion) {
        return res.status(404).json({ error: 'Producción no encontrada' });
      }
      res.json({ message: 'La eliminación se efectuó exitosamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la producción' });
    }
  };

module.exports = {
    produccionGet,
    produccionPost,
    produccionPut,
    produccionDelete
}


