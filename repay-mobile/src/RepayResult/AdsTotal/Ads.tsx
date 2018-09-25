import React from 'react';
import AdsSection from './AdsSection';
import {AdsProps} from './type';

export default ({ads = []}: AdsProps) => (
    <div style={{width: '100%'}}>
        {Array.isArray(ads) && ads.map((d, i) => (
            <>
                <AdsSection adsItem={d} key={i}/>
            </>
        ))}
    </div>
)
