
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

async function updateGenres({ id, ...fields }){
    try{
    const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ")
    if(setString.length === 0){
        return;
    }
    const {rows: [genres]} = await client.query(`
    UPDATE genres 
    SET ${setString}
    WHERE id=${id}
    RETURNING *;
    `, Object.values(fields));
    return genres
    } catch(error){
        throw error
    }
}

async function deleteGenres(id){
    try{
        const { rows: [genres]} = await client.query(`
        DELETE FROM genres
        WHERE id = $1
        `, [id])
     return genres
    } catch(error){
        throw error
    }
}

module.exports = {
    createGenres,
    getAllGenres,
    getGenreById,
    getGenreByName,
    updateGenres,
    deleteGenres
}