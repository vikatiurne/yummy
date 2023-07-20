import axios from 'axios';

const $api= axios.create({
  withCredentials: true, //автоматич запись cookie к каждому запросу
  baseURL: process.env.REACT_APP_API_URL,
});

// автозапись access token в headers запроса
$api.interceptors.request.use(config=>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

export default $api