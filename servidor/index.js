const crypto = require("./crypto");

// JWT
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
var { expressjwt: expressJWT } = require("express-jwt");
const cors = require('cors');
const corsOpcoes = {
  //CLIENTE QUE FARÁ O ACESSO
  origin: "http://localhost:3000",
  //MÉTODOS QUE O CLIENTE PODE EXECUTAR
  methods: "GET,PUT,POST,DELETE",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true
}


var cookieParser = require('cookie-parser')

const express = require('express');
const { usuario } = require('./models');

const app = express();

app.set('view engine', 'ejs');

app.use(cors(corsOpcoes))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(cookieParser());
app.use(
  expressJWT({
    secret: process.env.SECRET,
    algorithms: ["HS256"],
    getToken: req => req.cookies.token
  }).unless({ path: ["/autenticar", "/logar", "/deslogar"], })
);

app.get('/autenticar', async function (req, res) {
  res.render('autenticar');
})

app.get('/usuarios/cadastrar', async function (req, res) {
  res.render('cadastrar')

})

app.post('/usuarios/cadastrar', async function (req, res) {
  try {
    //let userRepetido = await usuario.findOne({ where: { usuario: req.body.usuario } });
    if (await usuario.findOne({ where: { usuario: req.body.usuario } })) {
      res.status(500).send("O usuário já existe");
    } else {
        await usuario.create({
          usuario: req.body.usuario,
          senha: crypto.encrypt(req.body.senha),
        });
        console.log("criou")
        res.redirect("/usuarios/listar");
      }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao cadastrar usuário");
  }
});




app.get('/usuarios/listar', async function (req, res) {
  try {
    const list = await usuario.findAll();
    res.json(list)

  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao listar")
  }
})


app.get('/', async function (req, res) {
  res.render("home")
})

app.post('/logar', async function (req, res) {
  try {
    const user = await usuario.findOne({ where: { usuario: req.body.usuario } });
    let userSenha = crypto.decrypt(user.senha);
    if (req.body.senha === userSenha) {
      const id = user.id;
      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 300
      });
      console.log("Teste de achar")
      res.cookie("token", token, { httpOnly: true }).json({
        nome: user.usuario,
        token: token
      });
      
      //return res.json(user)
    } else{
      res.status(500).json({error: "Algum campo está errado"})
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao autenticar usuário");
  }
});

 

app.post('/deslogar', function (req, res) {
  res.cookie('token', null, { httpOnly: true });
  return res.json({
    deslogado: true
  })
})

app.listen(4000, function () {
  console.log('App de Exemplo escutando na porta 4000!')
});