import express from 'express';
import * as SDA from '../carriers/sda.js'

var router = express.Router();

router.get(`/sda/:track`, async (req , res)=>{

    const API = await SDA.getShip(req.params.track, (e) => {console.log(e)})
    res.json(API)

});

export default router;
