let initialState = {};

function merchantInfo( state = initialState, action ){
    switch( action.type ) {
        case "UPDATE_MERCHANT":
            return Object.assign( action.payload );

        default: return state;
    }
}

export default merchantInfo;