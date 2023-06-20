const {Router} = require('express')

const route = Router() 

//Importar métodos del controlador
const {produccionGet, produccionPost, produccionPut, produccionDelete} = require('../controllers/produccion')

route.get('/produccion', produccionGet)

route.post('/produccion', produccionPost)

route.put('/produccion', produccionPut)

route.delete('/produccion', produccionDelete)


module.exports = route