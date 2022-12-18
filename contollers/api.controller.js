"use strict"
import { getAll , get  , insert, deleteTask , update , deleteAllTasks , finalize , desfinalize} from "../models/chapter.model.js";
export async function getAllTasks(req , res) {
 
    let chapters = await getAll() ;
    res.send(chapters);
    
}
export async function  getTask(req,res) {
    let id = req.params.id ;
    let task = await get(id) ;
    if(task){
           res.send(task) ;

    }
 }
 export async function deletee(req , res){
    let id = req.params.id ;
    res.send(await get(id)) ;
    await deleteTask(id) }
 export async function insertTask(req , res){
 const {tarea , descripcion , prioridad} = req.body ;
 await insert(tarea , descripcion , prioridad) ;
 res.send(req.body) ;

 }
 export async function updateTask(req , res) {
    const {tarea , descripcion , prioridad } = req.body ;
    const id = req.params.id ;
    await update(tarea , descripcion , prioridad  , id) ;
    res.send(req.body) ;
 }
 export async function deleteAll(req , res){
    await deleteAllTasks() ;
    res.send([]) ;
}
export async function finalizeTask(req , res) {
   const id = req.params.id ;
   await finalize(id) ;
   res.send(id) ;
}
export async function desfinalizeTask(req , res) {
   const id = req.params.id ;
   // await desfinalize(id) ;
   res.send(await desfinalize(id)) ; 
}
 
 

