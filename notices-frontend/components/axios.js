import axios from "axios";

const instance = axios.create({
    baseURL: 'http://192.168.1.170:8090/', //192.168.29.14
    // timeout: 10000,
    headers: {'X-Custom-Header': 'foobar'}
  });

export default instance;