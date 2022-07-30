
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
        SELECT posts.* , genres.name AS "music", users.username AS "creatorName"
        FROM posts
        JOIN genres
        ON posts."genreId" = genres.id
        JOIN users 
        ON posts."authorId" = users.id`);
        return posts
    }catch (error){
        throw error
    }
}

async function updatePosts({ id, ...fields }){
    try{
    const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ")
    if(setString.length === 0){
        return;
    }
    const {rows: [posts]} = await client.query(`
    UPDATE posts 
    SET ${setString}
    WHERE id=${id}
    RETURNING *;
    `, Object.values(fields));
    return posts
    } catch(error){
        throw error
    }
}

async function deletePosts(id){
    try{
        const { rows: [posts]} = await client.query(`
        DELETE FROM posts 
        WHERE id = $1
        `, [id])
     return posts
    } catch(error){
        throw error
    }
}

async function getPostsById (id){
    try{
        const { rows: [posts]} = await client.query(`
        SELECT * FROM posts 
        WHERE id = $1
        `,[id])
    return posts
    } catch (error){
        throw error
    }
}

async function getPostsByGenre(name){

}

module.exports = {
createPosts,
getAllPosts,
getPostsById,
updatePosts,
deletePosts,
}