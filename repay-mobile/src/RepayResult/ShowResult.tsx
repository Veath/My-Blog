import React from 'react';
import styled from 'styled-components';
import Ads from './AdsTotal';
import Result from './ResultTotal';
import {ShowResultProps} from './types';

const ResultWrapper = styled.div`
    width: 100%;
`;

function showAds(ads: any) {
    return Array.isArray(ads) && ads.length > 0;
}

export default ({
                    hasDraw,
                    repayAmount,
                    repayResult,
                    serialNum,
                    ads
                }: ShowResultProps) => (
    <ResultWrapper>
        <Result
            hasDraw={hasDraw}
            repayAmount={repayAmount}
            repayResult={repayResult}
            serialNum={serialNum}
        />
        {showAds(ads) && <Ads ads={ads}/>}
    </ResultWrapper>
)
