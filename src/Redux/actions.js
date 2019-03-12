export const UPDATE_ORDER = "UPDATE_ORDER";
export const UPDATE_MERCHANT = "UPDATE_MERCHANT";
export const UPDATE_PLATFORM = "UPDATE_PLATFORM";
export const UPDATE_USER = "UPDATE_USER";
export const USER_LOGOUT = 'USER_LOGOUT';
export const UPDATE_ENTITY = 'UPDATE_ENTITY';


export function updateOrder(order){
    return {
        type: UPDATE_ORDER,
        payload: order
    }
}

export function updateMerchant(merchant){
    return {
        type: UPDATE_MERCHANT,
        payload: merchant
    }
}

export function updatePlatform(platform){
    return {
        type: UPDATE_PLATFORM,
        payload: platform
    }
}

export function updateUser(user){
    return {
        type: UPDATE_USER,
        payload: user
    }
}

export function userLogout() {
    return {
        type: USER_LOGOUT,
        payload: ''
    }
}

export function updateEntity(entity){
    return {
        type: UPDATE_ENTITY,
        payload: entity
    }
}