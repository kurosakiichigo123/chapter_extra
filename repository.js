const mysql = require('mysql');


const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'sa',
  database: 'first_db',
});


function deepCopyOf(entity) {
  return JSON.parse(JSON.stringify(entity));
}

class Repository {
 
  readHeroes() {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM heroes', (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  }

  
  createHero(heroToBeCreated) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO heroes (name, level) VALUES (?, ?)';
      const values = [heroToBeCreated.name, heroToBeCreated.level];
      pool.query(query, values, (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  }

  
  updateHero(nameOfHeroToBeUpdated, updatedHero) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE heroes SET name = ?, level = ? WHERE name = ?';
      const values = [updatedHero.name, updatedHero.level, nameOfHeroToBeUpdated];
      pool.query(query, values, (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  }

  
  deleteHero(nameOfHeroToBeDeleted) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM heroes WHERE name = ?';
      const values = [nameOfHeroToBeDeleted];
      pool.query(query, values, (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  }
}

module.exports = Repository;
