import axios from 'axios';
import config from '../config';

const baseURL = config.BASE_URL;

function findPlatformKey(id) {
    return axios
        .get (`${baseURL}/platform/${id}/key`)
        .then( res => res )
        .catch( err => {throw err} );
}

function findMerchantKey(id) {
    return axios
        .get (`${baseURL}/merchant/${id}/key`)
        .then( res => res )
        .catch( err => {throw err} );
}

function hello() {
    return axios
        .get(`${baseURL}/hello`)
        .then( res => res)
        .catch( err => {throw err} )
}

export {
    findPlatformKey,
    findMerchantKey,
    hello
};