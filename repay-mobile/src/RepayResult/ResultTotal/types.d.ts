export interface ShowResultProps {
    componentsToShow: componentsObject[];
}

interface componentsObject {
    Component: any,
    props: any,
}

export interface ResultTotalProps {
    hasDraw: boolean,
    repayAmount: number | string,
    repayResult: boolean,
    serialNum: number | string,
}
