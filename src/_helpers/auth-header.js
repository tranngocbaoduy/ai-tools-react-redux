export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': user.token };
    } else {
        return {};
    }
}

export function header(){
    return { 
        'Accept': 'application/json',
        'Content-Type': 'application/json', 
        'Referrer-Policy': 'origin-when-cross-origin', 
        'Access-Control-Allow-Headers':'Authorization',
        'Access-Control-Allow-Origin': '*', 
    }
}