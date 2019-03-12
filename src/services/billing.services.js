import axios from 'axios';
import config from '../config';

const baseURL = config.BASE_URL;

function findMerchantBilling(id) {
    return axios
        .get (`${baseURL}/merchant/${id}/billing`)
        .then( res => res )
        .catch( err => {throw err} );
}

function createMerchantBilling(id, body) {
    return axios
        .post(`${baseURL}/merchant/${id}/billing`, body)
        .then( res => res )
        .catch( err => {throw err} );
}

export {
    findMerchantBilling,
    createMerchantBilling
};