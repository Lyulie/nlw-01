import express from 'express'
import knex from './database/connection'

const routes = express.Router()

routes.get('/items', async (req, res)=> {
    const items = await knex('items').select('*')

    const serialized = items.map(item => {
        return {
            id: item.id,
            title: item.title,
            image_url: `http://localhost:3333/uploads/${item.image}`
        }
    })

    res.json(serialized)
})

routes.post('/points', async (req, res)=> {
    const {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        items
    } = req.body

    const trx = await knex.transaction()  //substitui o knex por trx caso tenha multiplos inserts no
                                        // banco de dados, assim o proximo soh executa depois do primeiro

    const point = {
        image: 'image-fake',
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf
    }

    const insertedIds = await trx('points').insert(point)

    const point_id = insertedIds[0]

    const pointItems = items.map((item_id:number) => {
        return {
            item_id,
            point_id,
        }
    })

    await trx('point_items').insert(pointItems)

    res.json({
        id: point_id,
        ...point
    })
})



export default routes