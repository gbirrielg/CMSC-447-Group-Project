import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise()

export async function getUsers() {
    const [result] = await pool.query(`SELECT * FROM users`)
    return result
}

export async function getUser(id){
    const [result] = await pool.query(`
        SELECT *
        FROM users
        WHERE username = ?
        `, [id])
    return result[0];
}

export async function getTypeCards(type){
    const [result] = await pool.query(`
        SELECT *
        FROM cards
        WHERE type = ?
        ORDER BY RAND()
        LIMIT 10`
        , [type])
    return result
}

export async function getThemeCards(theme){
    const [result] = await pool.query(`
        SELECT *
        FROM cards
        WHERE theme = ?
        ORDER BY RAND()
        LIMIT 10`
        , [theme])
    return result
}


export async function getSpecificCards(type, theme){
    const [result] = await pool.query(`
        SELECT *
        FROM cards
        WHERE type = ? AND theme = ?
        ORDER BY RAND()
        LIMIT 10`
        , [type, theme])
    return result
}


export async function checkUserLogin(username, password){
    const [result] = await pool.query(`
        SELECT *
        FROM users
        WHERE username = ? AND password = ?
        `, [username, password])
    return result
}


export async function createUser(username, password){
    try{
        const insertion = await pool.query(`
            INSERT INTO users (username, password)
            VALUES (?, ?)
            `, [username, password])
        console.log("User not found, proceeding with registration.")
        return insertion
    } catch (error){
        console.log("user found, aborting registration request.")
        return null;
    }

    // except DatabaseError as e:
    // const result = await pool.query(`
    //     SELECT * FROM users
    //     WHERE username = ?
    //     `, [username])
    
    // if (result.length == 0){
    //     return result
    // }

    // const insertion = await pool.query(`
    //     INSERT INTO users (username, password)
    //     VALUES (?, ?)
    //     `, [username, password])
    // return insertion
}


// const clients = await getUsers()
// console.log(clients)
// const specific = await getUser('admin')
// console.log(specific)
// const cards = await getSpecificCards('WYR', 'Basic', 5);
// console.log(cards)


// pool.end((err) => {
//     if (err) {
//         console.error('Error closing connection: ', err)
//     } else {
//         console.log('Connection closed successfully.')
//     }
// })