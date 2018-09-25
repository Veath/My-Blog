import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Modal from './Modal';
import { CallbackOrActions } from './types'
import { px2rem } from '../../utils/styleRem';
import closest from '../../utils/closest'

/**
 * @example Modal.prompt('请输入您要还款的金额', '',
                [
                    {
                        text: '取消',
                        onPress: value => console.log(value)
                    },
                    {
                        text: '确认',
                        onPress: value => console.log(value)
                    },
                ], 'default', '', ['输入还款金额'])
 */

export default function prompt(
    title: React.ReactNode,
    message: React.ReactNode,
    callbackOrActions: CallbackOrActions,
    type = 'default',
    defaultValue = '',
    placeholders = ['', ''],
) {
    let closed = false;

    if (!callbackOrActions) {
        return {
            close: () => { }
        }
    }

    const data: { [key: string]: string } = {
        text: defaultValue,
    };

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const target = e.target;
        const inputType = target.getAttribute('type');
        if (inputType !== null) {
            data[inputType] = target.value;
        }
    }

    function onClick(e: React.MouseEvent<HTMLInputElement>) {
        const target = e.currentTarget || e.target;
        if (target) {
            target.focus();
        }
    }

    const focusFn = (input: HTMLInputElement | null) => {
        setTimeout(() => {
            if (input) {
                input.focus();
            }
        }, 300)
    };

    let inputDom;
    switch (type) {
        case 'default':
        default:
            inputDom = (
                <InputContainer role='input-container'>
                    <label>
                        <Input
                            type='text'
                            defaultValue={data.text}
                            innerRef={(input: HTMLInputElement | null) => focusFn(input)}
                            onClick={onClick}
                            onChange={onChange}
                            placeholder={placeholders[0]}
                        ></Input>
                    </label>
                </InputContainer>
            );
    }

    const content = (
        <div>
            {message}
            {inputDom}
        </div>
    );

    const div = document.createElement('div');
    document.body.appendChild(div);

    function close() {
        ReactDOM.unmountComponentAtNode(div);
        if (div && div.parentNode) {
            div.parentNode.removeChild(div);
        }
    }

    function handleConfirm(callback?: (...args: any[]) => void) {
        if (typeof callback !== 'function') {
            return;
        }
        const { text = '', password = '' } = data;
        const callbackArgs =
            type === 'login-password'
                ? [text, password]
                : type === 'secure-text' ? [password] : [text];

        return callback(...callbackArgs);
    }

    let footers;
    if (typeof callbackOrActions === 'function') {
        footers = [
            {
                text: '取消',
                onPress: () => { },
            },
            {
                text: '确认',
                onPress: () => {
                    handleConfirm(callbackOrActions)
                }
            }
        ]
    } else {
        footers = callbackOrActions.map(item => {
            return {
                text: item.text,
                onPress: () => {
                    return handleConfirm(item.onPress)
                }
            }
        });
    }

    const footer = footers.map((button) => {
        const orginPress = button.onPress || function () { };
        button.onPress = () => {
            if (closed) {
                return;
            }

            const res: any = orginPress();
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
        const pNode = closest(e.target as Element, `.dialog-content`);
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
            wrapProps={{onTouchStart: onWrapTouchStart}}
        >
            <PropmtContent role='propmt-content'>{content}</PropmtContent>
        </Modal>,
        div
    )

    return {
        close,
    };
};

const InputContainer = styled.div`
    height: ${px2rem(48)};
    margin-top: ${px2rem(18)};
    border: 1PX solid #ddd;
    border-radius: ${px2rem(6)};
    background-color: #F5F5F5;
    line-height: 1;
`
const Input = styled.input`
    position: relative;
    top: 1px;
    box-sizing: border-box;
    width: 98%;
    height: ${px2rem(48)};
    margin: 0;
    border: 0;
    outline: none;
    font-size: 100%;
    padding: 0 ${px2rem(10)};

    ::-webkit-input-placeholder {
        font-size: ${px2rem(28)};
        color: #D8D8D8;
        padding-left: ${px2rem(16)};
    }
`;

const PropmtContent = styled.div`
    overflow: hidden;
`;
