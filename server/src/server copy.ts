import express, { query } from 'express'

const app = express()

app.use(express.json())

//request params:  :id  parametros que vem na propria rota que indentificam um recurso

//query params: ?search=on   parametros que vem na propria rota, geralmente opcionais, normalmente para
// filtros, paginação e outras coisas nao tao importantes

// request body: parametros para criação/atualização de informações     ps.: pra usar uma req json do body,
// tem q importar o app.use(express.json())

const users = [
    'Diego',
    'Cleiton',
    'Robson'
]

app.get('/users', (req, res)=>{
    /* Minha tentativa
    const search = String(req.query.search)
    const result = users.filter((user)=> user.toLowerCase().match(search))

    console.log('listagem de usuários')
    return result.length > 0? res.json(result): res.json(users)  */
    
    const search = String(req.query.search)
    const filteredSearch = search? users.filter((user)=> user.includes(search)) : users

    console.log('listagem de usuários')
    return res.json(filteredSearch)
})

app.get('/users/:id', (req, res)=> {
    /* meu jeito errado ksks
    const id = req.params.id // id por convesão podia ser qq coisa, portanto q tivess qq coisa na rota tmb :qqcoisa
    return res.json(users.filter((_, i)=> i==parseInt(id))) */
    
    const id = Number(req.params.id)
    const user = users[id]
    res.json(user)
})

app.post('/users', (req, res)=>{
    const data = req.body
    console.log(data)

    const user = {
        name: data.name,
        email: data.email
    }
    return res.json(user)
})

app.listen(3333)