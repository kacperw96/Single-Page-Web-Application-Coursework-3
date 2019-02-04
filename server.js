var express = require("express");
var path    = require("path");
var formidable = require('formidable');
var fs = require('fs');
var bodyParser = require('body-parser');
var FormData = require('form-data');
var multer  = require('multer');
var upload = multer({ dest: 'public/Uploaded_Images/' });
var app     = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const sqlite3 = require('sqlite3').verbose();

//***************************************************

app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//***************************************************



//************** SEARCHES SELECTED CATEGORY IN DATABASE *********************
app.post('/findcategory', function(req, res) {
    var temp = req.body.data;
    console.log("Search query for '" + temp + "' received");
    let db = new sqlite3.Database('./Database/imageDB');
    let sql = 'SELECT path FROM images WHERE category=' + '"' + temp + '" COLLATE NOCASE';
    console.log('Query = ' + sql);

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {row.path;});

    var storage = rows;
    res.json(storage);
});
    // close the database connection
    db.close();
});


//************** SEARCHES ALL IMAGES IN DATABASE *********************
app.get('/getdata',function(req,res){
    let db = new sqlite3.Database('./Database/imageDB');
    let sql = 'SELECT path FROM images';

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {row.path;});

    var storage = rows;
    res.json(storage);
    });
    // close the database connection
    db.close();
});


//************** LOADS INDEX PAGE *********************
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
});


//************** STORES DATA ON SERVER DRIVE ( public/Uploaded_Images/ ) AND CREATE SQLITE3 DATABASE RECORD  *********************
app.post('/', upload.single('filetoupload'), function(req,res,next){
    let db = new sqlite3.Database('./Database/imageDB');
    var category = req.body.category;    // stores category of image
    var file_name = req.file.filename.toString();    // stores filename of image
    var file_path = '/public/Uploaded_Images/' + req.file.filename;    // stores file_path of image


    // insert image details into images table
    db.run('INSERT INTO images (name, category, path) VALUES ("' + file_name + '","' + category + '","' + file_path +'")');
    console.log('Data successfully added to DB');
    // close the database connection
    db.close();
    res.sendFile(__dirname + '/index.html');
});

//************** PORT ON WHICH SERVER IS RUNNING  *********************
console.log('\n*****************************************************************************************');
console.log('*\t\t Server is running on port 8181                                                 *');
console.log('*\t\t Enter this address in your browser to load the page: http://localhost:8181     *');
console.log('*****************************************************************************************');
app.listen(8181);