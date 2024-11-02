import express from 'express'
import { getUser, getUsers, getSpecificCards, getTypeCards, getThemeCards } from './database.js'
import e from 'express'

const app = express()
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

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})