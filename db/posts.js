
const client = require("./client");
const { getGenreById } = require("./genres")
const { getUserByUsername } = require("./users")
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
try{
    const genre = await getGenreById
    const {rows: posts} = await client.query(`
    SELECT posts.*, genres.name AS "music"
    FROM posts
    JOIN genres 
    ON posts."genreId" = genres.id
    WHERE genres.id = $1
    `, [genre.id])
    return posts
}catch(error){
    throw error
}
}

async function getPostsByAuthorId(username){
    try{
const user = await getUserByUsername(username)

const { rows: posts } = await client.query(`
SELECT posts.*, users.username AS "authorId"
FROM posts
JOIN users
ON users."authorid" = users.id
WHERE users.id = $1
`, [user.id])
return posts
    }catch(error){
        throw error
    }
}

module.exports = {
createPosts,
getAllPosts,
getPostsById,
updatePosts,
deletePosts,
getPostsById,
getPostsByGenre,
getPostsByAuthorId,
}