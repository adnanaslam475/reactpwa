import axios from 'axios';

const createInstance = axios.create({
    baseURL: 'https://burgerapp123.firebaseio.com/'
})

export default createInstance
