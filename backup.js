const mysql = require('mysql');
const fs = require('fs');
const path = require('path');

const [host, user, password, database, table, backupFile] = process.argv.slice(2);


const pool = mysql.createPool({
  connectionLimit: 10,
  host,
  user,
  password,
  database
});

const backupStream = fs.createWriteStream(path.resolve(__dirname, backupFile));


function escapeSingleQuotes(str) {
  return str.replace(/'/g, "''");
}


const query = `SELECT * FROM ${table}`;


pool.query(query, (error, results) => {
  if (error) {
    console.error('Error:', error);
    return;
  }

 
  results.forEach(row => {
    const values = Object.values(row).map(value => {
      if (typeof value === 'string') {
        return `'${escapeSingleQuotes(value)}'`;
      }
      return value;
    });
    backupStream.write(`INSERT INTO ${table} VALUES (${values.join(', ')});\n`);
  });


  backupStream.end();
  pool.end();
});

console.log(`Backup file ${backupFile} created successfully.`);
