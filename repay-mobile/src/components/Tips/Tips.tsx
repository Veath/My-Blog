import React from 'react';
import { styleTypes, TipsProps, ImgTypes } from './types';
import styled from 'styled-components';
import { px2rem } from '../../utils/styleRem';


const Img: React.SFC<ImgTypes> = ({ src, className }) => (<img className={className} src={src}></img>)

const Tips: React.SFC<TipsProps> = (props: TipsProps) => {
    const { padding, bgColor, fontSize, fontColor, iconImg, children } = props;
    return (
        <TipsContainer {...{ padding, bgColor, fontSize, fontColor }}>
            {!!iconImg && <ImgStyled src={iconImg}></ImgStyled>}
            <Text>{children}</Text>
        </TipsContainer>
    );
}

export default Tips;

const TipsContainer = styled<styleTypes, 'div'>('div')`
    display:flex;
    padding: ${({ padding = `${px2rem(20)} ${px2rem(30)}` }) => padding};
    font-size: ${({ fontSize = px2rem(24) }) => fontSize};
    background-color: ${({ bgColor = '#FFF7E7' }) => bgColor};
    color: ${({ color = '#FFB173' }) => color};
`;

const ImgStyled = styled(Img)`
    flex-shrink:0;
    width: ${px2rem(30)};
    height: ${px2rem(30)};
    margin-right: ${px2rem(12)};
`;

const Text = styled.div`
    display:inline-flex;
    line-height: 1.2;
`;
