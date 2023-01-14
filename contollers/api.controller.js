"use strict"
import {getAllQuerys , get, insert, deleteTask, update, deleteAllTasks, finalize, desfinalize, getAll } from "../models/chapter.model.js";
const whitelist = Array(
   'id',
   'tarea',
   'descripcion',
   'prioridad',
   'finalizada',
   'asc',
   'desc'
)
function arenumerics(page, limit) {
   if ((page >= 1 && page <= 100) && (limit >= 1 && limit <= 100)) {
      return true;
   } else {
      return false;
   }
}
// async function includeFilter(filter){
//     const tasks = await getAllQuerys();
//     if(tasks.includes(filter)) {
//       return true;
//     }else {
//       return false ;
//     }

// }
export async function getAllTasks(req = null, res) {
 let tasks = [] ;
const { filter, sort, order, page, limit } = req.query;
console.log(filter)
    if (((page && limit) != null) || (filter != null) || ((order && sort) != null) ) {
      console.log({order , sort})
       let offset = ((page-1) * limit )
       console.log(offset)
         console.log('primer')

         if (whitelist.includes(sort) && whitelist.includes(order) || (arenumerics(page, limit)) || filter != null ) {
            console.log('segundo')    
             tasks = await getAllQuerys(filter, sort, order, offset, limit)  
                console.log(tasks)
         } else {
            res.send('Bad Request', 400)
         }
      }
   else {
       tasks = await getAllQuerys()
       
   }
   res.send(tasks)
}
export async function getTask(req, res) {
   let id = req.params.id;
   let task = await get(id);
   if (task) {
      res.send(task);

   }
}
export async function deletee(req, res) {
   let id = req.params.id;
   res.send(await get(id)); 
   await deleteTask(id)
}
export async function insertTask(req, res) {
   const body = req.body;
  const {tarea , descripcion , prioridad} = body ;
    await insert(tarea, descripcion, prioridad); 
   res.send(req.body);  
 
}  
export async function updateTask(req, res) {
   const { tarea, descripcion, prioridad } = req.body;
   const id = req.params.id;   
   await update(tarea, descripcion, prioridad, id);  
   res.send(req.body); 
}  
export async function deleteAll(req, res) { 
   await deleteAllTasks();  
   res.send([]);
}
export async function finalizeTask(req, res) {
   const id = req.params.id;
   await finalize(id);
   res.send(id);
}
export async function desfinalizeTask(req, res) {
   const id = req.params.id;
   // await desfinalize(id) ;
   res.send(await desfinalize(id));
}





