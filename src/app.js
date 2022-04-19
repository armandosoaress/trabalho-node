const express = require('express');
const app = express();

app.use(express.json());

const tasks_routes = require('./routes/task_routes');
app.use('/tasks', tasks_routes);

//criar a rota de usuários com o que eu exportei de lá, eu n botei 
// o export com o msm node que recebe aqui pq quando
// eu coloco o endereco da roda ele pega td que botei no export

const rota = require('./routes/rota_usuario');
app.use('/usuario', rota);



app.get('*', (req, res) => {
  res.status(404).send({ error: "Route doesn't exist" });
});

module.exports = app;