import * as React from 'react'
import { configure, shallow, ShallowWrapper } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import { shallowToJson } from 'enzyme-to-json'

import AnimateToggle, { Props, State } from './'

describe('AnimateToggle', () => {

  configure({ adapter: new Adapter() })
  let reactOutput: ShallowWrapper

  const mountWith = (isOpen: boolean) => {
    return shallow<Props, State>(
      <AnimateToggle open={isOpen} duration={300}>
        <div>Hello</div>
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
    expect(shallowToJson(reactOutput)).toMatchSnapshot()
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

    expect(clearTimeout).toBeCalled()
    jest.runAllTimers()
    expect(setTimeout).toBeCalled()

    reactOutput.update()
    expect(reactOutput.find('section').props().style).toEqual({
      height: 'auto',
      transition: '',
      overflow: 'hidden'
    })
  })

  it('should do nothing if duration changed while openeing', () => {
    jest.useFakeTimers()
    reactOutput = mountWith(false)
    reactOutput.setProps({ duration: 1000 })

    jest.runAllTimers()
    reactOutput.update()
    expect(setTimeout).not.toHaveBeenCalled()
  })

  it('should do nothing if duration changed while closing', () => {
    reactOutput = mountWith(true)
    reactOutput.setProps({ duration: 1000 })

    reactOutput.update()
    expect(reactOutput.find('section').props().style).toEqual({
      height: 'auto',
      transition: '',
      overflow: 'hidden'
    })
  })

  it('should unmount', () => {
    jest.useFakeTimers()
    reactOutput = mountWith(true)

    reactOutput.unmount()
    expect(clearTimeout).toBeCalled()
  })
})
