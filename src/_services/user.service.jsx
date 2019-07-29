// import { authHeader, setTimeLogout } from '../_helpers';
import axios from 'axios';
import { domain } from './'

export const userService = {
    login,
    logout,
    register, 
    send_reset_password,
    reset_password,
    getAll,
    getByEmail,
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

async function login(info, type){ 
    console.log(info)
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': "*",
        }
    };
    return await axios.post( domain + 'login',JSON.stringify({info, type} ), requestOptions)
            .then(handleResponse)
            .then(user => { 
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                return user;
            });
}

async function send_reset_password(email){ 
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };
    return await axios.post(domain + 'reset_password',JSON.stringify({email} ), requestOptions)
            .then(handleResponse) 
}

async function reset_password(password, token){ 
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };
    return await axios.post(domain + 'reset_password_token',JSON.stringify({password, token} ), requestOptions)
            .then(handleResponse) 
} 

function logout() {
    // remove user from local storage to log user out 
    localStorage.removeItem('user');
}

async function register(username, email, password, role) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, 
    };

    return await axios.post(domain + 'register',JSON.stringify({username, email, password, role} ), requestOptions)
        .then(handleResponse) 
}

async function getAll(token) { 
    const requestOptions = {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }
    }; 
    return await axios.post(domain + 'get_users',JSON.stringify({token}), requestOptions)
            .then(handleResponse)
            .then(users => { 
                // store user details and jwt token in local storage to keep user logged in between page refreshes 
                return users;
            });
 
}

async function getByEmail(email, token) {
    const requestOptions = {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }
    };  
    return await axios.post( domain + 'get_user',JSON.stringify({token, email} ), requestOptions)
            .then(handleResponse)
            .then(user => { 
                // store user details and jwt token in local storage to keep user logged in between page refreshes 
                return user;
            });
}



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
        if (response.status === 401) {
            // auto logout if 401 response returned from api
            logout();
            // location.reload(true);
        }

        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }  
    return data.payload; 
}