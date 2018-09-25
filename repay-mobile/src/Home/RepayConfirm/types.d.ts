export interface ShowConfirmProps {
    showModal: boolean,
    handleClose: () => void,
    needToPayAmounts: number | string,
    repayAmounts: number | string,
    discountAmounts: number | string,
    channelName:  string,
    protocolChecked: boolean,
    readProtocol: () => void,
    handleConfirm: () => void,
    handleCheck: () => void,
    disabled: boolean,
    showProtocol: boolean,
    showChannel: boolean,
    changeChannel: () => void,
    animateName: string,
}

/*
*  组件对外接口
* */
export interface ConfirmProps {
    showRepayConfirm: boolean, /*还款确认是否显示的状态*/
    closeRepayConfirm: () => void, /*关闭还款确认回调函数*/
    channelName: string, /*还款渠道名*/
    discountAmounts: number | string, /*红包金额*/
    handleConfirm: () => void, /*确认还款回调*/
    needToPayAmounts: number | string, /*需要支付的金额，大号数字*/
    readProtocol: () => void, /*阅读协议的回调*/
    repayAmounts: number | string, /*还款金额*/
    showProtocol: boolean, /*是否显示阅读协议提示*/
    showChannel: boolean, /*是否选择还款渠道*/
    changeChannel: () => void, /*更改渠道回调函数*/
    animateName?: string,
}

export interface ConfirmState {
    protocolChecked: boolean,
}
