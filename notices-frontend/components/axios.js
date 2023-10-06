import axios from "axios";

const instance = axios.create({
    baseURL: 'http://172.20.10.2:8090/', //192.168.29.14
    // timeout: 10000,
    headers: {'X-Custom-Header': 'foobar'}
  });

export default instance;