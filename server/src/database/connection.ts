import knex from 'knex'
import path from 'path'

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    useNullAsDefault: true,
})

export default connection

// __dirname sempre retorna o caminho do diretorio q chama por ele

//migrations: é o historico do banco de dados