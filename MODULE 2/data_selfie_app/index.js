const express = require('express')
const datastore = require('nedb')
const app = express()
app.listen(3000, () => {
    console.log('listening port 3000')
})
app.use(express.static('public'))
app.use(express.json({limit: '1mb'}))
const database = new datastore('database.db')
database.loadDatabase()
app.post('/api', (request, response) => {
    data = request.body
    data.timestamp = Date.now()
    data.status = 'success'
    database.insert(data)
    response.json(data)
})
app.get('/api', (request,response) => {
    database.find({}, (err,docs) => {
        if(err){
            response.end()
            return
        }
        response.json(docs)
    })
})