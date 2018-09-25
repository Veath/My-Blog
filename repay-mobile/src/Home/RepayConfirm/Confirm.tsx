import React, {Component} from 'react';
import ShowConfirm from './ShowConfirm';
import {ConfirmProps, ConfirmState} from './types';

export default class Confirm extends Component<ConfirmProps,ConfirmState>{
    constructor(props: any) {
        super(props);
        this.state = {
            protocolChecked: true,
        };
        this.handleCheck = this.handleCheck.bind(this);
    }

    handleCheck() {
        const {protocolChecked} = this.state;
        this.setState({protocolChecked: !protocolChecked})
    }

    get disabled() {
        return !this.state.protocolChecked && this.props.showProtocol
    }


    render() {
        const {
            protocolChecked
        } = this.state;
        const {
            showRepayConfirm,
            closeRepayConfirm,
            channelName,
            discountAmounts,
            handleConfirm,
            needToPayAmounts,
            readProtocol,
            repayAmounts,
            showProtocol,
            showChannel,
            changeChannel,
            animateName = 'popup',
        } = this.props;
        return (
            <ShowConfirm
                showModal={showRepayConfirm}
                handleClose={closeRepayConfirm}
                channelName={channelName}
                discountAmounts={discountAmounts}
                handleConfirm={handleConfirm}
                needToPayAmounts={needToPayAmounts}
                protocolChecked={protocolChecked}
                readProtocol={readProtocol}
                repayAmounts={repayAmounts}
                handleCheck={this.handleCheck}
                disabled={this.disabled}
                showChannel={showChannel}
                showProtocol={showProtocol}
                changeChannel={changeChannel}
                animateName={animateName}
            />
        )
    }
}
