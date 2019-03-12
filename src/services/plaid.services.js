import axios from 'axios';
import config from '../config';

const baseURL = config.plaid;

function findInstitutions(){
    return axios
        .get (`${baseURL}/institutions/get`)
        .then( res => res )
        .catch( err => {throw err} )
}

export {
    findInstitutions
};