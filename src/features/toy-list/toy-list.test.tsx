import * as React from 'react'
import { configure, mount, ReactWrapper } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import { mountToJson } from 'enzyme-to-json'

import { ToyListComponent, Props, State } from './toy-list'
import { Toy } from './toy'

describe('ToyListComponent', () => {

  configure({ adapter: new Adapter() })
  let reactOutput: ReactWrapper
  let onSelect = jest.fn()
  let onUnselect = jest.fn()

  beforeEach(() => {
    const toyList: Toy[] = [
      {
        title: 'hop',
        icon: 'balloon',
        price: 10,
        selected: true
      }
    ]

    reactOutput = mount<Props, State>(
      <ToyListComponent
        toyList={toyList}
        select={onSelect}
        unselect={onUnselect}
      />
    )

  })

  afterEach(() => {
    reactOutput.unmount()
  })

  it('should render component', () => {
    expect(mountToJson(reactOutput)).toMatchSnapshot()
  })

  it('should toggle the list', () => {
    const h1 = reactOutput.find('h1')
    h1.simulate('click')

    expect(reactOutput.state('open')).toBe(false)
  })

  it('should unselect all', () => {
    const link = reactOutput.find('.ToyList__unselect')
    link.simulate('click')

    expect(onUnselect).toBeCalled()
  })

  it('should select a toy', () => {
    const toy = reactOutput.find('ToyComponent')
    toy.simulate('click')

    expect(onSelect).toBeCalledWith({
      title: 'hop',
      icon: 'balloon',
      price: 10,
      selected: true
    })
  })
})