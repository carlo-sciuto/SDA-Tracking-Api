import fetch from 'node-fetch'
import 'dotenv/config'
import config from '../config.json' assert { type: 'json' };

/**
 * Get SDA API from BarCode.
 * @param {string} ldv - The string of barcode
 * @function callback(result)- The callback function with API result
 * @returns {response} - Response from API request
 */

const getShip = async (ldv, callback) => {

    //const updateConfig = await fetch('');

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