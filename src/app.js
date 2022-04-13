const express = require('express');
const app = express();

app.use(express.json());

const tasks_routes = require('./routes/task_routes');
app.use('/tasks', tasks_routes);

//criar a rota de usuários
const rota = require('./routes/rota_usuario');
app.use('/usuario', rota);



app.get('*', (req, res) => {
  res.status(404).send({ error: "Route doesn't exist" });
});

module.exports = app;