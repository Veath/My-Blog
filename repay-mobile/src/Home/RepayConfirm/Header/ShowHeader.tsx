import React from 'react';
import styled from 'styled-components';
import {px2rem as p2r} from '../../../utils/styleRem/index';
import {HeaderProps} from './types';

const closeUrl = require('./images/btn_close@2x.png');

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

const CloseWrapper = styled.img`
    position: absolute;
    left: ${p2r(15 * 2)};
    height: ${p2r(22 * 2)};
    width: ${p2r(22 * 2)};
    vertical-align: sub;
`;

const TitleWrapper = styled.h3`
    font-size: ${p2r(18 * 2)};
    color: #333;
`;

export default ({handleClick}: HeaderProps) => (
    <HeaderWrapper>
        <CloseWrapper onClick={handleClick} src={closeUrl}/>
        <TitleWrapper>还款确认</TitleWrapper>
    </HeaderWrapper>
)
