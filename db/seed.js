const client = require("./client");

async function buildTables() {
  try {
    console.log("----Dropping tables----");
    await client.query(`
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