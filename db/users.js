
const client = require("./client");

async function createUser({ email,username, password }){
    try {
        const {
            rows: [user],
        } = await client.query(
            `
            INSERT INTO users(email, username, password)
            VALUES($1,$2,$3)
            ON CONFLICT (username) DO NOTHING 
            RETURNING *
            `, [email, username, password]
        );
        delete user.password
        return user
    } catch (error){
        throw error;
    }
}

async function getAllUsers(){
    try {
        const {
            rows: [users],
        } = await client.query(`
        SELECT * FROM users
        `);
        delete users.password;
        return users 
    } catch (error){
        throw error
    }
}

async function getUserById(id){
    try {
        const {
            rows: [user]
        } = await client.query(`
        SELECT * FROM users
        WHERE id=$1
        `, [id]);
        if(!user){
            return null
        }
        return user
    }catch (error){
        throw error
    }
}

async function getUserByUsername(username){
try{
    const {
        rows: [user]
    } = await client.query (`
    SELECT * FROM users
    WHERE username = $1
    `, [username]);
    if(!user){
        return null
    }
    return user
} catch (error){
    throw error
}
}

module.exports = {
    createUser, 
    getAllUsers,
    getUserById,
    getUserByUsername
}