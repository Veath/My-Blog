import React from 'react';
import ShowChannel from './ShowChannel';
import {ChannelProps} from './types';


export default ({
                    list,
                    handleCheck,
                    backToConfirm,
                    showProtocol = true,
                    showRepayChannel,
}: ChannelProps) => (
    <ShowChannel
        list={list}
        handleCheck={handleCheck}
        backToConfirm={backToConfirm}
        showProtocol={showProtocol}
        showRepayChannel={showRepayChannel}
    />
)
