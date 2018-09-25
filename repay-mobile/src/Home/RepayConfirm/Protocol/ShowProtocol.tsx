import React from 'react';
import styled from 'styled-components';
import {px2rem as p2r} from '../../../utils/styleRem/index';
import {ShowProtocolProps} from "./types";
import Checkbox from './Checkbox';

const ShowProtocolWrapper = styled.div`
    width: calc(100% - ${p2r((15+7) * 2)});
    margin-left: ${p2r(15 * 2)};
    margin-right: ${p2r(7 * 2)};
    margin-top: ${p2r(16 * 2)};
    font-size: ${p2r(11 * 2)};
    color: #4a4a4a;
`;

const LinkWrapper = styled.span`
    color: #00bbc0;
`;

export default ({checked, handleCheck, readProtocol}:ShowProtocolProps) => (
    <ShowProtocolWrapper>
        <Checkbox handleCheck={handleCheck} checked={checked}/>
        已阅读并同意&nbsp;
        <LinkWrapper onClick={readProtocol}>《约定仲裁协议》</LinkWrapper>
    </ShowProtocolWrapper>
)


