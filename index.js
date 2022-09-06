const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

let notes = [
  {
    id: 1,
    content: 'Programador que se respeta debe entender todo el codigo que Ctrl c y Ctrl v',
    date: '2021-08-30T17:30:31.0982',
    important: true
  },
  {
    id: 2,
    content: 'Pensar antes de actuar evita errores y brinda tiempo',
    date: '2021-08-30T17:30:31.0982',
    important: true
  },
  {
    id: 3,
    content: 'Sí estas dispusto a luchar por ello, estadisticamente estas mas cerca de concretarlo',
    date: '2021-08-30T17:30:31.0982',
    important: false
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hola estás en / </h1>')
})

app.get('/notes', (request, response) => {
  response.json(notes)
})

app.get('/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  response.json(note)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

app.post('/notes', (request, response) => {
  const note = request.body
  if (!note || !note.content) {
    response.status(400).json({
      error: 'note.content is missing'
    })
  } else {
    const ids = notes.map(note => note.id)
    const maxId = Math.max(...ids)
    console.log(...ids)
    const newNote = {
      id: maxId + 1,
      content: note.content,
      date: new Date().toISOString(),
      important: typeof note.important !== 'undefined' ? note.important : false

    }
    notes = [...notes, newNote]
    response.json(newNote)
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => { console.log(`Server is runnin on port ${PORT}`) })
