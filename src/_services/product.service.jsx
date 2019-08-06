// import { authHeader } from '../_helpers';
import axios from 'axios'; 
import { domain } from './'
import { history } from '../_helpers'

export const productService = {
    search, 
    getAll,
    errors,
    // register,
    getPerPage,
    getById,
    // update,
    // delete: _delete
};

// function login(data) {
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data.email, data.password )
//     };
//     return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
//         .then(handleResponse)
//         .then(user => {
//             // store user details and jwt token in local storage to keep user logged in between page refreshes
//             localStorage.setItem('user', JSON.stringify(user));

//             return user;
//         });
//     // return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
//     //     .then(handleResponse)
//     //     .then(user => {
//     //         // store user details and jwt token in local storage to keep user logged in between page refreshes
//     //         localStorage.setItem('user', JSON.stringify(user));

//     //         return user;
//     //     });
// }
function errors(){
    return {message: 'Server isn\'t working, please try again after few minutes'}
}

async function search(query, page, per_page, token){  
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };
    return await axios.post(domain + 'get_product_per_page',JSON.stringify({query, page, per_page, token}), requestOptions)
            .then(handleResponse)
            .then(data => { 
                return data;
            });
}

async function getAll(token){ 
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return await axios.post(domain + 'get_products',JSON.stringify({token}), requestOptions)
            .then(handleResponse)
            .then(data => {  
                return data
            });
}

async function getPerPage(query, page, per_page,token){ 
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return await axios.post(domain + 'get_product_per_page',JSON.stringify({query, token, page, per_page}), requestOptions)
            .then(handleResponse)
            .then(data => {  
                return data
            });
}

async function getById(id, token) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    console.log(id, token)
    return await axios.post(domain + 'get_product',JSON.stringify({id, token}), requestOptions)
            .then(handleResponse)
            .then(data => {  
                return data
            });
}

// function getAll() {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };

//     return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
// }

// function getById(id) {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };

//     return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
// }

// function register(user) {
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(user)
//     };

//     return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);
// }

// function update(user) {
//     const requestOptions = {
//         method: 'PUT',
//         headers: { ...authHeader(), 'Content-Type': 'application/json' },
//         body: JSON.stringify(user)
//     };

//     return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);;
// }

// // prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//     const requestOptions = {
//         method: 'DELETE',
//         headers: authHeader()
//     };

//     return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
// }

function handleResponse(response) {
    const data = response.data   
    if (!data.status) {  
        if (response.status === 401 || response.status === 500) { 
            errors(); 
        } 
        if(data.message === "Unauthorized"){ 
            history.push('/login') 
        }
        const error = (data && data.message) || response.statusText;  
        return Promise.reject(error);
    }  
  
    return data.payload; 
}