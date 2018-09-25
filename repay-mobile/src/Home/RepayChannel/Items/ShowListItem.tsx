import React from 'react';
import styled from 'styled-components';
import {px2rem as p2r} from '../../../utils/styleRem/index';
import {Radio} from "../../../components";
import {ShowListItemProps} from './types';


const ItemWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(100% - ${p2r(15 * 2)});
    box-sizing: border-box;
    height: ${p2r(45 * 2)};
    margin-left: ${p2r(15 * 2)};
    padding-right: ${p2r(15 * 2)};
    border-bottom: 1px solid #eee;
    color: #666;
    font-size: ${p2r(14 * 2)};
`;

const ChannelIconWrapper = styled.img`
    width: ${p2r(22 * 2)};
    height: ${p2r(22 * 2)};
    vertical-align: sub;
    margin-right: ${p2r(10 * 2)};
`;

export default ({icon, value, checked, handleCheck, index}: ShowListItemProps) => (
    <ItemWrapper>
        <div>
            <ChannelIconWrapper src={icon} alt={''}/>
            {value}
        </div>
        <Radio checked={checked} onClick={()=>handleCheck(index)}/>
    </ItemWrapper>
)
