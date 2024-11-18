import express from 'express'
import { getUser, getUsers, checkUserLogin, getTypeCards, getThemeCards, createUser } from './database.js'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())


app.get("/users", async (req, res) => {
    const allUsers = await getUsers()
    res.send(allUsers)
})

app.get("/users/:name", async (req, res) => {
    const username = req.params.name
    const user = await getUser(username)
    res.send(user)
})

// This API call is used to retrieve a user given their username and password
// If nothing is returned, then the user with the given credentials does not exist
app.get("/users/:name/:pass", async (req, res) => {
    const username = req.params.name
    const password = req.params.pass
    const user = await checkUserLogin(username, password);
    res.send(user)
})

// This API call is used to retrieve a card of a specific type or theme.
app.get("/cards/:specify", async (req, res) => {
    const arg = req.params.specify
    if (arg.length == 3) {
        const cards = await getTypeCards(arg)
        res.send(cards)
    } else {
        const cards = await getThemeCards(arg)
        res.send(cards)
    }
})


app.post("/users", async (req, res) => {
    const { username, password } = req.body
    const user = await createUser(username, password)
    if (user){
        res.status(201).send(user)
    } else {
        res.status(409).send(user)
    }
})

// app.get("/cards/:type/:theme", async (req, res) => {
//     const type = req.params.type
//     const theme = req.params.theme
// })


// Catching errors
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

// Setting server up to listen on port 8080
app.listen(8080, () => {
    console.log('Server is running on port 8080')
})