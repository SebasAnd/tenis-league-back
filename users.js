const express = require('express');
const router = express.Router();
require('dotenv').config();
const { Pool,Client } = require('pg')
var bodyParser = require('body-parser');
/*const credentials ={
    user: process.env.DBUSER,
    host: process.env.DBHOST,
    database: process.env.DBNAME,
    password: process.env.DBPASSWORD,
    port: process.env.DBPORT,
  };*/
  const credentials={
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  };

 router.use(bodyParser.json());


router.get('/getUsers', async function(req, res) {    
    await client.connect();
    const result = await client.query("SELECT * FROM users");
    await client.end();
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result['rows']));
});

router.post('/checkUser', async function(req, res) {  
  try{
    const pool = new Pool(credentials);
    const result = await pool.query("SELECT * FROM users WHERE email = '"+req.body.username+"' AND password='"+req.body.password+"'");
    await pool.end();
    res.setHeader('Content-Type', 'application/json');
    if(result['rows'].length > 0){
      res.send(JSON.stringify(result['rows']));
    }else{
      res.send(JSON.stringify({
        id: -1,
        name: null,
        email: null,
        is_admin: false,
        nick_name: null,
        password: null
      }));
      }
    

  }catch(err){
    res.send({'error':err});
  }
  
});

router.post('/checkUserGoogle', async function(req, res) {  
  try{
    const pool = new Pool(credentials);
    const result = await pool.query("SELECT * FROM users WHERE email = '"+req.body.username+"'");
    await pool.end();
    res.setHeader('Content-Type', 'application/json');
    if(result['rows'].length > 0){
      res.send(JSON.stringify(result['rows']));
    }else{
      res.send(JSON.stringify({result  :{
        id: -1,
        name: null,
        email: null,
        is_admin: false,
        nick_name: null,
        password: null

      }
        
      }));
      }
    

  }catch(err){
    res.send({'error':err});
  }
  
});

router.post('/addUser', async function(req, res) {  
  try{
    const pool = new Pool(credentials);
    const result = await pool.query("INSERT INTO users(email, name, nickname, password, is_admin)"+
    "VALUES ('"+req.body.email+"','"+req.body.name+"' , '"+req.body.nickname+"','"+req.body.password+"','"+req.body.is_admin+"' )");
    await pool.end();
    res.setHeader('Content-Type', 'application/json');
    
      res.send(JSON.stringify(result));
    

  }catch(err){
    res.send({'error':err});
  }
  
});



module.exports = router;