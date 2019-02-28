import React, { ComponentType, Component } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'

import { getHocComponentName } from '../utils'

import {
  Toggleable,
  Props as ToggleableProps,
  ToggleableComponentProps as InjectedProps,
} from './toggleable'

// OwnProps is for any public props that should be available on internal Component.props
// and for WrappedComponent
type OwnProps = Pick<ToggleableProps, 'show'>

export const withToogleable = <OriginalProps extends object = object>(
  UnwrappedComponent: ComponentType<InjectedProps & OriginalProps>,
) => {
  type Props = Omit<OriginalProps, keyof InjectedProps> & OwnProps
  class WithToggleable extends Component<Props> {
    static readonly displayName = getHocComponentName(
      WithToggleable.displayName,
      UnwrappedComponent
    )
    static readonly WrappedComponent = UnwrappedComponent
    render() {
      const { show, ...rest } = this.props

      //  A type cast (props as P) is required here from TypeScript v3.2 onwards, due to a likely bug in TypeScript.
      // https://github.com/Microsoft/TypeScript/issues/28938#issuecomment-450636046
      return (
        <Toggleable
          show={show}
          render={(renderProps) => <UnwrappedComponent {...renderProps as InjectedProps} {...rest as OriginalProps} />}
        />
      )
    }
  }

  return hoistNonReactStatics(WithToggleable, UnwrappedComponent as any) as ComponentType<Props>
}
