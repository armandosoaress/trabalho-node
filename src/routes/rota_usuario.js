const express = require('express');

const rotausuario = express.Router();

const usuarios = [
  { id: 1, usuario: 'armando ', senha: '123' },
  { id: 2, usuario: 'pedro ', senha: '1234' },
  { id: 3, usuario: 'jose ', senha: '1234' },
];
///////////////////////////////////////////////////////////////
const generateId = () => {
  return usuarios[usuarios.length - 1].id + 1;
}
//////////////////////////////////////////////////////////////
const getusuario = (req, res, next) => {
  const { id } = req.params;
  const usuario = usuarios.find((usuario) => usuario.id == id);
  if (!usuario) {
    return res.status(404).send({ error: 'Task not found' });
  };
  req.usuario = usuario;
  next();
}
///////////////////////////////////////////////////////////////
const isValidBody = (req, res, next) => {
  let validFields = ['usuario', 'senha'];

  Object.keys(req.body).forEach(key => {

    if (!validFields.includes(key)) {
      return res.status(400).send({ error: 'Invalid body' });
    }

    if (req.body[key] === undefined) {
      return res.status(400).send({ error: 'Missing fields' });
    };
  });
  next();
};
///////////////////////////////////////////////////////////////

////LISTAR////
rotausuario.get('/', (req, res) => {
  res.json(usuarios);
});
////ANDLISTAR////

////DELETAR////
rotausuario.delete('/:id', (req, res) => {
  const { id } = req.params;
  const usuariosid = usuarios.findIndex(usuarios => usuarios.id === parseInt(id));
  if (usuariosid < 0) {
    return res.status(404).send({ error: 'usuariosio not found' });
  }
  usuarios.splice(usuariosid, 1);
  return res.status(204).send();
});
////ANDDELETAR////

////ADICIONAR////
rotausuario.post('/',isValidBody, (req, res) => {
  const { usuario } = req.body;
  const { senha } = req.body;
  
  if (!usuario) {
    return res.status(400).send({ error: 'You must provide a description' });
  }
  const novosusuario ={
    id: generateId(),
    usuario,
    senha
    };
  
  usuarios.push(novosusuario);
  res.status(201).json(novosusuario);
});
////ANDADICIONAR////

////EDITAR////
rotausuario.put('/:id', isValidBody, getusuario, (req, res) => {
  const { usuario: foundusuario } = req;
  Object.assign(foundusuario, req.body);
  return res.send(foundusuario);
});
////ANDEDITAR////



module.exports = rotausuario;