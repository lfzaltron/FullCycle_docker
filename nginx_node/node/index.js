const express = require('express');
const app = express();
const port = 3000;

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};
const mysql = require('mysql');
const createTableConnection = mysql.createConnection(config);

createTableConnection.query(`create table if not exists people (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, name varchar(30))`)
createTableConnection.end();

app.get('/', (req, res) => {
  const connection = mysql.createConnection(config);

  connection.connect(err => {
  
    if (err) throw err;

    const insert = `INSERT INTO people(name) values('Luís Fernando Zaltron')`;
    connection.query(insert);


    connection.query("SELECT * FROM people", function (err, result, fields) {
      if (err) throw err;
      const names = result.reduce((prev, curr) => {
        return prev + curr.name + '<br>'
      }, '<h1>Full Cycle</h1><br>');
      res.send(names);
    });
  });

  
});

app.listen(port, () => console.log(`Rodando na porta ${port}`));