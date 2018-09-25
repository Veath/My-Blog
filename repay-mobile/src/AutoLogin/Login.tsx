import React from 'react';
import { Redirect } from 'react-router-dom';
import weChatConfig from '../config/weChatConfig';
import getRequest from '../utils/getRequest';
import fetchApi from '../fetchApi';
import { Modal } from '../components';
import Storage from '../utils/Storage';
import StorageKey from '../config/StorageKey';
import { LoginStateTypes } from './types'

class Login extends React.Component<any, LoginStateTypes> {
    state = {
        // 是否重定向
        redirectToReferrer: false
    }
    // 重定向微信授权
    authRedirect() {
        window.location.replace(weChatConfig.getWeChatAuthUrl())
    }
    // 获取Code
    getAuthCode() {
        return getRequest().code;
    }
    // 获取用户信息
    getUserInfo(code: string) {
        return fetchApi.getUserInfo({
            code,
            signurl: encodeURIComponent(location.href),
            admin_dolojia_666: getRequest().admin_dolojia_666
        });
    }
    // 保存重定向信息
    setRedirectSession(data = '') {
        data && Storage.setSession(StorageKey.REDIRECT, data);
    }
    // 获取重定向信息，微信授权成功后使用
    getRedirectSession() {
        return Storage.getSession(StorageKey.REDIRECT);
    }
    componentDidMount() {
        const code = this.getAuthCode();
        if (!code) {
            this.authRedirect();
            return;
        }
        this.getUserInfo(code).then((res: any) => {
            Storage.setSession(StorageKey.USERINFO, res.customer);
            this.setState({
                redirectToReferrer: true
            });
        }).catch((e: any) => {
            Storage.setSession(StorageKey.USERINFO, {name: 'test'});
            this.setState({
                redirectToReferrer: true
            });
            Modal.alert('提示', e.returnMsg);
        });
    }
    render() {
        const { redirectToReferrer } = this.state;
        const { location: { state } } = this.props;
        this.setRedirectSession(state);
        const { from } = this.getRedirectSession();
        if (redirectToReferrer) {
            return <Redirect
                to={from}
            />
        }
        return <div>Login...</div>;
    }
};

export default Login;