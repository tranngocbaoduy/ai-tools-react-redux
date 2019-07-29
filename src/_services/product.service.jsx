// import { authHeader } from '../_helpers';
import axios from 'axios'; 
import { domain } from './'

export const productService = {
    search, 
    getAll,
    errors,
    // register,
    // getAll,
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

async function search(query){  
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };
    return await axios.post(domain + 'search',JSON.stringify({query}), requestOptions)
            .then(handleResponse)
            .then(data => { 
                return data.products;
            });
}

async function getAll(page, token){ 
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return await axios.post(domain + 'get_products',JSON.stringify({page, token}), requestOptions)
            .then(handleResponse)
            .then(data => { 
                console.log(data.products)
                return data.products
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
                console.log(data.product)
                return data.product
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

        const error = (data && data.message) || response.statusText; 
        return Promise.reject(error);
    }  
    return data.payload; 
}