import express from 'express'
import router from './route'
import connectDb from './connections/type-orm'
import cors from 'cors'
import bodyParser from 'body-parser'
import config from './config'

const app = express()
const corsOptions = {
    origin: config.clientUrl,
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))

connectDb()
app.use(bodyParser.json())

app.use('/', router)

app.listen(4000)
// eslint-disable-next-line no-console
console.log('Running a API server at http://localhost:4000')
