var express = require('express');
var router = express.Router();
var parseString = require('xml2js').parseString;
var http = require('http');
var xml = '';




// parse xml - json or object
router.get('/', function(req, res, next) {
    
    var url = "http://localhost/rights.xml";
    
    let name = req.body.name;
    let author = req.body.author;


    /*res.send('respond with a resource');*/
    xmlToJson(url, function(err, data) {
        if (err) {
          // Handle this however you like
          return console.err(err);
        }

       res.send(JSON.stringify(data, null, 2)   +"  ......\n" + json2array(data)+"  ...\n" + name  + " " + author);
        //console.log(JSON.stringify(data, null, 2));
    });
});
module.exports = router;

function json2array(json){
  var result = [];
  var keys = Object.keys(json);
  keys.forEach(function(key){
      result.push(json[key]);
  });
  return result;
}



function xmlToJson(url, callback) {
  var req = http.get(url, function(res) {
    var xml = '';

    res.on('data', function(chunk) {
      xml += chunk;
    });

    res.on('error', function(e) {
      callback(e, null);
    }); 

    res.on('timeout', function(e) {
      callback(e, null);
    }); 

    res.on('end', function() {
      parseString(xml, function(err, result) {
        callback(null, result);
      });
    });
  });
}

//var url = "http://localhost/edoc.xml";

/*var url = "http://localhost/rights.xml";


xmlToJson(url, function(err, data) {
  if (err) {
    // Handle this however you like
    return console.err(err);
  }

  console.log(data);
  //console.log(JSON.stringify(data, null, 2));
});


onst xml2js = require('xml2js');
const fs = require('fs');
const convert = require('xml-js');


const pathEdoc = './public/edoc.xml';
const pathPSE = './public/rights.xml';

// this example reads the file synchronously
// you can read it asynchronously also
let xml_string = fs.readFileSync(pathEdoc, "utf8");



// cas 1
var parseString = require('xml2js').parseString;
var xml = "<root>Hello xml2js!</root>"
parseString(xml_string, function (err, result) {
    console.dir(result);
});


// cas 2

fs.readFile(pathEdoc, (err, data) => {
  if (err) throw err;
  console.log(data);
});

*/