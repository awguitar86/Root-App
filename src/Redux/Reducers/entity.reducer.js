let initialState = {};

function entityInfo( state = initialState, action ){
    switch( action.type ) {
        case "UPDATE_ENTITY":
            return Object.assign( action.payload );

        default: return state;
    }
}

export default entityInfo;