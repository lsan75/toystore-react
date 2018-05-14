module.exports = {

  getToysAction: jest.fn(() => { return { type: '' } }),

  loadToysAction: jest.fn((toyList) => {
    return {
      type: '',
      toyList
    }
  }),

  selectToyAction: jest.fn((toy) => {
    return {
      type: '',
      toy
    }
  }),

  unselectAllAction: jest.fn(() => {
    return {
      type: ''
    }
  })

}