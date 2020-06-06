import express from 'express'
import { celebrate, Joi } from 'celebrate'

import knex from './database/connection'
import multer from 'multer'
import multerConfig from './config/multer'

import PointsController from './controllers/PointsController'
import ItemsController from './controllers/ItemsController'

const itemsController = new ItemsController()
const pointsController = new PointsController()

const routes = express.Router()
const upload = multer(multerConfig)

routes.get('/items', itemsController.index)

routes.get('/points', pointsController.index)
routes.get('/points/:id', pointsController.show)

routes.post(
    '/points',
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(), //pesquisar por regex
        })
    }, {
        abortEarly: false // faz todas as validações ao msm tempo, mostrando todas as mensagens e todos campos q deram falha
    }),
    pointsController.create)

//index se for uma listagem, show se for exibir um unico registro
// create, update e delete

export default routes