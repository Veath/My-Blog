export interface ShowChannelProps {
    showProtocol?: boolean,
    backToConfirm: () => void,
    handleCheck: (index: string) => void,
    list: Item[],
    showRepayChannel: boolean,
}

export interface ChannelProps {
    list: Item[],
    handleCheck: (index: string) => void,
    backToConfirm: () => void,
    showProtocol?: boolean,
    showRepayChannel: boolean,
}

export interface Item {
    checked: boolean,
    key: string,
    value: string,
    icon: string,
}
