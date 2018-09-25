import React from 'react';
import styled from 'styled-components';
import { Arrow } from '../components';
import { px2rem } from '../utils/styleRem';

interface Props {
    amount: number,
    visible?: boolean,
    click?: () => void
}

export default function RedPacketBar (props: Props) {
    return (
        <Container visible={props.visible} onClick={props.click}>
            <span>使用红包</span>
            <span>还款红包：{props.amount}元 <Arrow/></span>
        </Container>
    )
}

const Container = styled.div`
    position: fixed;
    bottom: ${px2rem(100)};
    left: 0;
    width: 100%;
    padding: ${px2rem(30)};
    display: ${(props: {visible?: boolean}) => props.visible ? 'flex' : 'none'};
    justify-content: space-between;
    background-color: #fff;
    font-size: ${px2rem(28)};
    color: #333333;
    border-bottom: 1px solid #EEEEEE;
`;
