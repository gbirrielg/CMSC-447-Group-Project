import express from 'express'
import { getUser, getUsers, checkUserLogin, getRandSubmission, deleteSubmission, getCardById, getTypeCards, getThemeCards, getAnyCards, deleteCard, createUser, createCardAdmin, createCardUser } from './database.js'
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


app.get("/submissions", async (req, res) => {
    const card = await getRandSubmission()
    res.send(card)
})

app.delete("/submissions", async (req, res) => {
    const response = await deleteSubmission()
    res.send(response)
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


app.get("/cards", async (req, res) => {
    const cards = await getAnyCards()
    res.send(cards)
})


// Use for updating card.
// app.get("/cards/get/:id", async (req, res) => {
//     const arg = req.params.id
//     const card = await getCardById(Number(arg))
//     if (result){
//         res.status(20)
//     }
// })


app.delete("/cards/:id", async (req, res) => {
    const arg = req.params.id
    const result = await deleteCard(Number(arg))
    if (result){
        res.status(201).send(result)
    } else {
        res.status(404).send(result)
    }
})

app.patch("/cards/:id", async (req, res) => {
    const arg = req.params.id
    const card = await getCardById(Number(arg))
    if (card){
        res.status(201).send(card)
    } else {
        res.status(404).send(result)
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


app.post("/users/cards", async (req, res) => {
    const { username, type, theme, text1, text2 } = req.body
    const card = await createCardUser(username, type, theme, text1, text2)
    if (card){
        res.status(200).send(card)
    } else {
        res.status(500).send(card)
    }
})


app.post("/admin", async (req, res) => {
    const { type, theme, text1, text2 } = req.body
    const card = await createCardAdmin(type, theme, text1, text2)
    if (card){
        res.status(201).send(card)
    } else {
        res.status(500).send(card)
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