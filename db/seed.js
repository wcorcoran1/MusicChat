const client = require("./client");
const { users, genres, posts } = require("./seedData");
const { createGenres, getGenreById } = require("./genres");
const { createUser } = require("./users");
const { createPosts } = require("./posts");
async function dropTables() {
  try {
    console.log("----Dropping tables----");
    await client.query(`
    DROP TABLE IF EXISTS posts;
    DROP TABLE IF EXISTS genres;
      DROP TABLE IF EXISTS users;
      `);
    // drop tables in correct order
    console.log("----Tables dropped----");
  } catch (error) {
    throw error;
  }
}

const buildTables = async () => {
  console.log("---Building Tables----");
  try {
    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        username VARCHAR(255) UNIQUE NOT NULL,
         password VARCHAR(255) NOT NULL
      );
        CREATE TABLE genres(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      );
      CREATE TABLE posts(
      id SERIAL PRIMARY KEY,
      "authorId" INTEGER REFERENCES users(id),
      "genreId" INTEGER REFERENCES genres(id),
      content VARCHAR(300) NOT NULL
      );
        `);
    console.log("-----TABLES BUILT-----");
  } catch (error) {
    throw error;
  }
};
// create functions for the data to be seeded from SeedData
async function seedDB() {
  console.log("Creating Users ...");
  const createUsers = await Promise.all(users.map(createUser));
  console.log("Users:", createUsers);

  console.log("Creating Genres...");
  const createGenre = await Promise.all(genres.map(createGenres));
  console.log("Genres:", createGenre);

  console.log("Creating Posts ...");
  const createPost = await Promise.all(posts.map(createPosts));
  console.log("POSTS:", createPost);
}

async function populateInitialData() {
  try {
    client.connect();
    await dropTables();
    await buildTables();
    await seedDB();
  } catch (error) {
    throw error;
  }
}

populateInitialData()
  .catch(console.error)
  .finally(() => client.end());
