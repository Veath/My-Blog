import {InterpolationValue} from 'styled-components';
export interface ModalPropsType {
    // 标题
    title?: React.ReactNode;
    // 显示/隐藏
    visible: boolean;
    // 底部内容
    footer?: Footer[];
    // 是否为上拉弹窗
    popup?: boolean;
    // wrap容器属性
    wrapProps?: Partial<React.HTMLProps<HTMLDivElement>>;
    /**
     * modal 动画名
     * 自带：scale | popup | fade | popleft
     */
    animateName?: string;
    // modal 动画名对应的css
    animateCss?: InterpolationValue[];
    // 是否使用默认样式
    dafyStyle?: boolean;
    // 点击mask回调
    onClose?: () => void;
    // 关闭后回调
    afterClose?: () => void;
}

export interface Footer {
    text: string;
    onPress?: (value?: string) => void | Promise<any>;
}

export interface BtnWrapProps {
    hasLeftBorder: boolean
}

export type Callback = (valueOrLogin: string, password?: string) => void;
export type CallbackOrActions = Callback | Footer[]
