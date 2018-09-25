const HOST: {
    [x: string]: {[y: string]: string}
} = {
    dev: {
        api: 'http://wx2.dafycredit.cn'
    },
    uat: {
        api: 'http://wx.dafycredit.cn',
    },
    pre: {
        api: 'http://3c-uat.dafysz.cn:8180'
    },
    prod: {
        api: 'https://wx.dafysz.cn'
    },
    cdn: {
        api: 'https://wx.dafysz.cn'
    }
};

const env = HOST[__SERVER_ENV__];

const APIs = {
    getUserInfo: `${env.api}/wechat-web/authen/user/info`,
    getWXSignature: `${env.api}/wechat-web/tokens/getWechatJsSdkByUrl`
};

export default APIs;
