type UrlData = {
    [key: string]: string;
}

function getRequest(): {[x: string]: any} {
    const url = location.href; //获取url中"?"符后的字串
    const theRequest: UrlData = {};
    if (url.indexOf('?') !== -1) {
        const str = url.substr(url.indexOf('?') + 1);
        const strs = str.split('&');
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split('=')[0]] = decodeURIComponent(strs[i].split('=')[1]);
        }
    }
    return theRequest;
}

export default getRequest;
