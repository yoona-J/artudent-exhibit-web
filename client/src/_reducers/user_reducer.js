import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_LIB,
    GET_LIB_ITEMS,
    REMOVE_LIB_ITEM,
} from '../_actions/types';
 

export default function(state={},action){
    switch(action.type){
        case REGISTER_USER:
            return {...state, register: action.payload }
        case LOGIN_USER:
            return { ...state, loginSucces: action.payload }
        case AUTH_USER:
            return {...state, userData: action.payload }
        case LOGOUT_USER:
            return {...state }
        case ADD_TO_LIB:
            return {...state, userData: { ...state.userData, library: action.payload } }  
        case GET_LIB_ITEMS:
            return {...state, libDetail: action.payload }
        case REMOVE_LIB_ITEM:
            return {...state, libDetail: action.payload.productInfo, userData: { ...state.userData, library: action.payload.library } }  
        default:
            return state;
    }
}