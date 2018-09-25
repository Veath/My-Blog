const env = __ENV__;
let appid = '';
let weChatHost = 'https://open.weixin.qq.com/connect/oauth2/authorize';
switch (env) {
    case 'production':
    case 'cdn':
        appid = 'wx83fd00e39502c5a7'
        break
    case 'pre':
        appid = 'wx83fd00e39502c5a7'
        break
    case 'uat':
        appid = 'wx555a80b7106c612a'
        break
    default:
        appid = 'wx875c67a4fc574d93'
}

function getWeChatAuthUrl(url: string = window.location.href.split('#')[0], state = 'auth') {
    return `${weChatHost}?appid=${appid}&redirect_uri=${url}&response_type=code&scope=snsapi_base&state=${state}#wechat_redirect`
}

export default {
    getWeChatAuthUrl: getWeChatAuthUrl,
    appid: appid
}