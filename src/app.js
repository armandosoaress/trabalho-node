const express = require('express');
const app = express();

app.use(express.json());

const tasks_routes = require('./routes/task_routes');
app.use('/tasks', tasks_routes);

//criar a rota de usuários


app.get("/user/:user/:senha?",function(req,res) {
    var user = req.params.user;
    var senha = req.params.senha;
    const userbd = [
        { id: 1, usersbd: 'armando ', senha: '123' },
        { id: 2, usersbd: 'pedro ', senha: '1234' },
      ];
       b = user;
       a = userbd[0].usersbd;

for (let index = 0; index < userbd.length; index++) {
      if (a==b) {
            res.send('teste');
        }
}

    if (user&&senha) {
        res.send('user: '+user +'<br>senha: '+ senha);
    } else {
        res.send(user);
    }
});




app.get('*', (req, res) => {
  res.status(404).send({ error: "Route doesn't exist" });
});

module.exports = app;