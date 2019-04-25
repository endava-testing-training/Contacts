var conn = require('../lib/dbConn');

function loadContact(req, res) {

    var sql = "SELECT * FROM contact";
    conn.query(sql, function(error, resultado, fields){
        if(error){
            console.log(error);
            return res.status(404).send("Error in the query");
        }

        res.send(JSON.stringify(resultado));
    })
}

function saveContact(req, res) {
    
    var id = req.query.id;
    var date = req.query.date;
    var name = req.query.name;
    var email = req.query.email;
    var address = req.query.address;
    var phone = req.query.phone;
    //var city = req.query.city;

    var sql;

    if (id == undefined){
        sql =  `INSERT INTO Contact (DateOfBirth, FullName, Email, Address, Phone) 
                VALUES ('${date}','${name}','${email}','${address}','${phone}')`
    } else {
        sql =  `UPDATE  Contact 
                    SET DateOfBirth = '${date}',
                        FullName    = '${name}', 
                        Email       = '${email}', 
                        Address     = '${address}', 
                        Phone       = '${phone}'
                WHERE   id = ${id}`
    }

    conn.query(sql, function(error){
        if(error){
            console.log(error);
            return res.status(404).send("Error in the query");
        }
    })

    if (id == undefined){
        sql = `SELECT MAX(ContactId) as Id FROM Contact`
        conn.query(sql, function(error, resultado, fields){
            if(error){
                console.log(error);
                return res.status(404).send("Error in the query");
            }

            res.send(fields[0].id);
        })
    } else {
        res.send(id);
    }
}

module.exports = {
    loadContact : loadContact,
    saveContact : saveContact
};

