import axios from 'axios';

function createActiveEvent(body) {
    return axios
        .post ("https://trackcmp.net/event", body)
        .then( res => res )
        .catch( err => {throw err} );
}

export {
    createActiveEvent
};