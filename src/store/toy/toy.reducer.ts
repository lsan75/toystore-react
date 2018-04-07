import { Action } from 'redux';
import { Toy } from '../../features/toy-list/toy';
import { TOYS } from './toy.action';

export interface ToyReducerState {
  toyList: Toy[];
  counter: number;
}

export interface ToyAction extends Action {
  toyList?: Toy[];
  toy?: Toy;
}

export const defaultToyReducer: ToyReducerState = {
  toyList: [],
  counter: 0
};

export function toyReducer(state: ToyReducerState = defaultToyReducer, action: ToyAction) {

  switch (action.type) {

    case TOYS.GET_TOYS:
      return { ...state, toyList: action.toyList };

    case TOYS.SELECT_TOY:
      const newState = Object.assign({}, state);

      newState.toyList = newState.toyList.map(toy => {
        if (toy.title === (action.toy ? action.toy.title : null)) {
          toy.selected = !toy.selected;
        }
        return toy;
      });

      const counter = newState.toyList.filter(item => item.selected).length;

      return Object.assign({}, state, newState, { counter });

    default:
      return state;

  }
}
