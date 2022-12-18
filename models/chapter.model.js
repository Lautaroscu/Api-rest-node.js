"use strict"
import { createConnection } from 'mysql2/promise';

// get the promise implementation, we will use bluebird
import bluebird from 'bluebird';
// import Query from 'mysql2/typings/mysql/lib/protocol/sequences/Query';
 
// create the connection, specify bluebird as Promise
const getConecction = async () => { 
   let connection = await createConnection({host:'localhost', user: 'root', database: 'tasks', Promise: bluebird}) ;
    return connection;
};

export async function getAll() {
    const connection = await getConecction() ;
    const [rows] = await connection.execute("SELECT * FROM tasks") ;
    return rows;

    }
    export const  get = async (id) => {
        const connection = await getConecction() ;
        let sql = "SELECT * FROM tasks WHERE id = ?" ;
       let values = [id];
        const [rows] = await connection.execute(sql , values) ;
        return rows;
    
        }
    export const deleteTask = async (id) => {
        const connection = await getConecction() ;
        let sql = "DELETE FROM tasks WHERE id = ?" ;
        let values = [id] ;
        const [rows] = await connection.execute(sql , values) ;

    }
    export const insert = async (tarea ,descipcion , prioridad) => {
        const connection = await getConecction() ;
        let sql = "INSERT INTO tasks (tarea , descripcion , prioridad , finalizada) VALUES (? , ? , ? , ?)"  ;
        let values = Array(tarea , descipcion , prioridad  , 0) ;
        const [rows] = await connection.execute(sql , values) ;
        return rows;
    }
export const update = async (tarea , descipcion , prioridad  , id) => {
    const connection = await getConecction() ;

    let sql = "UPDATE  tasks SET  tarea = ? , descripcion = ? , prioridad = ? WHERE id = ?"  ;
    let values = Array(tarea , descipcion , prioridad   , id) ;
     await connection.execute(sql , values) ;


}

export const deleteAllTasks = async () => {
    const connection = await getConecction() ;
    let sql = "DELETE FROM tasks" ;
    const [rows] = await connection.execute(sql) ;

}
export const finalize = async (id) => {
    const connection = await getConecction() ;

    let sql = "UPDATE  tasks SET  finalizada = 1 WHERE id = ?"  ;
    let values = Array(id) ;
     await connection.execute(sql , values) ;
}
export const desfinalize = async (id) => {
    const connection = await getConecction() ;

    let sql = "UPDATE  tasks SET  finalizada = 0 WHERE id = ?"  ;
    let values = Array(id) ;
     await connection.execute(sql , values) ;
}