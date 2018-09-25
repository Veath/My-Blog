import React from 'react';
import styled from 'styled-components';
import { Dialog } from '../';
import { px2rem } from '../../utils/styleRem';
import { Footer, ModalPropsType, BtnWrapProps, CallbackOrActions } from './types'
abstract class ModalComponent<P, S> extends React.Component<P, S> {
    static alert: (
        title?: React.ReactNode,
        messages?: React.ReactNode,
        footers?: Footer[]
    ) => { close: () => void };

    static prompt: (
        title: React.ReactNode,
        message: React.ReactNode,
        callbackOrActions: CallbackOrActions,
        type?: 'default' | 'secure-text',
        defaultValue?: string,
        placeholders?: string[],
    ) => {close: () => void}
}
/**
 * @example <Modal
                popup
                visible={props.visible}
                onClose={props.close}
            >
                Hello word
            </Modal>
 */

class Modal extends ModalComponent<ModalPropsType, any> {
    static defaultProps = {
        footer: [],
        popup: false
    }
    renderFooterButton(button: Footer, i: number) {
        const onClickFn = (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            if (button.onPress) {
                button.onPress();
            }
        }
        return (
            <Btn role='button' onClick={onClickFn} key={i}>{button.text || '确定'}</Btn>
        )
    }
    render() {
        const { footer = [], ...restProps } = this.props;
        const footerDom = footer.length ? (
            <BtnWarp hasLeftBorder={footer.length > 1}>
                {footer.map((button, index) => this.renderFooterButton(button, index))}
            </BtnWarp>
        ) : null;
        return (
            <Dialog
                {...restProps}
                footer={footerDom}
            />
        );
    }
};

export default Modal;

const BtnWarp = styled.div`
    display: flex;
    border-top: 1px solid #ddd;
    a {
        &:last-child {
            border-left: ${({ hasLeftBorder }: BtnWrapProps) => hasLeftBorder ? '1px solid #ddd' : 'none'}
        }
    }
`;

const Btn = styled.a`
    height: ${px2rem(88)};
    line-height: ${px2rem(88)};
    font-size: ${px2rem(34)};
    color: #00BBC0;
    flex: 1;
    box-sizing: border-box;
    text-align: center;
`;