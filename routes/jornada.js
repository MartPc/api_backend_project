const {Router} = require('express')

const route = Router() 

//Importar métodos del controlador
const {jornadaGet, jornadaPost, jornadaPut, jornadaDelete} = require('../controllers/jornada')

route.get('/jornada', jornadaGet)

route.post('/jornada', jornadaPost)

route.put('/jornada', jornadaPut)

route.delete('/jornada', jornadaDelete)


module.exports = route