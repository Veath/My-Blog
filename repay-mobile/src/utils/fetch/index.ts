import 'whatwg-fetch';


(function promiseFinally() {
    let PromiseProto: any = Promise.prototype;
    if (typeof PromiseProto.finally !== 'function') {
        var onfinally = function onfinally(this: any, callback: () => void) {
            var P = this.constructor;
            return this.then(function (value: object) {
                return P.resolve(callback()).then(function () {
                    return value;
                });
            }, function (reason: any) {
                return P.resolve(callback()).then(function () {
                    throw reason;
                });
            });
        };
        Object.defineProperty(Promise.prototype, 'finally', {
            value: onfinally
        });
    }
})();

const get = (url: string, options: object) => {
    options = options || {};
    return _fetch(fetch(url, {
        ...options,
        method: 'GET',
    }), 60000);
};

const post = (url: string, options: {data?: object}) => {
    options = options || {};
    let header = {
        'Content-Type': 'application/json',
    };
    return _fetch(fetch(url, {
        headers: header,
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(options.data || {})
    }), 60000);
};

const _fetch = (fetch_promise: Promise<Response>, timeout: number) => {
    let tiemerId = -1;
    let abort_promise = new Promise(function (resolve, reject) {
        tiemerId = window.setTimeout(reject, timeout, 'timeout');
    });

    return (Promise.race as any)([
        fetch_promise,
        abort_promise
    ]).finally(() => {
        clearTimeout(tiemerId);
    });
};

export default {
    get,
    post,
};
