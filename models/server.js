const express = require('express')
var cors = require('cors')
const { dbConnection } = require('../database/config')
class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usersRoutePath = '/api/users'
        // Conexion a base datos
        this.conectarDb()
        // Middlewares
        this.middlewares()
        // Rutas
        this.routes()
    }
    async conectarDb(){
        await dbConnection()
    }
    middlewares(){
        // CORS
        this.app.use(cors())
        // Lectura y Parseo de Body
        this.app.use(express.json())
        // Directorio publico
        this.app.use(express.static('public'))
    }
    routes(){
        this.app.use(this.usersRoutePath, require('../routes/user'))
    }
    listen(){
        this.app.listen(this.port, () => console.log("Servidor corriendo en puerto", this.port))
    }
}

module.exports = Server