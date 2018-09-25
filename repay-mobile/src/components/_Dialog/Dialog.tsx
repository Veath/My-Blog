import React from 'react';
import Animate from 'rc-animate';
import { styleFade, styleScale, stylePopup, stylePopLeft } from './transitionAppear';
import styled, { css, InterpolationValue } from 'styled-components';
import { px2rem } from '../../utils/styleRem';
import { DialogPropTypes, CotainerDivPropTypes } from './types';
import { Mask } from '../';

const CotainerDiv: React.SFC<CotainerDivPropTypes> = (props) => (
    <div role='dialog' onClick={props.onMaskCick} className={props.className}>{props.children}</div>
);

class Dialog extends React.Component<DialogPropTypes, any> {
    static defaultProps = {
        visible: false,
        animateName: '',
        onClose: () => { },
    }

    componentWillMount() {
        document.body.style.overflow = 'hidden';
    }
    componentWillUnmount() {
        document.body.style.overflow = ''
    }
    getMaskElement = () => {
        const {visible} = this.props;
        return <Animate
            component=""
            showProp="isShow"
            transitionAppear
            transitionName='fade'
            onLeave={() => console.log('leave')}
        >
            <Mask isShow={visible} ></Mask>
        </Animate>
    }
    getDialogElement = () => {
        const props = this.props;
        let footer;
        let transitionName = props.animateName;
        if (props.footer) {
            footer = (
                <div role='footer' className='dialog-footer'>
                    {props.footer}
                </div>
            );
        }
        let header;
        if (props.title) {
            header = (
                <div role='header' className='dialog-header'>
                    <Title>
                        {props.title}
                    </Title>
                </div>
            );
        }
        if (props.popup && !props.animateName) {
            transitionName = 'popup'
        } else if (!props.animateName) {
            transitionName = 'scale'
        }
        const dialogElement = (
            <Content visible={props.visible} popup={props.popup} dafyStyle={props.dafyStyle}>
                {header}
                <Body className='dialog-content' popup={props.popup}>
                    {props.children}
                </Body>
                {footer}
            </Content>
        );
        return (
            <Animate
                component=""
                showProp="visible"
                transitionAppear
                transitionName={transitionName}
                onLeave={this.onLeave}
            >
                {dialogElement}
            </Animate>
        );
    }
    onLeave = (key: any) => {
        if (this.props.onAnimateLeave) {
            this.props.onAnimateLeave();
        }
        if (this.props.afterClose) {
            this.props.afterClose();
        }
    }
    close = (e: React.MouseEvent<HTMLDivElement>) => {
        if (this.props.onClose) {
            this.props.onClose(e);
        }
    }
    onMaskCick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            this.close(e);
        }
    }
    render() {
        const { props } = this;
        return (
            <div role='dialog-wrap'>
                {this.getMaskElement()}
                <DialogContainer
                    onMaskCick={this.onMaskCick}
                    animateCss={props.animateCss}
                    {...props.wrapProps}
                >
                    {this.getDialogElement()}
                </DialogContainer>
            </div>
        );
    }
};

export default Dialog;



const DialogContainer = styled(CotainerDiv)`
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateZ(1px);
    ${styleFade}
    ${styleScale}
    ${stylePopup}
    ${stylePopLeft}
    ${({ animateCss }: { animateCss?: InterpolationValue[] }) => `${animateCss}`}
   
`;

const Title = styled.div`
    font-size: ${px2rem(34)};
    color: #333;
    font-weight: bold;
    text-align: center;
    padding: ${px2rem(12)} ${px2rem(15)} ${px2rem(25)} ${px2rem(15)};
`;

const Content = styled.div`
    width: ${px2rem(540)};
    border-radius: ${({ dafyStyle }: { dafyStyle?: boolean }) => dafyStyle && px2rem(14)};
    padding-top: ${({ dafyStyle }: { dafyStyle?: boolean }) => dafyStyle && px2rem(30)};
    background-color: white;
    ${({ popup, visible }: { visible?: boolean, popup?: boolean, dafyStyle?: boolean }) => {
        return popup && css`
            position: fixed;
            left: 0;
            bottom: 0;
            z-index: 999;
            width: 100%;
            background-color: white;
        `
    }};
`;

const Body = styled.div`
    font-size: 26px;
    color: #666666;
    line-height: 1.5;
    overflow: auto;
    ${({ popup }: { popup: boolean | undefined }) => !popup && css`
        padding: 0 ${px2rem(30)} ${px2rem(30)}`
    };
`;