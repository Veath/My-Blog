import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../Home';
import RepayResult from '../RepayResult';
import WechatInit from '../WeChatInit';
import CheckLogin, { Login } from '../AutoLogin';
import compose from '../utils/compose';

const WrappedHome = compose(CheckLogin, WechatInit)(Home);
const WrappedRepayResult = compose(CheckLogin, WechatInit)(RepayResult);

export default () => (
    <Switch>
        <Route exact path="/" component={WrappedHome} />
        <Route exact path="/repay-result" component={WrappedRepayResult} />
        <Route exact path="/login" component={Login} />
    </Switch>
);
