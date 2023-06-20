const {Router} = require('express')

const route = Router() 

//Importar métodos del controlador
const {rendimientoGet, rendimientoPost, rendimientoPut, rendimientoDelete} = require('../controllers/rendimiento')

route.get('/rendimiento', rendimientoGet)

route.post('/rendimiento', rendimientoPost)

route.put('/rendimiento', rendimientoPut)

route.delete('/rendimiento', rendimientoDelete)


module.exports = route