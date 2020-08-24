const express = require('express'); 
const router = express.Router();
const bodyParser = require('body-parser');
const executeQuery = require('../utils/queries');
var sql = require('mssql');


const urlencodedParser = bodyParser.urlencoded({ extended: false });



router.post('/register', urlencodedParser, (req, res) => {
    
    
    
    var currentUser = {
        username: req.body.username,
        password: req.body.password
    };
    console.log(currentUser);
    // user_data.users.push(currentUser);
    // user_data.currentUser[0] = currentUser;
    // let data = JSON.stringify(user_data, null, 2);
    // fs.writeFile(file_location, data, ()=> console.log('succesfully wrote to user_data.json'));
    // data = JSON.stringify(currentUser);
    // fs.writeFile('./currentUser.json', data, ()=> console.log('succesfully wrote to currentUser.json'))
    var mysql = "INSERT INTO  Users (Username, Pass) VALUES('" + currentUser.username +"','" + currentUser.password +"')";
    //query(res, mysql);
    var sendQueryResults = async function (res, query) {
        try {
            var recordset = await executeQuery(query);
            console.log('recordset', await recordset);
            res.send({
                success: true,
                msg: "successfully registered user",
                currentUser: recordset
            });
        }
        catch (err) {
            return {
                success: false,
                error: err
            };
        }
    };
    sendQueryResults(res, mysql);
    console.log(mysql)
    res.redirect('http://localhost:3002/setup');    
});

router.post('/login', urlencodedParser, (req, res) => {
    var currentUser = {
        username: req.body.username,
        password: req.body.password
    };
    console.log(currentUser);

    var mysql = "SELECT UserID, Username FROM Users WHERE Username = '" + currentUser.username +"' AND Pass = '" + currentUser.password +"';";
    //var user = [];

    

    async function sendQuery(){
        config.connect(function(err) {
            if (err) throw err;
            con.query(mysql, function (err, result, fields) {
              if (err) throw err;
              console.log(result);
              res.redirect('http://localhost:3002/setup');
            });
        });
        
    }
    sendQuery();
    // var user = query(res, mysql);
    // console.log('user', user);
    //res.send(user);
    //res.redirect('http://localhost:3002/setup');  
});

module.exports = router;