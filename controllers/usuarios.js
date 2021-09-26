const { response, request, query } = require('express');

const bcrypyjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = async(req, res=response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado:true };

    const [total, usuarios] = await Promise.all( [
      Usuario.countDocuments(query),
      Usuario.find(query)
        .skip(Number( desde ))
        .limit(Number( limite ))
    ]);


    res.json({
        total,
        usuarios
    });
  }
  
  const usuariosPost = async(req, res=response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});


    //encriptar contraseña
    const salt = bcrypyjs.genSaltSync();
    usuario.password = bcrypyjs.hashSync(password, salt);

    //Guardar en base de datos

    await usuario.save();

    res.json({
        usuario
    });
  }

  const usuariosPut = async(req, res=response) => {

    const {id} = req.params;
    const { _id, password, google, correo, ...resto} = req.body;

    //TODO Validar contra base de datos 
    if(password){
      //Encriptar la contraseña
      const salt = bcrypyjs.genSaltSync();
      resto.password = bcrypyjs.hashSync(password, salt); 
    }
    
    const usuario = await Usuario.findByIdAndUpdate(id, resto);



    res.json({
        msg: 'put API - controlador',
        usuario
    });
  }

  const usuariosPatch = (req, res=response) => {
    res.json({
        msg: 'patch API - controlador'
    });
  }

  const usuariosDelete = async(req, res=response) => {

    const { id } = req.params;

    //Fisicamente lo Borramos
    // const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json(usuario);
  }

  module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete

  }

