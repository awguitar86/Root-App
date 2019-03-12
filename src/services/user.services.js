import axios from 'axios';
import config from '../config';

const baseURL = config.BASE_URL;

function findUser(id) {
    return axios
        .get (`${baseURL}/user/${id}`)
        .then( res => res )
        .catch( err => {throw err} );
}

function createMerchantUser(id, body) {
    return axios
        .post (`${baseURL}/merchant/${id}/user`, body)
        .then( res => res )
        .catch( err => {throw err} );
}

function updateUserInfo(id, userid, body) {
    return axios
        .put(`${baseURL}/merchant/${id}/user/${userid}`, body)
        .then( res => res )
        .catch( err => {throw err} );
}

export {
    findUser,
    createMerchantUser,
    updateUserInfo
};