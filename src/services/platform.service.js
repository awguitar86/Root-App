import axios from 'axios';
import config from '../config';

const baseURL = config.BASE_URL + '/platform';

function findPlatform(id) {
    return axios
        .get (`${baseURL}/${id}`)
        .then( res => res )
        .catch( err => {throw err} );
}

function findPlatformMerchants(id) {
    return axios
        .get (`${baseURL}/${id}/merchant`)
        .then( res => res )
        .catch( err => {throw err} );
}

function findPlatformUsers(id) {
    return axios
        .get (`${baseURL}/${id}/user`)
        .then( res => res )
        .catch( err => {throw err} );
}

function createPlatformUser(id, body) {
    return axios
        .post (`${baseURL}/${id}/user`, body)
        .then( res => res )
        .catch( err => {throw err} );
}

function updatePlatformUser(id, body) {
    return axios
        .put (`${baseURL}/${id}/user`, body)
        .then( res => res )
        .catch( err => {throw err} );
}

function findPlatformBilling(id) {
    return axios
        .get (`${baseURL}/${id}/billing`)
        .then( res => res )
        .catch( err => {throw err} );
}

function createPlatformBilling(id, body) {
    return axios
        .post (`${baseURL}/${id}/billing`, body)
        .then( res => res )
        .catch( err => {throw err} );
}

function findPlatformGraph(id) {
    return axios
        .get (`${baseURL}/${id}/graph?type=REVENUE_PROTECTED&span=DAY`)
        .then( res => res )
        .catch( err => {throw err} );
}

function findPlatformGraphDate(id, date) {
    return axios
        .get (`${baseURL}/${id}/graph?type=REVENUE_PROTECTED&span=${date}`)
        .then( res => res )
        .catch( err => {throw err} );
}

function findPlatformSignature(id) {
    return axios
        .get(`${baseURL}/${id}/signature`)
        .then( res => res )
        .catch( err => {throw err} )
}

function updatePlatformSignature(id, body) {
    return axios
        .put(`${baseURL}/${id}/signature`, body)
        .then( res => res )
        .catch( err => {throw err} )
}

export {
    findPlatform,
    findPlatformMerchants,
    findPlatformUsers,
    createPlatformUser,
    updatePlatformUser,
    findPlatformBilling,
    createPlatformBilling,
    findPlatformGraph,
    findPlatformGraphDate,
    findPlatformSignature,
    updatePlatformSignature
};