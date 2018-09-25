import React from 'react';
import styled from 'styled-components';
import {ShowConfirmProps} from './types';
import {Modal} from '../../components';
import Header from './Header';
import NeedToPay from './NeedToPay';
import Repay from './Repay';
import Discount from './Discount';
import Channel from './Channel';
import Protocol from './Protocol';
import Button from './Button';

const ContentWrapper = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    width: 100%;
    background: #fff;
`;

export default ({
                    showModal,
                    handleClose,
                    needToPayAmounts,
                    repayAmounts,
                    discountAmounts,
                    channelName,
                    protocolChecked,
                    readProtocol,
                    handleConfirm,
                    handleCheck,
                    disabled,
                    showProtocol,
                    showChannel,
                    changeChannel,
                    animateName,
                } : ShowConfirmProps) => (
    <Modal visible={showModal} animateName={animateName} popup >
        <ContentWrapper>
            <Header handleClick={handleClose} />
            <NeedToPay amounts={needToPayAmounts} />
            <Repay amounts={repayAmounts} />
            <Discount amounts={discountAmounts} />
            {showChannel &&
            <Channel
                channelName={channelName}
                changeChannel={changeChannel} />}
            {showProtocol &&
            <Protocol
                checked={protocolChecked}
                readProtocol={readProtocol}
                handleCheck={handleCheck}
            />}
            <Button handleClick={handleConfirm} disabled={disabled} />
        </ContentWrapper>
    </Modal>
)
