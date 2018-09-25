import React from 'react';
import styled from 'styled-components';
import {Modal} from '../../components';
import {px2rem as p2r} from '../../utils/styleRem/index';
import Header from './Header';
import Items from './Items';
import {ShowChannelProps} from './types';

const ShowChannelWrapper = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    width: 100%;
    height: ${({showProtocol = true}: any) => showProtocol ? p2r(430 * 2) : p2r(400 * 2)};
    background: #fff;
`;

export default ({
                    showProtocol,
                    backToConfirm,
                    handleCheck,
                    list,
                    showRepayChannel,
}: ShowChannelProps) => (
    <Modal
        visible={showRepayChannel}
        animateName={'popleft'}
        popup
    >
        <ShowChannelWrapper>
            <Header backToConfirm={backToConfirm}/>
            <Items handleCheck={handleCheck} list={list}/>
        </ShowChannelWrapper>
    </Modal>
)

