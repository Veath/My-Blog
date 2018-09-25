/**
 * @fileOverview 单个广告分组显示
 */

import React, {Component} from 'react';
import styled from 'styled-components';
import Title from './Title';
import Image from './Images';
import {AdsSectionProps} from './types';

const AdsSectionWrapper = styled.section`
    width: 100%;
    padding: 0 15px;
`;

export default class AdsSection extends Component<AdsSectionProps, {}> {
    get showTitle() {
        const {adsItem} = this.props;
        return (adsItem.typeValue === 'CDT00009' || adsItem.typeValue === 'CDT00010');
    }

    get showImage() {
        const {adsItem} = this.props;
        return adsItem.typeValue === 'CDT00031';
    }

    render() {
        const {adsItem} = this.props;
        return (
            <AdsSectionWrapper>
                {this.showTitle && <Title adsItem={adsItem} />}
                {this.showImage && <Image adsItem={adsItem} />}
            </AdsSectionWrapper>
        )
    }
}
