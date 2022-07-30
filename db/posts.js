
const client = require("./client");

async function createPosts({ authorId, genreId, content }){
    try{
        const {
            rows: [posts]
        } = await client.query(`
        INSERT INTO posts("authorId", "genreId", content)
        VALUES($1, $2, $3)
        RETURNING *
        `, [authorId, genreId, content])
    return posts
    } catch(error){
        throw error
    }
}
async function getAllPosts(){
    try{
        const{rows: [posts]} = await client.query(`
        SELECT * FROM posts`);
        return posts
    }catch (error){
        throw error
    }
}
async function updatePosts({})