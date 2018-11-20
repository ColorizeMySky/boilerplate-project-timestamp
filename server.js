// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get(/\/api\/timestamp\/([\w\.-]*)$/, function(req, res){
  let isoDataNum = /\/api\/timestamp\/\d*$/; 
  let isoDataHyphen = /\d{1,4}-(0?[1-9]|1[012])-(0?[1-9]|[12]\d|3[01])/;  
  
  let urlParsed = url.parse(req.url, true);
  
  if(isoDataNum.test(urlParsed.pathname)) {
    let unix = urlParsed.pathname.replace(/\/api\/timestamp\/(\d*)$/, '$1');
    let date = new Date();
    date.setTime(unix);
    res.json({unix: parseInt(unix), utc: date.toUTCString()});    
  }
  else if(isoDataHyphen.test(urlParsed.pathname)) {
    let utc = urlParsed.pathname.replace(/\/api\/timestamp\/(\d{1,4}-(0?[1-9]|1[012])-(0?[1-9]|[12]\d|3[01]))/, '$1');
    let date = new Date(utc)
    //res.json({test: 'This daemon obey to me'});
    res.json({unix: date.getTime(), utc: date.toUTCString()});
  }
  else {
    res.end({"error":"Invalid Date"});
  }  
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});