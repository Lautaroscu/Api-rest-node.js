"use strict" 
import bodyParser from 'body-parser';
import cors from 'cors' ;
import  { getAllTasks , getTask, insertTask, deletee , updateTask , deleteAll , finalizeTask , desfinalizeTask}from './contollers/api.controller.js';
import express from 'express';
const app = express() ;//estilo router
const whitelist = ['http://localhost:4200']
app.use((cors({
  origin: whitelist ,  
}))) ;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(bodyParser.text())
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error())
    }
  }
}


  
    // ['Access-Control-Allow-Origin' , whitelist] ,
    // ['Access-Control-Allow-Headers' , 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method'] ,
    // ['Allow' , methods]
  


const port = 3000;


//endpoints o tablas de ruteo
app.get('/', (req , res)=>{ //req = entrada del http y res = salida del http (response)
    console.log(req) ;  
  
    res.send('Hello World!') ;
})
//devuelve conjunto de items en forma de json
app.get('/tasks' , getAllTasks) ;
app.get('/tasks/:id' , getTask)  ;
app.delete('/tasks/:id' , deletee); 
app.post('/tasks' , insertTask);
app.put('/tasks/:id' , updateTask);
app.delete('/tasks' , deleteAll) ;
app.put('/tasks/finalize/:id' , finalizeTask);
app.put('/tasks/desfinalize/:id' , desfinalizeTask);




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`) 
})
