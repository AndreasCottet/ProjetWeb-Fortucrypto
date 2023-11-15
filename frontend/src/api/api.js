import axios from 'axios';

const API_URL = 'http://localhost:3000'
const API_CRYPTO_URL = 'https://api.coincap.io/v2'

export async function login(username, password) {
    return await axios.post(API_URL + '/login', {})
}

export async function getCryptos() {
    return await axios.get(API_CRYPTO_URL + '/assets?limit=10')
}