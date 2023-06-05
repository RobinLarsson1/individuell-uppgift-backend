import { getDb } from './database.js'
import express from 'express'

const db = getDb()
const router = express.Router()

function isValidUser(u) {

    if ((typeof u) !== 'object') {
        return false
    } else if (u === null) {
        return false
    }

    let usernameIsValid = (typeof u.username) === 'string';
    usernameIsValid = usernameIsValid && u.username !== '';
    
    let passwordIsValid = (typeof u.password) === 'string';
    passwordIsValid = passwordIsValid && u.password !== '';


    if (!usernameIsValid || !passwordIsValid) {
        console.log('mormin')
        return false
    }
    return true

    //User-objekten ska innehålla:
    //Id (number)
    //Name (string)
    //Password (string)
}

export { isValidUser }