const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolevalido  = async( rol = '') =>{
    const existeRol = await Role.findOne({rol});
    if( !existeRol ){
      throw new Error(`El rol ${ rol } no esta registrado en la BD`);
    }
  }

  const emailExiste = async(correo = '') =>{

    const email = await Usuario.findOne({correo});
    if( email ){
      throw new Error(`El correo ${ correo } ya esta registrado en la BD`);      
      }
    } 
    
    const existeUsuarioPorId = async(id) =>{

      const existeUsuario = await Usuario.findById(id);
      if( !existeUsuario ){
        throw new Error(`El Id no existe ${ id }`);      
        }
      }



  module.exports = {
    esRolevalido,
    emailExiste,
    existeUsuarioPorId
    }