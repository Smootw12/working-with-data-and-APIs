const { response } = require('express')
const express = require('express')
const Datastore = require('nedb')
const app = express()
app.listen(3000, () => {
    console.log('listening at 3000')
})
app.use(express.static('public'))
app.use(express.json())
const database = new Datastore('database.db')
database.loadDatabase()
app.post('/api', (request, response) => {
    const data = request.body
    database.insert(data)
    response.json(data)
})