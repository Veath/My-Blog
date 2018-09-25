/**
 * @fileOverview 还款状态显示
 */

import React from 'react';
import styled from 'styled-components';
import {px2rem as p2r} from '../../../utils/styleRem/index';
import {ShowIconTextProps} from "./types";


const StatusWrapper = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    width: 100%;
    margin-top: ${p2r(40 * 2)};
    margin-bottom: ${p2r(15 * 2)};
`;

const IconWrapper = styled.img`
    width: ${p2r(66 * 2)};
    height: ${p2r(66 * 2)};
    margin-bottom: ${p2r(20 * 2)};
`;

const TextWrapper = styled.strong`
    font-size: ${p2r(21 * 2)};
    color: #333;
`;

export default ({src, text}: ShowIconTextProps) => (
    <StatusWrapper>
        <IconWrapper src={src}/>
        <TextWrapper>{text}</TextWrapper>
    </StatusWrapper>
);
