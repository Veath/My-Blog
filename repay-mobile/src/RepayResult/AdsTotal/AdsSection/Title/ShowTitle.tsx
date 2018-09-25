/**
 * @fileOverview 广告控件标题显示
 */

import React from 'react';
import styled from 'styled-components';
import {px2rem as p2r} from '../../../../utils/styleRem/index';
import {ShowTitleProps} from "./types";


const TextWrapper = styled.span`
    font-size: ${p2r(14 * 2)};
    color: #00adb1;
    text-align: center;
    position: relative;
    margin: 15px 0;
    letter-spacing: 2px;
    &::before,
    &::after {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        height: 2px;
        width: 3em;
    }
    &::before {
        left: 15%;
        background: linear-gradient(90deg, rgba(0, 173, 177, 0), rgb(0, 173, 177));
    }
    &::after {
        right: 15%;
        background: linear-gradient(90deg, rgb(0, 173, 177), rgba(0, 173, 177, 0));
    }
`;

const IconWrapper = styled.img`
    width: ${p2r(16 * 2)};
    height: ${p2r(16 * 2)};
    vertical-align: sub;
    display: inline-block;
    margin-right: 3px;
`;


export default ({text, src}: ShowTitleProps) => (
    <div>
        {src && <IconWrapper src={src}/>}
        <TextWrapper>{text}</TextWrapper>
    </div>
)
