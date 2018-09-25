import {Item} from '../types'

export interface ShowListItemProps {
    checked: boolean,
    icon: string,
    value: string,
    key: string,
    index: string,
    handleCheck: (index: string) => void,
}

export interface ListProps {
    list: Item[],
    handleCheck: (index: string) => void,
}
