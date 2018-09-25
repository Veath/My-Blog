import React from 'react';
import styled from 'styled-components';
import {px2rem as p2r} from '../../utils/styleRem/index';
import {ShowResultProps} from './types';

const ContentWrapper = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    width: 100%;
    background: #fff;
    padding-left: ${p2r(20 * 2)};
    padding-right: ${p2r(20 * 2)};
`;

export default ({componentsToShow = []} : ShowResultProps) => (
    <ContentWrapper>
        {Array.isArray(componentsToShow) &&
            componentsToShow.map(Item => (
                <Item.Component {...Item.props} />
            ))
        }
    </ContentWrapper>
)

