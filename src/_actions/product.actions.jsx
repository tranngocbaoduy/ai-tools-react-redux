
import { productConstants } from '../_constants';
import { productService } from '../_services';
import { alertActions } from './';
import { isExistToken } from '../_helpers'

export const productActions = {
    search,
    errors,
    getAll,
    getById,
    // delete: _delete
};


function search(query) {
    return dispatch => {
        dispatch(request( query ));
        if(isExistToken()){
            productService.search(query)
                .then(
                    product => {  
                        dispatch(success(product)); 
                    },
                    error => {
                        dispatch(failure(error.toString()));
                        dispatch(alertActions.error(error.toString()));
                    }
                );
        } 
    };

    function request(query) { return { type: productConstants.SEARCH_REQUEST, query } }
    function success(product) { return { type: productConstants.SEARCH_SUCCESS, product } }
    function failure(error) { return { type: productConstants.SEARCH_FAILURE, error } }
}

function errors() {
    productService.errors();
    return { type: productConstants.ERROR };
}

// function register(user) {
//     return dispatch => {
//         dispatch(request(user));

//         userService.register(user)
//             .then(
//                 user => { 
//                     dispatch(success());
//                     history.push('/login');
//                     dispatch(alertActions.success('Registration successful'));
//                 },
//                 error => {
//                     dispatch(failure(error.toString()));
//                     dispatch(alertActions.error(error.toString()));
//                 }
//             );
//     };

//     function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
//     function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
//     function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
// }

function getAll(page, token) {
    return dispatch => { 
        dispatch(request()); 
        if(isExistToken()){
            productService.getAll(page, token)
            .then(
                products => dispatch(success(products)),
                error => dispatch(failure(error.toString()))
            ); 
        } 
    };

    function request() { return { type: productConstants.GETALL_REQUEST } }
    function success(products) { return { type: productConstants.GETALL_SUCCESS, products } }
    function failure(error) { return { type: productConstants.GETALL_FAILURE, error } }
}

function getById(id, token) {
    return dispatch => {
        dispatch(request());
        if(isExistToken()){
            productService.getById(id, token)
                .then(
                    product => dispatch(success(product)),
                    error => dispatch(failure(error.toString()))
                );
        }
    };

    function request() { return { type: productConstants.GET_REQUEST } }
    function success(product) { return { type: productConstants.GET_SUCCESS, product } }
    function failure(error) { return { type: productConstants.GET_FAILURE, error } }
}

// // prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//     return dispatch => {
//         dispatch(request(id));

//         userService.delete(id)
//             .then(
//                 user => dispatch(success(id)),
//                 error => dispatch(failure(id, error.toString()))
//             );
//     };

//     function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
//     function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
//     function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
// }