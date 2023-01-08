import express from 'express';
import cors from 'cors';
// import cookieParser from 'cookie-parser';
import connectDatabase from './src/config/connectDB'
import {initRouter} from './src/routes'

require('dotenv').config()
var cookieParser = require('cookie-parser')

const app = express()

app.use(cors({
    origin: process.env.REACT_APP_CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    exposedHeaders: ["set-cookie"],
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

initRouter(app)
connectDatabase()

const port = process.env.PORT || 8080
const listener = app.listen(port, () => {
    console.log('Server running on port ', port)
})