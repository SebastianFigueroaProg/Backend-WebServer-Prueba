
const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { esRolevalido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middleware/validar-campos');

const router = Router();



router.get('/', usuariosGet);

  router.put('/:id',[
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRolevalido ),
    validarCampos
  ], usuariosPut);

  router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener mas de 6 letras').isLength({min: 6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste),
    check('rol').custom( esRolevalido),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    validarCampos
  ],usuariosPost);
  
  router.delete('/:id',[
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
  ], usuariosDelete);

  router.patch('/', usuariosPatch);


  module.exports = router;