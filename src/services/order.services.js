import axios from 'axios';
import config from '../config';

const baseURL = config.BASE_URL;

function findAllOrders(id) {
    return axios
        .get(`${baseURL}/merchant/${id}/transaction`)
        .then( res => res )
        .catch( err => {throw err} );
}

function findOrderById(id) {
    return axios
        .get(`${baseURL}/transaction/${id}`)
        .then( res => res )
        .catch( err => {throw err} );
}

export {
    findAllOrders,
    findOrderById
};