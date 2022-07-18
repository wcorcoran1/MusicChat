const client = require("./client");

async function buildTables() {
  try {
    console.log("----Dropping tables----");
    await client.query(`
    DROP TABLE IF EXISTS posts
    DROP TABLE IF EXISTS genres
      DROP TABLE IF EXISTS users;
      `);
    // drop tables in correct order
    console.log("----Tables dropped----");
  } catch (error) {
    throw error;
  }
}

const createTables = async () => {
    console.log("---Building Tables----");
    try {
      
      await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        username VARCHAR(255) UNIQUE NOT NULL,
         password VARCHAR(255) NOT NULL,
      )
        CREATE TABLE genres(
        id SERIAL PRIMARY KEY,
        genre VARCHAR(255) NOT NULL
      )
      CREATE TABLE posts(
      id SERIAL PRIMARY KEY,
      "authorId" INTEGER REFERENCES users(id),
      "genreId" INTEGER REFERENCES genres(id),
      content VARCHAR(300) NOT NULL,
      )
        `);
      console.log("-----TABLES BUILT-----");
    } catch (error) {
      throw error;
    }
  };
// create functions for the data to be seeded from SeedData


async function populateInitialData() {
    try {
      client.connect();
      await dropTables();
      await buildTables();
    } catch (error) {
      throw error;
    }
  }
  
  populateInitialData()
    .catch(console.error)
    .finally(() => client.end());