import APIs from '../config/apiUrl';
import httpRequest from './request';

type dataType = { [x: string]: any }

const APIHelper = {
    // 测试接口
    getUserInfo(data: dataType) {
        return httpRequest.get(APIs.getUserInfo, {
            params: data
        });
    },
    getWXSignature() {
        return httpRequest.get(APIs.getWXSignature, {
            params: {url: window.location.href.split('#')[0]}
        })
    }
};

export default APIHelper;
