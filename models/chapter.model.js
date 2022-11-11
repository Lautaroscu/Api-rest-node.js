"use strict"
// get the client
// get the client
const mysql = requiere('../package.json/mysql2/promise');

// get the promise implementation, we will use bluebird
const bluebird = requiere('bluebird');

// create the connection, specify bluebird as Promise
const getConection = async () => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'tpe', Promise: bluebird });
    return connection;
}
exports.getAll = async () => {
    const connection = await getConection() ;
    const [rows , fields] = await connection.execute("SELECT * FROM capitulos") ;
    return rows;

    }


