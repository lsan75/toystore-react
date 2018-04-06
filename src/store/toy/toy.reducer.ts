import { Action } from 'redux';
import { Toy } from '../../features/toy-list/toy';
import { TOYS } from './toy.action';

export interface ToyReducerState {
  toys: Toy[];
}

export interface ToyAction extends Action {
  payload: Toy[] | Toy;
}

export function toyReducer(state: ToyReducerState, action: ToyAction) {
  switch (action.type) {
    case TOYS.GET_TOYS:
      return { ...state, toys: action.payload };

    case TOYS.SELECT_TOY:
      let newToys = JSON.parse(JSON.stringify(state.toys));

      newToys = newToys.map((toy: Toy) => {
        toy.selected = toy.title === action.payload.title;
        return toy;
      });

      return { ...state, newToys };

    default:
      return state;
  }
}
