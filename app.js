const express = require('express');
const app = express();
var assert = require('assert');
const bodyParser = require('body-parser');
const {MongoClient} = require("mongodb");
const { data } = require('jquery');
const url = 'mongodb://localhost:27017/';
const databaseName = 'BioMaterialAtlas'
var assert = require('assert');
const { response } = require('express');
// Server uses static files
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));


// load the index.html file	
app.get('/', (request,response)=>{
		response.sendFile(path.join(__dirname, '/index.html'));
  });

app.get('/get-data',function(request,response,next){
  var resultArray = [];
  MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
    if (error) {
      return console.log("Connection failed");
    }
    // if no error exists we can ask for the data
    var cursor = client.db(databaseName).collection('Documents').find({}).toArray().then(
    function(obj){
      // close the database connection
      client.close()
      // send the object to the frontend
      return response.send(obj)

      });   
  
  })    
}); 


app.get('/custom-query',function(request,response,next){
  // this one will be used to launch a custom query and get the results
  query_text = request.query.text;
  // transform the string to an object
  MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
    if (error) {
      return console.log("Connection failed");
    }
    // if no error exists we can ask for the data
    console.log(query_text)
    var cursor = client.db(databaseName).collection('Documents').find({$text:{$search:query_text}}).toArray().then(
    function(obj2){
      client.close()
      // send the object to the frontend
      return response.send(obj2);
      });   
  
  }) 
})


// export the app so we can use it on our server
module.exports = app;


