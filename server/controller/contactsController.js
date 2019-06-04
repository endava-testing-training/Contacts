var conn = require('../lib/dbConn');

function loadContact(req, res) {

    var sql =  `SELECT  co.ContactId as id,
                        co.FullName as name,
                        co.Email as email,
                        co.Address as address,
                        co.DateOfBirth as date,
                        co.Phone as phone,
                        ci.Name as city
                FROM    contact co
                  LEFT JOIN  city ci
                    ON  ci.CityId  = co.CityId`;
    conn.query(sql, function(error, resultado, fields){
        if(error){
            console.log(error);
            return res.status(404).send("Error in the query");
        }

        res.send(JSON.stringify(resultado));
    })
}

function newContact(req, res) {
    
    var date = req.body.date;
    var name = req.body.name;
    var email = req.body.email;
    var address = req.body.address;
    var phone = req.body.phone;
    //var city = req.query.city;

    var sql;

    sql =  `INSERT INTO Contact (DateOfBirth, FullName, Email, Address, Phone) 
            VALUES ('${date}','${name}','${email}','${address}','${phone}')`

    conn.query(sql, function(error){
        if(error){
            console.log(error);
            return res.status(500).send("Error in the query");
        }
    })

    sql = `SELECT MAX(ContactId) as Id FROM Contact`
    conn.query(sql, function(error, resultado, fields){
        if(error){
            console.log(error);
            return res.status(404).send("Error in the query");
        }

        res.send(fields[0].id);
    })
}


function updateContact(req, res) {
    
    var id = req.body.id;
    var date = req.body.date;
    var name = req.body.name;
    var email = req.body.email;
    var address = req.body.address;
    var phone = req.body.phone;
    //var city = req.query.city;

    var sql;

    sql =  `UPDATE  Contact 
                SET DateOfBirth = '${date}',
                    FullName    = '${name}', 
                    Email       = '${email}', 
                    Address     = '${address}', 
                    Phone       = '${phone}'
            WHERE   ContactId   = ${id}`

    conn.query(sql, function(error){
        if(error){
            console.log(error);
            return res.status(404).send("Error in the query");
        }
    })
}



module.exports = {
    loadContact : loadContact,
    newContact : newContact,
    updateContact : updateContact
};

