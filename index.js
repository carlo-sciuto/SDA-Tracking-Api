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
    const base = 'https://www.sda.it';
    const url = 'https://www.sda.it/wps/portal/Servizi_online/dettaglio-spedizione/';

    const getBrowserInfo = await agent.get(url)
    
    const baseURI = base+getBrowserInfo.headers["content-location"]

    const unixTime = Math.floor(Date.now() / 1000);

    try {

        const configJSON = JSON.stringify({
            "unix": unixTime,
            "baseURL": baseURI,
            "endpoints": {
                home: "p0/IZ7_MID81JC0OO33C0QC80728E0G81=CZ6_MID81JC0OO33C0QC80728E00F7=NJQCPVIEW=/",
                ricercaRitiro: "p0/IZ7_MID81JC0OO33C0QC80728E0G81=CZ6_MID81JC0OO33C0QC80728E00F7=NJQCPricercaRitiro.json=/",
                inviaSMSEmail: "p0/IZ7_MID81JC0OO33C0QC80728E0G81=CZ6_MID81JC0OO33C0QC80728E00F7=NJQCPinviaSMSEmail.json=/",
                ricercaSpedizione: "p0/IZ7_MID81JC0OO33C0QC80728E0G81=CZ6_MID81JC0OO33C0QC80728E00F7=NJQCPricercaSpedizione.json=/",
                inviaAnnullaRitiro: "p0/IZ7_MID81JC0OO33C0QC80728E0G81=CZ6_MID81JC0OO33C0QC80728E00F7=NJQCPinviaAnnullaRitiro.json=/",
                dettaglioGiacenza: "p0/IZ7_MID81JC0OO33C0QC80728E0G81=CZ6_MID81JC0OO33C0QC80728E00F7=NJQCPdettaglioGiacenza.json=/",
                svincoloSpedizione:"p0/IZ7_MID81JC0OO33C0QC80728E0G81=CZ6_MID81JC0OO33C0QC80728E00F7=NJQCPsvincoloSpedizione.json=/",
                sendCodiceAutorizzativo:"p0/IZ7_MID81JC0OO33C0QC80728E0G81=CZ6_MID81JC0OO33C0QC80728E00F7=NJQCPsendCodiceAutorizzativo.json=/",
                modificaDestinazione:"p0/IZ7_MID81JC0OO33C0QC80728E0G81=CZ6_MID81JC0OO33C0QC80728E00F7=NJQCPmodificaDestinazione.json=/",
                ricavaElencoLocalita: "p0/IZ7_MID81JC0OO33C0QC80728E0G81=CZ6_MID81JC0OO33C0QC80728E00F7=NJQCPricavaElencoLocalita.json=/",
                modificaDestinazione: "p0/IZ7_MID81JC0OO33C0QC80728E0G81=CZ6_MID81JC0OO33C0QC80728E00F7=NJQCPmodificaDestinazione.json=/",
                dettaglioRicerca: "/wps/portal/Servizi_online/dettaglio-spedizione?locale=it",
                ricavaListaKipoint: "p0/IZ7_MID81JC0OO33C0QC80728E0G81=CZ6_MID81JC0OO33C0QC80728E00F7=NJQCPricavaListaKipoint.json=/"
            }
        }, null, 4);
    
        // write file to disk
        fs.writeFileSync('./config.json', configJSON, 'utf8')
    
    } catch (err) {
        console.log(`Error writing file: ${err}`);
    }

});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {console.log(`Server opened on ${PORT}`)})