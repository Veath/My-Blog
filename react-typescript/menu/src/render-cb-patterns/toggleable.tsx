import React, { Component, MouseEvent, ComponentType, ReactNode } from 'react'

import { isFunction } from '../utils'

const initialState = { show: false }
const defaultProps: DefaultProps = { ...initialState, props: {} }

type State = Readonly<typeof initialState>
type RenderCallback = (args: ToggleableComponentProps) => JSX.Element
type DefaultProps<P extends object = object> = { props: P } & Pick<State, 'show'>

export type Props<P extends object = object> = Partial<
  {
    children: RenderCallback | ReactNode
    render: RenderCallback
    component: ComponentType<ToggleableComponentProps & P>
  } & DefaultProps<P>
>
export type ToggleableComponentProps = {
  show: State['show']
  toggle: Toggleable['toggle']
}

export class Toggleable<T extends object = object> extends Component<Props<T>, State> {
    static readonly defaultProps: Props = defaultProps
    readonly state: State = { show: this.props.show! }

    static getDerivedStateFromProps <T extends object = object>(nextProps: Props<T>, prevState: State) {
        if (nextProps.show !== prevState.show) {
            return {show: nextProps.show}
        }
    }
    render () {
        const { component: InjectedComponent, children, render, props } = this.props
        const renderProps = { show: this.state.show, toggle: this.toggle }
        const allProps = {...props, ...renderProps}
        if (InjectedComponent) {
          //  A type cast (props as P) is required here from TypeScript v3.2 onwards, due to a likely bug in TypeScript.
          // https://github.com/Microsoft/TypeScript/issues/28938#issuecomment-450636046
            return (
              <InjectedComponent {...allProps as T & ToggleableComponentProps}>
                {children}
              </InjectedComponent>
            )
        }

        if (render) {
            return render(renderProps)
        }

        return isFunction(children) ? children(renderProps) : new Error('asdsa()')
    }

    private toggle = (event: MouseEvent<HTMLElement>) => this.setState(updateShowState)
}

const updateShowState = (prevState: State) => ({show: !prevState.show})