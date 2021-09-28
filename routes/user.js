const {
  Router
} = require('express')
const {
  check
} = require('express-validator')
const {
  usersGet,
  userPost,
  userPut,
  userDelete
} = require('../controllers/user')
const {
  esRolValido,
  emailExiste,
  existeUsuarioporID
} = require('../helpers/db-validators')
const {
  validarCampos
} = require('../middlewares/validar-campos')

const router = Router()

router.get('/', usersGet)

router.put('/:id', [
  check('id', 'No es un id válido').isMongoId(),
  check('id').custom(existeUsuarioporID),
  check('rol').custom(esRolValido),
  validarCampos
], userPut)

router.post('/', [
  check('nombre', 'El nombre es obligatorio').notEmpty(),
  check('correo', 'El correo no es válido').isEmail(),
  check('password', 'El password debe tener más de 6 dígitos').isLength({
    min: 6
  }),
  check('correo').custom(emailExiste),
  // check('rol', 'El rol no es válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('rol').custom(esRolValido),
  validarCampos
], userPost)

router.delete('/:id', [
  check('id', 'No es un id válido').isMongoId(),
  check('id').custom(existeUsuarioporID),
  validarCampos
], userDelete)

module.exports = router