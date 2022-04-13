import express from 'express'
import cors from 'cors'
import superagent from "superagent"
import fs from 'fs'
import 'dotenv/config'

import sdaRouter from './router/sdaRouter.js';
const app = express()

app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//Set spaces for JSON response
app.set('json spaces', 2);

//Include Router
app.use(sdaRouter);

//Crawl baseURI
const agent = superagent.agent();




app.get(`/config`, async (req , res)=>{
    


    

});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {console.log(`Server opened on ${PORT}`)})