import {userActions} from '../_actions' 
import axios from 'axios'; 
import {history} from '../_helpers'
import { domain } from '../_services'
import {header} from './auth-header'

export async function isExistToken(){
    let user = JSON.parse(localStorage.getItem('user'));
    const token = user? user.token: ''; 
    if(token === ''){
        userActions.logout();
        history.push('/login') 
        return;
    } 
    const requestOptions = {
        method: 'POST',
        headers: header()
    };
    return await axios.post( domain + 'token',JSON.stringify({token}), requestOptions)
            .then(data => { 
                if (data.data.status){ return true }
                else {
                    userActions.logout();
                    history.push('/login')
                    return;
                } 
            });
} 