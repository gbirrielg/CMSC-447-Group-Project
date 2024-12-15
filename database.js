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


export async function getRandSubmission(){
    const [result] = await pool.query(`
        SELECT *
        FROM submissions
        LIMIT 1`)
    return result[0];
}


export async function deleteSubmission(){
    try {
        const [result] = await pool.query(`
            DELETE FROM submissions
            ORDER BY submit_id ASC
            LIMIT 1`)
        console.log(`Successfully denied submission.`)
        return result;
    } catch {
        console.log(`Failed to deny submission.`)
        return null;
    }
}


export async function getCardById(id){
    try{
        const [result] = await pool.query(`
            SELECT *
            FROM cards
            WHERE card_id = ?
            `, [id])
        console.log(`Sucessfully retrieved card #${id}.`)
        return result[0];
    } catch {
        console.log(`Card #${id} does not exist or could not be returned.`)
        return null;
    }
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


export async function getAnyCards(){
    const [result] = await pool.query(`
        SELECT * FROM cards
        ORDER BY RAND() LIMIT 10`)
    return result;
}


export async function deleteCard(id){
    try{
        const [result] = await pool.query(`
            DELETE FROM cards
            WHERE card_id = ?
            `, [id])
        console.log("Successfully deleted card.")
        return result;
    } catch {
        console.log("Unsuccessfully deleted card.")
        return null;
    }

}


export async function updateLikes(id, voteType){
    try{
        let result;
        if (voteType == 'like'){
            result = await pool.query(`
                UPDATE cards
                SET upvotes = upvotes + 1
                WHERE card_id = ?
                `, [id]);
        } else {
            result = await pool.query(`
                UPDATE cards
                SET downvotes = downvotes + 1
                WHERE card_id = ?
                `, [id]);
        }

        if (result){
            console.log("Vote updated successfully.")
        } else {
            console.log("Card could not be found or rating could not be updated.")
        }
        return result;
    } catch (error){
        console.error("Error updating vote: ", error)
        return null;
    }
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
}
    

export async function createCardAdmin(username, type, theme, text1, text2){
    try{
        const insertion = await pool.query(`
            INSERT INTO cards (username, type, theme, option_1, option_2, date_time)
            VALUES (?, ?, ?, ?, ?, CURDATE())
            `, [username, type, theme, text1, text2] )
        console.log("Successfully inserted admin-created card.")
        return insertion;
    } catch (error){
        console.log(`Unsuccessful card entry. Error: ${error}`)
        return null;
    }
}


export async function createCardUser(username, type, theme, text1, text2){
    try{
        const insertion = await pool.query(`
            INSERT INTO submissions (username, type, theme, option_1, option_2)
            VALUES (?, ?, ?, ?, ?)
            `, [username ,type, theme, text1, text2] )
        console.log("Successfully inserted user-suggested card.")
        return insertion;
    } catch (err){
        console.log("Unsuccessful card suggestion entry.")
        console.log(err)
        return null;
    }
}
