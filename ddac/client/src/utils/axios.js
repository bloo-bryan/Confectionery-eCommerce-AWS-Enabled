import axios from 'axios';

const customFetch = axios.create({
    baseURL: 'https://d1h2ql58akp117.cloudfront.net',
})

export default customFetch;