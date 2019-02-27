import React, { ComponentType, SFC, MouseEvent, Component} from 'react'
import { render } from 'react-dom'

import { witchDefaultProps } from './utils'

// stateless component

const defaultProps = {
    color: 'red'
}

type DefaultProps = typeof defaultProps
type Props = { onClick(e: MouseEvent<HTMLElement>): void} & DefaultProps

const Button: SFC<Props> = ({onClick: handlerClick, color, children}) => (
    <button
        style={{color}}
        onClick={handlerClick}
    >
        {children}
    </button>
)

const ButtonWithDefaultProps = witchDefaultProps(defaultProps, Button)

const ButtonViaSfc = witchDefaultProps<Props>(
    defaultProps,
    ({onClick: handlerClick, color, children}) => (
        <button
            style={{color}}
            onClick={handlerClick}
        >
            {children}
        </button>
    )
)

const ButtonViaClass = witchDefaultProps(
    defaultProps,
    class Button extends Component<Props> {
        render () {
            const { onClick: handleClick, children, color } = this.props
            return (
                <button style={{ color }} onClick={handleClick}>
                  {children}
                </button>
            )
        }
    }
)

// statefull component
const initialState = {
    clicksCount: 0
}
type State = Readonly<typeof initialState>

class ButtonCounter extends Component<object, State> {
    readonly state: State = initialState

    private handleIncrement = () => this.setState(incrementClicksCount)
    private handleDecrement = () => this.setState(decrementClicksCount)

    render () {
        const { clicksCount } = this.state
        return (
            <>
                <ButtonWithDefaultProps onClick={this.handleIncrement}>Increment</ButtonWithDefaultProps>
                <ButtonWithDefaultProps onClick={this.handleDecrement}>Decrement</ButtonWithDefaultProps>
                You've clicked me {clicksCount} times!
            </>
        )
    }
}

const incrementClicksCount = (prevState: State) => ({
    clicksCount: prevState.clicksCount + 1,
})
const decrementClicksCount = (prevState: State) => ({
clicksCount: prevState.clicksCount - 1,
})

const App = () => {
    return (
      <>
        <ButtonCounter />
      </>
    )
}
const MOUNT_POINT = document.getElementById('app')
  
render(<App />, MOUNT_POINT)