import * as React from 'react'
import { configure, mount, ReactWrapper, MountRendererProps } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import { mountToJson } from 'enzyme-to-json'

import { Props, State } from './'
import AnimateToggle from './'

describe('AnimateToggle', () => {

  configure({ adapter: new Adapter() })
  let reactOutput: ReactWrapper

  const mountWith = (isOpen: boolean) => {
    return mount<Props, State>(
      <AnimateToggle open={isOpen} duration={300}>
        <div style={{height: '200px'}}>Hello</div>
      </AnimateToggle>
    )
  }

  beforeEach(() => {
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb())
  })

  afterEach(() => {
    reactOutput.unmount()
  })

  it('should match the snapshot', () => {
    reactOutput = mountWith(true)
    expect(mountToJson(reactOutput)).toMatchSnapshot()
  })

  it('should have a height of auto on rendering', () => {
    reactOutput = mountWith(true)
    expect(reactOutput.find('section').props().style).toEqual({
      height: 'auto',
      transition: '',
      overflow: 'hidden'
    })
  })

  it('should have a height of 0 on rendering', () => {
    reactOutput = mountWith(false)
    expect(reactOutput.find('section').props().style).toEqual({
      height: '0px',
      transition: '',
      overflow: 'hidden'
    })
  })

  it('should go from open to close', () => {
    reactOutput = mountWith(true)
    reactOutput.setProps({ open: false })
    reactOutput.update()

    expect(reactOutput.find('section').props().style).toEqual({
      height: '0px',
      transition: 'height 300ms ease-in-out',
      overflow: 'hidden'
    })
  })

  it('should go from close to open', () => {
    jest.useFakeTimers()

    reactOutput = mountWith(false)
    reactOutput.setProps({ open: true })
    reactOutput.update()

    jest.runAllTimers()
    expect(setTimeout).toHaveBeenCalledTimes(1)

    reactOutput.update()

    expect(reactOutput.find('section').props().style).toEqual({
      height: 'auto',
      transition: '',
      overflow: 'hidden'
    })

  })

})
