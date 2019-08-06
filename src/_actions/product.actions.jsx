
import { productConstants } from '../_constants';
import { productService } from '../_services';
import { alertActions } from './'; 

export const productActions = {
    search,
    errors,
    getAll,
    getById,
    getPerPage,
    // delete: _delete
};


function search(query, page, per_page, token) {
    return dispatch => {
        dispatch(request( query )); 
            productService.search(query, page, per_page, token)
                .then(
                    data => {  
                        dispatch(success(query, data.quantity, data.products)); 
                    },
                    error => {
                        dispatch(failure(error.toString()));
                        dispatch(alertActions.error(error.toString()));
                    }
                ); 
    };

    function request(query) { return { type: productConstants.SEARCH_REQUEST, query } }
    function success(query, quantity, products) { return { type: productConstants.SEARCH_SUCCESS, query, quantity, products} }
    function failure(error) { return { type: productConstants.SEARCH_FAILURE, error } }
}

function errors() {
    productService.errors();
    return { type: productConstants.ERROR };
} 

function getAll(token) {
    return dispatch => { 
        dispatch(request());  
        productService.getAll(token)
            .then(
                data => dispatch(success(data.products)),
                error => dispatch(failure(error.toString()))
            );  
    };

    function request() { return { type: productConstants.GETALL_REQUEST } }
    function success(products) { return { type: productConstants.GETALL_SUCCESS, products } }
    function failure(error) { return { type: productConstants.GETALL_FAILURE, error } }
}

function getPerPage(query, page, per_page, token) { 
    return dispatch => { 
        dispatch(request(query));  
        productService.getPerPage(query, page, per_page, token)
            .then(
                data => dispatch(success(query, data.quantity, data.products)),
                error => dispatch(failure(error.toString()))
            );  
    };

    function request(query) { return { type: productConstants.GETPER_REQUEST, query } }
    function success(query, quantity, products) { return { type: productConstants.GETPER_SUCCESS, query, quantity, products } }
    function failure(error) { return { type: productConstants.GETPER_FAILURE, error } }
}

function getById(id, token) {
    return dispatch => {
        dispatch(request()); 
        productService.getById(id, token)
            .then(
                data => dispatch(success(data.product)),
                error => dispatch(failure(error.toString()))
            ); 
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