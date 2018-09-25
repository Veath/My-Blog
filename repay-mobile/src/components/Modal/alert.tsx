import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Modal from './Modal';
import { Footer } from './types'
import { px2rem } from '../../utils/styleRem';
import closest from '../../utils/closest'

/**
 * @example Modal.alert('提示', '该合同正在配账中，避免重复还款，请5-10分钟后再试')
 * @example Modal.alert('还款确认', Test, [
 *                 { text: '取消', onPress: () => console.log('cancel')},
 *                { text: '确认', onPress: () => console.log('ok') },
 *           ])
 */

export default function alert(
    title: React.ReactNode,
    message: React.ReactNode,
    footers = [{ text: '确认' }],
) {
    let closed = false;
    if (!title && !message) {
        return {
            close: () => { }
        }
    }
    const div: any = document.createElement('div');
    document.body.appendChild(div);

    function close() {
        ReactDOM.unmountComponentAtNode(div);
        if (div && div.parentNode) {
            div.parentNode.removeChild(div);
        }
    }

    const footer = footers.map((button: Footer) => {
        const orginPress = button.onPress || function () { };
        button.onPress = () => {
            if (closed) {
                return;
            }

            const res = orginPress();
            if (res && res.then) {
                res
                    .then(() => {
                        closed = true;
                        close();
                    })
                    .catch(() => { });
            } else {
                closed = true;
                close();
            }
        };
        return button;
    });

    function onWrapTouchStart(e: React.TouchEvent<HTMLDivElement>) {
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target as Element, `.dialog-footer`);
        if (!pNode) {
            e.preventDefault();
        }
    }

    ReactDOM.render(
        <Modal
            dafyStyle
            visible
            title={title}
            footer={footer}
            wrapProps={{ onTouchStart: onWrapTouchStart }}
        >
            <AlterContent role='alert-content'>{message}</AlterContent>
        </Modal>,
        div
    )

    return {
        close,
    };
}

const AlterContent = styled.div`
    text-align: center;
    color: #666666;
    font-size: ${px2rem(26)};
`;