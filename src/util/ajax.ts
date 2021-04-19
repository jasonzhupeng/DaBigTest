import axios from 'axios';
import vm from '@/main';

const ajax = axios.create({
    baseURL: "/api",
    timeout: 10000
});



/* 异常统一处理*/
ajax.interceptors.response.use(res => {
    return res;
}, error => {
    if (!error || !error.response) {
        vm.$Message.error("网络错误，response is Empty");
    } else if (!error.response.data || !error.response.data.error) {
        vm.$Message.error("response.data.error is Empty");
    } else if (!!error.response.data.error.details && error.response.data.error.details) {
        vm.$Message.error(error.response.data.error.details);
    } else if (!!error.response.data.error.message && error.response.data.error.message) {
        vm.$Notice.error({
            title: "温馨提示",
            desc: error.response.data.error.message,
            duration: 5000
        });
    }
    else {
        vm.$Message.error("服务器错误");
    }

    return Promise.reject(error);
});

export default ajax;