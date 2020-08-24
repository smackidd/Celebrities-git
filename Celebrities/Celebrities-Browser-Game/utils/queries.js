var db = require('./db');

var executeQuery = async function (query) {
    var connectionPool = await db;
    var result = await connectionPool.request().query(query);
    //console.log('result', json(result));
    return result.recordset;
}
//send json formatted record set as a response
// var sendQueryResults = async function (res, query) {
//   try {
//     var recordset = await executeQuery(query);
//     //console.log('recordset', recordset);
//     res.send({
//         success: true,

//     });
//   }
//   catch (err) {
//     return {
//         success: false,
//         error: err
//     };
//   }
// };

module.exports = executeQuery;