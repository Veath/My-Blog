/**
 * @fileOverview 广告图片显示
 */

import React from 'react';
import styled from 'styled-components';
import {px2rem as p2r} from '../../../../utils/styleRem/index';
import {ShowImageProps} from "./types";

const ImageWrapper = styled.img`
    width: 100%;
    margin-bottom: .5em;
  
`;

export default ({src, jumpParam}: ShowImageProps) => (
    <ImageWrapper src={src} onClick={() => window.location.href = jumpParam}/>
)
