const Role = require('../models/role')
const Usuario = require('../models/usuario')

const esRolValido = async (rol = '') => {
  const existeRol = await Role.findOne({
    rol
  })
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la DB`)
  }
}

const emailExiste = async (correo = '') => {
  const existe = await Usuario.findOne({
    correo
  })
  if (existe) {
    throw new Error(`El correo ${correo} ya está registrado en la DB.`)
  }
}

const existeUsuarioporID = async (id) => {
  const existeUsuario = await Usuario.findById(id)
  if (!existeUsuario) {
    throw new Error(`El usuario con ID: ${id}, no existe en la DB.`)
  }
}


module.exports = {
  esRolValido,
  emailExiste,
  existeUsuarioporID
}