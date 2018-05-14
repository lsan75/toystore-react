import { toyReducer, defaultToyReducer } from './toy.reducer'
import { Toy } from '../../features/toy-list/toy'
import { TOYS } from './toy.action'

describe('toyReducer', () => {

  const toy: Toy = {
    title: 'toy',
    icon: 'ballon',
    price: 10
  }

  it('should get toys', () => {
    const result = toyReducer(defaultToyReducer, {
      type: TOYS.GET_TOYS,
      toyList: [ toy ]
    })

    expect(result).toEqual({
      toyList: [ toy ],
      counter: 0
    })
  })

  it('should get select a toy', () => {
    const oldToy = Object.assign({}, defaultToyReducer, { toyList: [ toy ]})
    const result = toyReducer(oldToy, {
      type: TOYS.SELECT_TOY,
      toy
    })

    expect(result).toEqual({
      toyList: [ Object.assign({}, toy, { selected: true }) ],
      counter: 1
    })
  })

  it('should unselect all', () => {
    const oldToy = {
      toyList: [ Object.assign({}, toy, { selected: true }) ],
      counter: 1
    }
    const result = toyReducer(oldToy, {
      type: TOYS.UNSELECT_ALL
    })

    expect(result).toEqual({
      toyList: [ Object.assign({}, toy, { selected: false }) ],
      counter: 0
    })
  })

  it('should do nothing', () => {
    const result = toyReducer(defaultToyReducer, {
      type: 'toto'
    })

    expect(result).toEqual(defaultToyReducer)
  })
})
