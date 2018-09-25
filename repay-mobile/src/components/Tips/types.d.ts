export interface styleTypes {
    padding?: string,
    bgColor?: string,
    fontSize?: string,
    fontColor?: string,
    color?: string
}

export interface ImgTypes {
    className?: string,
    src?: string
}

export interface TipsProps extends styleTypes {
    iconImg?: string,
    children: string
}

