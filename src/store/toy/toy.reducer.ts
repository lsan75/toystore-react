import { Action } from 'redux';
import { Toy } from '../../features/toy-list/toy';
import { TOYS } from './toy.action';

export interface ToyReducerState {
  toys: Toy[];
  counter: number;
}

export interface ToyAction extends Action {
  toys?: Toy[];
  toy?: Toy;
}

export const defaultToyReducer: ToyReducerState = {
  toys: [],
  counter: 0
};

export function toyReducer(state: ToyReducerState = defaultToyReducer, action: ToyAction) {

  switch (action.type) {

    case TOYS.GET_TOYS:
      return { ...state, toys: action.toys };

    case TOYS.SELECT_TOY:
      const newState = Object.assign({}, state);

      newState.toys = newState.toys.map(toy => {
        if (toy.title === (action.toy ? action.toy.title : null)) {
          toy.selected = !toy.selected;
        }
        return toy;
      });

      const counter = newState.toys.filter(item => item.selected).length;

      return Object.assign({}, state, newState, { counter });

    default:
      return state;

  }
}
