
const client = require("./client");

async function createGenres(name){
    try {
        const {
            rows: [genre]
        } = await client.query(`
        INSERT INTO genres (name)
        VALUES($1)
        RETURNING *
        `, [name]);
        return genre
    } catch(error){
        throw error
    }
}

async function getAllGenres(){
    try{
        const {
            rows: [genres]
        } = await client.query(`
        SELECT * FROM genres
        `) 
    return genres
    } catch (error){
        throw error
    }
}

async function getGenreById(id){
    try{
        const {
            rows: [genres]
        } = await client.query(`
        SELECT * from genres
        WHERE id = $1
        `, [id])
    return genres
    } catch (error){
        throw error
    }
}

async function getGenreByName(name){
    try{
        const {
            rows: [genres]
        } = await client.query(`
        SELECT * FROM genres
        WHERE name = $1
        `, [name]);
        return genres
    }catch (error){
        throw error
    }
}

module.exports = {
    createGenres,
    getAllGenres,
    getGenreById,
    getGenreByName
}