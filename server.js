const express = require('express')
const res = require('express/lib/response')
const app = express()

app.use(express.json())

const phonebook = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})

app.get('/info', (request, response) => {
    const calendarDate = new Date();

    response.write(`<p> Phonebook has info for ${phonebook.length} people. </p>`)
    response.write(`${calendarDate.toUTCString()}`)
    response.send();
})

app.get('/api/phonebook', (request, response) => {
    response.json(phonebook);
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})