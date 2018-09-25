import React, {Component} from 'react';
import ShowResult from './ShowResult'
import {ResultState} from './types';

export default class RepayResult extends Component<{}, ResultState>{
    constructor(props:any) {
        super(props);
        this.state = {
            hasDraw: false,
            repayAmount: 0,
            repayResult: false,
            serialNum: '',
            ads: [],
        };
    }

    componentDidMount() {
    }

    async getParamsFromUrl() {

    }

    getRepayResult() {
    }

    getAds() {
        //     getDecoration({
        //         channel: '1',
        //         type: '1', // 页面类型 1还款成功页，2 个人中心页
        //         openId: this.userInfo.openid,
        //         token: this.userInfo.token
        //     }).then(res => {
        //         if (res.status === 'success') {
        //             this.ads = res.data.normal || []
        //         }
        //     })
        // }
    }

    render() {
        const {
            repayAmount,
            hasDraw,
            ads,
            repayResult,
            serialNum,
        } = this.state;
        return (
            <ShowResult
                repayAmount={repayAmount}
                hasDraw={hasDraw}
                ads={ads}
                repayResult={repayResult}
                serialNum={serialNum}
            />
        )
    }
}
