import { combineReducers } from 'redux';
import orderInfo from './Reducers/orders.reducer';
import merchantInfo from './Reducers/merchant.reducer';
import platformInfo from './Reducers/platform.reducer';
import userInfo from './Reducers/user.reducer';
import entityInfo from './Reducers/entity.reducer';


export const rootReducer = combineReducers({
    orderInfo,
    merchantInfo,
    platformInfo,
    userInfo,
    entityInfo
})