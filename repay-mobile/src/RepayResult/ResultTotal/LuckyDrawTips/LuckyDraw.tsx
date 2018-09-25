/**
 * @fileOverview 抽奖信息提示
 */

import React from 'react';
import styled from 'styled-components';
import {px2rem as p2r} from '../../../utils/styleRem/index';
import {DrawTextProps, DrawProps} from "./types";


const DrawWrapper = styled.div`
    width: ${p2r(274 * 2)};
    color: #ff0129;
    font-size: ${p2r(14 * 2)};
    text-align: center;
`;

const DrawText = ({serialNum, day = 15}: DrawTextProps) => (<p>{`您的抽奖编号${serialNum}，有机会赢取幸运大奖，中奖结果在次月${day}号前公布，敬请期待。`}</p>);

export default ({serialNum}: DrawProps) => (
    <DrawWrapper>
        <DrawText serialNum={serialNum} />
    </DrawWrapper>
);
