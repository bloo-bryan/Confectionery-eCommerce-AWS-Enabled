import axios from 'axios';

const customFetch = axios.create({
    baseURL: 'http://localhost:8800',
})

export default customFetch;