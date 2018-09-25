import React from 'react';
import Storage from '../utils/Storage';
import StorageKey from '../config/StorageKey';
import wxJS from '../utils/weixin';
import fetchApi from '../fetchApi';

interface configTyeps {
    debug: boolean,
    appId: string,
    timestamp: string,
    nonceStr: string,
    signature: string,
    jsApiList?: string[]
}

const WeChatInit = (WrappedComponent: any) => {
    return (class extends React.Component {
        getWxConfSession() {
            const { location: { pathname } }: any = this.props;
            return Storage.getSession(StorageKey.WXCONFIG + pathname);
        }
        setWxConfSession(conf: configTyeps) {
            const { location: { pathname } }: any = this.props;
            Storage.setSession(StorageKey.WXCONFIG + pathname, conf);
        }
        render() {
            let wxConf = this.getWxConfSession();
            if (wxConf) {
                wxJS.init(wxConf).then(wxJS.hideMenuItems);
            } else {
                fetchApi.getWXSignature().then((res: configTyeps) => {
                    this.setWxConfSession(res);
                    wxJS.init(res).then(wxJS.hideMenuItems);
                });
            }
            console.log('init weChat Js');
            return <WrappedComponent {...this.props} />
        }
    })
}
export default WeChatInit;