import React, { ComponentType, Component } from 'react'

// type ExternalProps = {}
type InternalState = { isLoading: boolean }
  
const withLoading = <OriginalProps extends object>(
    Cmp: ComponentType<OriginalProps>
) => {    
    class WithLoading extends Component<OriginalProps, InternalState> {
      static displayName = `WithLoadinng(${Cmp.displayName})`
      state = {
        isLoading: false,
      }
  
      render() {
        const { isLoading } = this.state
        const {} = this.props
        return isLoading ? <>Loading...</> : <Cmp {...this.props} />
      }
    }
  
    return WithLoading
}

class User extends Component<{ name: string; age: number }> {
    render() {
      const { age, name } = this.props
      return (
        <>
          - name: {name}
          - age: {age}
        </>
      )
    }
  }
  
const EnhancedUser = withLoading(User)
  
  
const App = () => (
<>
    <EnhancedUser name="sd" age={21} />
    <User name="Martin" age={31} />
</>
)