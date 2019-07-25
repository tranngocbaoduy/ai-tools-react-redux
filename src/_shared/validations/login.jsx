import validator from 'Validator'
import isEmpty from 'lodash/isEmpty'

export default function validateInput(data){
    let errors = {}

    if(validator.isEmpty(data.email)){
        errors.email = 'Email is required'
    }

    if(validator.isEmpty(data.password)){
        errors.password = 'Password is required'
    }

    if(validator.isEmpty(data.username)){
        errors.username = 'Username is required'
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}