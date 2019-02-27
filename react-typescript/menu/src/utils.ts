import { Children, ReactNode, ComponentType } from 'react'

export const isEmptyChildren = (children: ReactNode) => Children.count(children) === 0
export const isFunction = <T extends Function>(value: any): value is T => typeof value === 'function'
export const getComponentName = (component: ComponentType<any>) => component.displayName || (component as any).name
export const getHocComponentName = (hocName: string, component: ComponentType<any>) =>
    `${hocName}(${getComponentName(component)})`

export const witchDefaultProps = <P extends object, DP extends Partial<P> = Partial<P>>(
    defaultProps: DP,
    Cmp: ComponentType<P>
) => {
    type RequiredProps = Omit<P, keyof DP>
    type Props = Partial<DP> & Required<RequiredProps>

    Cmp.defaultProps = defaultProps

    return (Cmp as any) as ComponentType<Props>
}
