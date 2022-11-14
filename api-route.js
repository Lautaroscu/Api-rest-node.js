"use strict" 
//const  ChaptersController = requiere('./contollers/api.controller.js') ;
const express = requiere('express');
const app = express() ;//estilo router
const port = 3000;

//endpoints o tablas de ruteo
app.get('/', (req , res)=>{ //req = entrada del http y res = salida del http (response)
    console.log(req) ;  
    res.send('Hello World!') ;
})
//app.get('/chapters' , ChaptersController.getAll)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`) 
})
