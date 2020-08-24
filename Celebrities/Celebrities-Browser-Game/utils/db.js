var sql = require('mssql');
//config for your database
var config = {
    user:'steve',
    password:'theturk73',
    server: 'localhost',
    database: 'Celebrities',
    options: {
        database: 'Celebrities'
    },
};
//connect to your database, node module export format
module.exports = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL!');
        return pool;
    })
    .catch(err => console.log('Database Connection Error: ', err));