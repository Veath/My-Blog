import React from 'react';
import {ShowChannelProps} from "./types";
import ListStyle from '../ListStyle';
import {Arrow} from '../../../components'

export default ({channelName, changeChannel}: ShowChannelProps) => (
    <ListStyle>
        <span>支付方式</span>
        <div onClick={changeChannel}>{channelName} <Arrow/></div>
    </ListStyle>
)
