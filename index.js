const  express = require('express')
const uuid = require('uuid')
const port = 3000
const app = express()
app.use(express.json())

/* // -Query params => meusite.com?nome=rodolfo&age=28  //filtros

app.get('/users', (request, response) => {
    const {name, age} = request.query
    
    
    console.log(name, age)
    return response.json({name: name, age: age}) // Se o nome do objeto for igual ao valor, podera escrever somento o nome Ex(name, age)
})
*/

/* // - Route params => /users/2 // BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO

app.get('/users/:id', (request, response) => {
    
    const {id} = request.params
    console.log(id)
    return response.json({id})
})
*/

/* // - Resquest body => {"name":"Rodolfo", "age"}

app.get('/users',(request, response) =>{

    const {name, age} = request.body

    return response.json({name, age})
})
*/

const users = []
const check_user_id = (request, response, next) => {
    const {id} = request.params
    
    const index = users.findIndex(user => user.id === id)
    
    if (index < 0) {
        return response.status(404).json({error: "User not found"})
    }

    request.user_index = index
    request.user_id = id

    next()
}

// Buscando usuario no banco de dados
app.get('/users',(request, response) =>{
    return response.json(users)
})

// Criando um usuario no banco de dados
app.post('/users',(request, response) =>{
    const {name, age} = request.body

    const user = {id:uuid.v4(), name, age}
    
    users.push(user)

    return response.status(201).json(user)
})

// Atualizar usuario ezistente
app.put('/users/:id',check_user_id,(request, response) =>{
    const {name, age} = request.body
    const index = request.user_index
    const id = request.user_id

    const update_user ={id, name, age}
    
    users[index] = update_user

    return response.json(update_user)
})

// Deletando usuario cadastrado no banco de dados

app.delete('/users/:id',check_user_id,(request, response) =>{
    const index = request.user_index

    users.splice(index,1)

    return response.status(204).json()
})

// Middleware => INTERCEPTADOR => Tem o poder de parar ou alterar dados da requisição






app.listen(port, () =>{
    console.log(`Server started on port ${port}`)
})