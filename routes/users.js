var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
const winston = require('winston');

const usersLogger = winston.loggers.get('users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');

  /*res.render('/books', {
    title: 'liste Book'             
  })*/
  
});




router.post('/login', function(req, res, next) {

  let id = req.body.username;
  let password = req.body.password;
  let errors = false;
  

 // res.send('respond with a resource : ' + id + " -  " + password);
  
    
    dbConn.query('SELECT * FROM user WHERE id = ' + id, function(err, rows, fields) {
      if(err) throw err
       
      // if user not found
      if (rows.length <= 0) {
          req.flash('error', 'Book not found with id = ' + id)
          res.redirect('/login')
      }
      // if book found
      else {

       

       
          // render to edit.ejs
          res.render('users/users', {
              title: 'retours api /user', 
              id: rows[0].id,
              name: rows[0].name,
              droits: rows[0].droits.split(",")
          })
      }
  })
  
 
});



module.exports = router;
