let initialState = {};

function platformInfo( state = initialState, action ){
    switch( action.type ) {
        case "UPDATE_PLATFORM":
            return Object.assign( action.payload );

        default: return state;
    }
}

export default platformInfo;