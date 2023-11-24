import axios from 'axios';

const API_URL = 'http://localhost:3000'
const API_CRYPTO_URL = 'https://api.coincap.io/v2'


export async function login(username, password) {
    return await axios.post(API_URL + '/login', {})
}

export async function getCryptos() {
    return await axios.get(API_CRYPTO_URL + '/assets?limit=10')
}

export async function getCrypto(id) {
    return await axios.get(API_CRYPTO_URL + '/assets/' + id)
}

export async function getCryptoHistory(id, startTime, endTime) {
    return await axios.get(API_CRYPTO_URL + '/assets/' + id + '/history?interval=h1' + '&start=' + startTime + '&end=' + endTime)
}

export async function getExchanges() {
    return await axios.get(API_CRYPTO_URL + '/exchanges?limit=10')
}

export async function getAllExchanges() {
    return await axios.get(API_CRYPTO_URL + '/exchanges')
}

export async function getAllMarkets() {
    return await axios.get(API_CRYPTO_URL + '/markets')
}

export async function getAllCrypto() {
    return await axios.get(API_CRYPTO_URL + '/assets')
}

export async function getMarketByCryptoId(cryptoId) {
    return await axios.get(API_CRYPTO_URL + '/markets?baseId=' + cryptoId)
}

export async function getExchangeById(exchangeId) {
    return await axios.get(API_CRYPTO_URL + '/exchanges/' + exchangeId)
}