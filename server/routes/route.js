import express from "express";


const route = express.Router();


route.post('./todos',(request,response)=>{
    console.log(request.body);
})


export default route;