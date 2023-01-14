"use strict"
import { createConnection } from 'mysql2/promise';

// get the promise implementation, we will use bluebird
import bluebird from 'bluebird';
// import Query from 'mysql2/typings/mysql/lib/protocol/sequences/Query';

// create the connection, specify bluebird as Promise
const getConecction = async () => {
    let connection = await createConnection({ host: 'localhost', user: 'root', database: 'tasks', Promise: bluebird });
    return connection;
};

export async function getAllQuerys(filter = null, sort = null, order = null, offset = null, limit = null) {
   
    let sql = `SELECT * FROM tasks `;
    const FILTER = `WHERE tarea LIKE '%${filter}%' OR descripcion LIKE '%${filter}%' OR prioridad LIKE '%${filter}%' OR finalizada LIKE '%${filter}%' OR id LIKE '%${filter}%'`;
    const ORDER = `ORDER BY ${sort} ${order}`;
    const PAGINATION = `LIMIT ${offset} , ${limit}`;     
   
    if ((filter && sort && order && (offset || limit)) != null && offset != NaN) {
        console.log('filter and page and order') 

        sql += `${FILTER} ${ORDER} ${PAGINATION}`
    }
    else if ((filter && order && sort) != null) {
        console.log('filter and order') 

        sql += `${FILTER} ${ORDER}`
        
    }
    else if (((filter) && (offset || limit) )!= null && offset != NaN ) { 
       console.log('filter and page')  
        sql += `${FILTER} ${PAGINATION}`
    }
    else if (((sort && order &&  (offset || limit))) != null && offset != NaN) {
        console.log('order and page' )
        sql += `${ORDER} ${PAGINATION}` 
    } 
    else if ((sort && order) != null) {
        sql += `${ORDER}` ;
        console.log('order')
    }
    else if (filter != null) {
        console.log('filter')
        sql += `${FILTER}`

    }
    else if ((offset && limit) != null) {
        sql += `${PAGINATION}`
        console.log('pagi')
    }
    else {
        sql = `SELECT * FROM tasks `;

    }
    const connection = await getConecction();
 
    // let values = [ query.sort , query.order ]
    console.log(sql)

    const [rows, fields] = await connection.execute(sql);

    return rows;

}
export const getAll = async () => {
 let sql = `SELECT * FROM tasks `;
 const connection = await getConecction();
  const [rows] = await  connection.execute(sql);

  return rows;  

}

export const get = async (id) => {
    const connection = await getConecction();
    let sql = "SELECT * FROM tasks WHERE id = ?";
    let values = [id];
    const [rows] = await connection.execute(sql, values);
    return rows;

}
export const deleteTask = async (id) => {  
    const connection = await getConecction();
    let sql = "DELETE FROM tasks WHERE id = ?";
    let values = [id];
    const [rows] = await connection.execute(sql, values);

}
export const insert = async (tarea, descipcion, prioridad) => {
    const connection = await getConecction();
    let sql = "INSERT INTO tasks (tarea , descripcion , prioridad , finalizada) VALUES (? , ? , ? , ?)";

    let values = Array(tarea, descipcion, prioridad, 0);
    const [rows] = await connection.execute(sql, values);
    return rows;
}
export const update = async (tarea, descipcion, prioridad, id) => {
    const connection = await getConecction();

    let sql = "UPDATE  tasks SET  tarea = ? , descripcion = ? , prioridad = ? WHERE id = ?";
    let values = Array(tarea, descipcion, prioridad, id);
    await connection.execute(sql, values);

 
}

export const deleteAllTasks = async () => {
    const connection = await getConecction();
    let sql = "DELETE FROM tasks";
    const [rows] = await connection.execute(sql);

}
export const finalize = async (id) => {
    const connection = await getConecction();

    let sql = "UPDATE  tasks SET  finalizada = 1 WHERE id = ?";
    let values = Array(id);
    await connection.execute(sql, values);
}
export const desfinalize = async (id) => {
    const connection = await getConecction();

    let sql = "UPDATE  tasks SET  finalizada = 0 WHERE id = ?";
    let values = Array(id);
    await connection.execute(sql, values);
}
export const pagination = async (limit) => {
    const connection = await getConecction();
    let values = Array(limit);
    let sql = "SELECT * FROM tasks LIMIT 0 , ?";
    const [rows] = await connection.execute(sql, values);
    return rows;
}