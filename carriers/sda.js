import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import {configSDA} from '../config/config.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Get SDA API from BarCode.
 * @param {string} ldv - The string of barcode
 * @function callback(result)- The callback function with API result
 * @returns {response} - Response from API request
 */

const getShip = async (ldv, callback) => {

    const unixTime = Math.floor(Date.now() / 1000);
    console.log(path.resolve(__dirname, '../config/config.json'));
    
    //Read CONFIG JSON
    const configJSON = fs.readFileSync(path.resolve(__dirname, '../config/config.json'), 'utf8');
    let config = JSON.parse(configJSON);

    if(unixTime+(24*60*60) > config.unix) {
        let reConfig = await configSDA();
        config = JSON.parse(reConfig.data);
        console.log(config);
    }

    const endpoint = config.baseURL + config.endpoints.ricercaSpedizione;

    const options = {
        method: 'POST',
        body: new URLSearchParams({
            'modalita': '01',
            'codiceRicercato': ldv,
            'campiRicercaVuoti': 'false'
        })
    };

    let response = await fetch(endpoint, options);
    
    if(response.status == 200) {
        response = await response.json();

        if( typeof callback == "function" ) {
            callback(response)
        }

        return response;

    } else {
        return console.error(`Server nor running or Endpoints doesnt work anymore`);
    }

}

export {getShip}