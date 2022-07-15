const cors = require('cors')
const axios = require('axios')
const express = require('express')
const app = express()
app.listen('3000')
//middleware
app.use(express.json())
app.use(cors())

app.route('/').get((req, res)=>res.send('oi'))
app.route('/sobre').get((req, res)=>res.send('sobre'))
app.route('/postar').post((req,res)=>res.send(req.body))


let users = [{
    id: 1,
    nome: "André",
    especialidade: "programação",
    avatar: "https://picsum.photos/200/300"
},{
    id: 2,
    nome: "Fernanda",
    especialidade: "Farmácia",
    avatar: "https://picsum.photos/200/300"
}]

app.route('/users').get((req, res)=>{
    res.send(users)
})
app.route('/user/:id').get((req, res)=>{
    const userId = req.params.id;
    let usuario = users.find(user=>Number(user.id)===Number(userId))
    if (!usuario) {
        let usuario = {
            nome : "Não encontrado",
            especialidade: "N/A",
            avatar: "https://img.freepik.com/vetores-gratis/erro-404-com-ilustracao-do-conceito-de-paisagem_114360-7888.jpg?w=2000"
      
        }
              return res.json(usuario)
      }
    res.json(usuario)
})
app.route('/new').post((req, res)=>{
    const lastId = users[users.length - 1].id
    users.push({
        id:lastId + 1,
        nome: req.body.nome,
        especialidade: req.body.especialidade,
        avatar: req.body.avatar,

    })
    res.send('usuário adicionado...')
})

app.route('/editar/:id').put((req, res)=>{
    const userId = req.params.id;
    let usuario = users.find(user=>Number(user.id)===Number(userId))
   
    if (!usuario) {
        return res.json('User not found!')
      }

      const updatedUser = {
        ...usuario,
        nome: req.body.nome,
        especialidade: req.body.especialidade,
        avatar: req.body.avatar,
        
      }

      users = users.map(user => {
        if (Number(user.id) === Number(userId)) {
          user = updatedUser
        }
        return user
      })
    
      res.json("Updated user")
    })


app.route('/del/:id').delete((req, res)=>{
    const userId = req.params.id;
    let index = users.findIndex(user=>Number(user.id)===Number(userId))
   
    users.splice(index,1)
    res.send('usuario deletado')
})

app.route('/autor').get((req, res)=>{
    axios.get("https://api.github.com/users/andrer54")
        .then(response=>res.send(response.data))
        .catch(erro=>console.log(erro))
})