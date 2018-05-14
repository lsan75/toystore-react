import mockAxios from 'jest-mock-axios'
import { Toy } from '../../features/toy-list/toy'
import * as actions from './toy.action'

describe('ToysActions', () => {

  const toy: Toy = {
    title: 'toy',
    icon: 'ballon',
    price: 10
  }

  afterEach(() => mockAxios.reset())

  it('should get toys', () => {
    const dispatch = jest.fn()
    const getState = jest.fn().mockImplementation(() => { return { toyReducer: { toyList: [] } } })

    actions.getToysAction()(dispatch, getState)
    mockAxios.mockResponse({ data: [ toy ] })

    expect(dispatch).toBeCalledWith(actions.loadToysAction( [ toy ]))
  })

})
