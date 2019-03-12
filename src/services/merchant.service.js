import axios from 'axios';
import config from '../config';

const baseURL = config.BASE_URL;
const lambdaSync = config.LAMBDA_SYNC;

function findMerchant(id) {
    return axios
        .get (`${baseURL}/merchant/${id}`)
        .then( res => res )
        .catch( err => {throw err} );
}

function findUsers(id) {
    return axios
        .get(`${baseURL}/merchant/${id}/user`)
        .then( res => res )
        .catch( err => {throw err} );
}

function findGraphData(id, body) {
    return axios
        .get(`${baseURL}/merchant/${id}/graph?type=REVENUE_PROTECTED&span=DAY`, body)
        .then( res => res)
        .catch( err => {throw err} )
}

function findGraphDataByDate(id, date) {
    return axios
        .get(`${baseURL}/merchant/${id}/graph?type=REVENUE_PROTECTED&span=${date}`)
        .then( res => res)
        .catch( err => {throw err} )
}

function createMerchant(body) {
    return axios
        .post (`${baseURL}/merchant`, body)
        .then( res => res )
        .catch( err => {throw err} );
}

function syncDatabaseToCognito(body){
    return axios
        .post(`${lambdaSync}`, body )
        .then( res => res )
        .catch( err => {throw err} );
}

function findMerchantSignature(id) {
    return axios
        .get(`${baseURL}/merchant/${id}/signature`)
        .then( res => res )
        .catch( err => {throw err} )
}

function updateMerchantSignature(id, body) {
    return axios
        .put(`${baseURL}/merchant/${id}/signature`, body)
        .then( res => res )
        .catch( err => {throw err} )
}

function createExpertInstallRequest(body){
    return axios
        .post(`${config.ONBOARDING_EMAIL}`, body)
        .then(res => res)
        .catch( err => {throw err} )
}

export {
    findMerchant,
    findUsers,
    findGraphData,
    findGraphDataByDate,
    createMerchant,
    syncDatabaseToCognito,
    findMerchantSignature,
    updateMerchantSignature,
    createExpertInstallRequest
};