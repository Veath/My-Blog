import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import refreshTitle from '../utils/refreshTitle';
import { AutoLoginTypes } from './types';
import Storage from '../utils/Storage';
import StorageKey from '../config/StorageKey';

function getUserInfoSession() {
    console.log('check logo');
    return Storage.getSession(StorageKey.USERINFO)
}

const ChcekLoginWrap = (WrappendComponent: any) => {
    return function ChcekLogin({ ...rest }) {
        return <Route {...rest}
            render={(props) =>
                getUserInfoSession()
                    ? <WrappendComponent {...props} />
                    : <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location },
                            search: props.location.search
                        }}
                    />
            }
        />;
    }
}

export default ChcekLoginWrap;