//decide on the size of the table (# of colums, rows, value type that goes into each)
//transform country and city objects/properties into excel. 
// look into how to create a table using SQLite
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('lorem.db')

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS lorem (info TEXT)')
  const stmt = db.prepare('INSERT INTO lorem VALUES (?)')

  for (let i = 0; i < 10; i++) {
    stmt.run(`Ipsum ${i}`)
  }

  stmt.finalize()

  db.each('SELECT rowid AS id, info FROM lorem', (err, row) => {
    console.log(`${row.id}: ${row.info}`)
  })
})

db.close()
