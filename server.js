const express = require('express')
const res = require('express/lib/response')
const app = express()

app.use(express.json())

let phonebook = [
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

app.get('/api/phonebook/:id', (request, response) => {
    const id = Number(request.params.id);
    const phonePage = phonebook.find(phone => phone.id === id);
    if (phonePage) {
        response.json(phonePage);
    } else {
        response.status(404).end();
    }
})

app.delete('/api/phonebook/:id', (request, response) => {
    const id = Number(request.params.id)
    phonebook = phonebook.filter(note => note.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    //Generate random ID from min to max.
    const min = 1;
    const max = 99999;
    const newId = Math.floor(Math.random() * (max - min + 1) + min);

    const newPerson = request.body;

    newPerson.id = newId;

    //Name or Number missing.
    if (!newPerson.number || !newPerson.name) {
        return response.status(400).json({
            error: 'number or name missing'
        })
    }

    //No duplicate names allowed in phonebook.
    if (phonebook.find(phone => phone.name === newPerson.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    phonebook = phonebook.concat(newPerson);

    response.json(newPerson);
})


const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})