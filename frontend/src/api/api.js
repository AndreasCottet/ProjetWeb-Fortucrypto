import axios from 'axios';

const API_URL = 'http://localhost:3000'

export async function login(username, password) {
    return await axios.post(API_URL + '/login', {})
}