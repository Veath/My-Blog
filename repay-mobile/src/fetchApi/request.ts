import httpRequest from '../utils/fetch';
import { RequestLoading } from '../components';

function queryParams(params: {[key: string]: any}) {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
}

const post = (url: string, option: { [x: string]: any }) => {
    const modal = option.data && option.data.modal;
    option.data && delete option.data.modal;
    modal !== false && RequestLoading.show();

    return httpRequest.post(url, option).then((res: any) => {
        modal !== false && RequestLoading.show();
        return res.json();
    }).then((res: any) => {
        if (res.status === 'success') {
            return Promise.resolve(res.data);
        } else {
            return Promise.reject(res);
        }
    }).catch((e: any) => {
        modal !== false && RequestLoading.hide();
        if (e.returnCode) {
            return Promise.reject(e);
        } else {
            return Promise.reject({ returnCode: 'error', returnMsg: '网络异常,请重试！' });
        }
    });
};

const get = (url: string, option: { [x: string]: any }) => {
    const modal = option.data && option.data.modal;
    option.data && delete option.data.modal;
    modal !== false && RequestLoading.show();

    if (option.params) {
        url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(option.params);
        delete option.params;
    }

    return httpRequest.get(url, option).then((res: any) => {
        modal !== false && RequestLoading.hide();
        return res.json();
    }).then((res: any) => {
        if (res.status === 'success') {
            return Promise.resolve(res.data);
        } else {
            return Promise.reject(res);
        }
    }).catch((e: any) => {
        modal !== false && RequestLoading.hide();
        if (e.returnCode) {
            return Promise.reject(e);
        } else {
            return Promise.reject({ returnCode: 'error', returnMsg: '网络异常,请重试！' });
        }
    });
};

const getJson = (url: string, option: { [x: string]: any }) => {
    return httpRequest.get(url, option).then((res: any) => {
        return res.json();
    }).catch(() => {
        return Promise.reject({ returnCode: 'error', returnMsg: '网络异常,请重试！' });
    });
};

export default {
    post,
    get,
    getJson
};
