import React from 'react';
import styled from 'styled-components';
import {px2rem as p2r} from '../../../utils/styleRem/index';
import {HeaderProps} from './types';
const arrow = require('./images/arrow-right.png');

const HeaderWrapper = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    justify-content: center;
    align-items: center;
    height: ${p2r(50 * 2)};
    box-sizing: border-box;
    border-bottom: 0.5px solid #eee;
`;

const Arrow = styled.img`
    position: absolute;
    left: ${p2r(15 * 2)};
    transform: rotate(180deg);
    width: ${p2r(22 * 2)};
    height: ${p2r(22 * 2)};
`;

const TitleWrapper = styled.h3`
    font-size: ${p2r(18 * 2)};
    color: #333;
`;

export default ({backToConfirm}: HeaderProps) => (
    <HeaderWrapper>
        <Arrow src={arrow} onClick={backToConfirm} />
        <TitleWrapper>选择支付方式</TitleWrapper>
    </HeaderWrapper>
)
