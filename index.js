import express from 'express'
const app = express()
const port = process.env.PORT


app.listen(port, () => console.log(`I AM RUNNING ON ${port} and testing env files`))