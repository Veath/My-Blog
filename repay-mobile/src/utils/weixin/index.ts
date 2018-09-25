import { resolve } from "dns";

interface configTyeps {
    debug: boolean,
    appId: string,
    timestamp: string,
    nonceStr: string,
    signature: string,
    jsApiList?: string[]
}

let isReady: boolean = false;
export default {
    init({
        debug,
        appId,
        timestamp,
        nonceStr,
        signature,
        jsApiList = []
    }: configTyeps) {
        return new Promise((resolve) => {
            if (!(window as any).wx) throw 'this is not wx webview';
            isReady = false;

            (window as any).wx.config({
                debug,
                appId,
                timestamp,
                nonceStr,
                signature,
                jsApiList: ['hideAllNonBaseMenuItem', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone', ...jsApiList]
            });

            (window as any).wx.ready(() => {
                isReady = true;
                resolve();
            });
        });
    },
    initShare(config: { [key: string]: string }) {
        if (!isReady) throw 'wx is not ready';
        if (!config) return;

        (window as any).wx.onMenuShareTimeline(config);
        (window as any).wx.onMenuShareAppMessage(config);
        (window as any).wx.onMenuShareQQ(config);
        (window as any).wx.onMenuShareQZone(config);
    },
    hideMenuItems() {
        if (!isReady) throw 'wx is not ready';
        (window as any).wx.hideAllNonBaseMenuItem();
    }
}