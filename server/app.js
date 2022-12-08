const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('build'));
app.use(express.urlencoded({extended: true})) 

app.listen(8000, ()=>{
  console.log('server is running')
});

app.use(express.json());
var cors = require('cors');
const { json } = require('body-parser');
app.use(cors());

// 클라우드 업로드용 (naver)
// var mysql = require('mysql');
// var db = mysql.createPool({
//   host     : 'localhost',
//   port     : '3306',
//   user     : 'root',
//   password : 'gksksla6985!',
//   database : 'report'
// });

// 내 컴퓨터 용
var mysql = require('mysql');
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'gksksla',
  database : 'report'
});
db.connect();


app.get('/dep1', function(요청, 응답) {
  db.query('SELECT * FROM dep1', function (error, result) {
    if (error) {console.log(error);}
    응답.send(result)
  });
})


app.post('/input', function(요청, 응답){
  console.log(요청.body);
  db.query(`INSERT INTO dep1 (dep, name, day1, day2, day3, day4, day5, day6, day7, day8, day9, day10)
   VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  [요청.body.dep, 요청.body.name, 요청.body.day1, 요청.body.day2, 요청.body.day3, 요청.body.day4,
    요청.body.day5, 요청.body.day6, 요청.body.day7, 요청.body.day8, 요청.body.day9, 요청.body.day10], 
  function(error, result){
  if(error){
    throw error;
  }
  })
});


app.delete('/delete', function(요청, 응답) {
  console.log(요청.body);
  db.query(`DELETE FROM dep1
  WHERE id='${요청.body.id}' AND dep='${요청.body.dep}' AND name='${요청.body.name}'`,
  function(error, result){
    if(error){throw error;}
  })
})



app.use(express.static(path.join(__dirname, '/build')));
app.get('/', function (요청, 응답) {
  응답.sendFile(path.join(__dirname, '/build/index.html'));
});
app.get('*', function (요청, 응답) {
  응답.sendFile(path.join(__dirname, '/build/index.html'));
});

