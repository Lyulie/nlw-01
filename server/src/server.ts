import express, { query } from 'express'
import routes from './routes'
import cors from 'cors'
import { errors } from 'celebrate'

import path from 'path'

import connection from './database/connection'

const app = express()

app.use(cors())  // ao nao passar parametros aceita qualquer dominio www
// app.use(cors({
//     origin:'www'
// }))
app.use(express.json())
app.use(routes)

app.use('/uploads', express.static(path.resolve(__dirname, '..','uploads')))

app.use(errors())

app.listen(3333)