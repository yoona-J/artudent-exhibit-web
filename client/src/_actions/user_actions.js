import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_LIB,
    GET_LIB_ITEMS,
    REMOVE_LIB_ITEM,
    GET_UPLOAD_ITEMS,
} from './types';
import { USER_SERVER } from '../components/Config.js';

export function registerUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/register`,dataToSubmit)
        .then(response => response.data);
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/login`,dataToSubmit)
                .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth(){
    const request = axios.get(`${USER_SERVER}/auth`)
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get(`${USER_SERVER}/logout`)
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export function AddToLib(id){

    let body = {
        productId: id
    }
    
    const request = axios.post(`${USER_SERVER}/library`, body)
        .then(response => response.data);

    return {
        type: ADD_TO_LIB,
        payload: request
    }
}

export function getLibItems(libItems, userLib){
    
    const request = axios.get(`/api/product/products_by_id?id=${libItems}&type=array`)
        .then(response => {
            // libItems에 해당하는 정보들을 product collection에서 가져온 후에 quentity 정보를 넣어준다

            userLib.forEach(libItem => {
                response.data.forEach((productDetail, index) => {
                    //게시물의 id와 user library의 id와 같으면 quentity를 가져온다

                    if(libItem.id === productDetail._id) {
                        response.data[index].quantity = libItem.quantity
                    }
                })
            })
            return response.data;
        });

    return {
        type: GET_LIB_ITEMS,
        payload: request
    }
}

export function removeLibItem(productId){
    
    const request = axios.get(`/api/users/removeFromLib?id=${productId}`)
        .then(response => {
            //productInfo와 library 정보를 조합해 libDetail을 만듬
            response.data.library.forEach(item => {
                response.data.productInfo.forEach((product, index) => {
                    if(item.id === product._id) {
                        response.data.productInfo[index].quantity = item.quantity
                    }
                })
            })
            return response.data;
        });

    return {
        type: REMOVE_LIB_ITEM,
        payload: request
    }
}

export function getUploadItems(uploadItems, userUpload){
    
    const request = axios.get(`/api/product/products_by_id?id=${uploadItems}&type=array`)
        .then(response => {
            // libItems에 해당하는 정보들을 product collection에서 가져온 후에 quentity 정보를 넣어준다

            userUpload.forEach(uploadItem => {
                response.data.forEach((productDetail, index) => {
                    //게시물의 id와 user library의 id와 같으면 quentity를 가져온다

                    if(uploadItem.id === productDetail._id) {
                        response.data[index].quantity = uploadItem.quantity
                    }
                })
            })
            return response.data;
        });

    return {
        type: GET_UPLOAD_ITEMS,
        payload: request
    }
}
