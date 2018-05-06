import * as React from 'react'
import { configure, shallow, mount, ShallowRendererProps, ShallowWrapper, ReactWrapper } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import { shallowToJson, mountToJson } from 'enzyme-to-json'

import { AuthComponent, Props, UserState } from './auth.component'

configure({ adapter: new Adapter() })

describe('AuthComponent', () => {

  let reactOutput: ReactWrapper<Props, UserState>

  const submitForm = jest.fn()

  beforeEach(() => {
    reactOutput = mount<Props, UserState>(

      <AuthComponent
        isOpened={true}
        isError={false}
        submit={submitForm}
      />

    )
  })

  it('renders without crashing', () => {
    const innerProps: Props = reactOutput.props()

    expect(mountToJson(reactOutput)).toMatchSnapshot()
    expect(innerProps.isOpened).toBe(true)
    expect(innerProps.isError).toBe(false)

    const wrapper = reactOutput.find('.AuthComponent')
    expect(wrapper.hasClass('opened')).toBe(true)
  })

  it('should submit the form', () => {
    const button = reactOutput.find('.AuthButton')

    const user = reactOutput.find('.AuthInput[type="email"]')
    const pass = reactOutput.find('.AuthInput[type="password"]')

    user.simulate('change', { target: { value: 'toto', id: 'user' }})
    pass.simulate('change', { target: { value: 'hophop', id: 'pass' }})
    pass.simulate('change', { target: { value: 'ignored', id: 'other' }})

    button.simulate('submit')

    expect(submitForm).toBeCalledWith({
      user: 'toto',
      pass: 'hophop'
    })
  })

  it('should be close', () => {
    reactOutput.setProps({ isOpened: false })

    const wrapper = reactOutput.find('.AuthComponent')
    expect(wrapper.hasClass('opened')).toBe(false)
  })
})
