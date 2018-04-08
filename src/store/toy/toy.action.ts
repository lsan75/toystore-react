import { Dispatch } from 'react-redux';
import axios, { AxiosResponse } from 'axios';

import { ToyAction } from './toy.reducer';
import { Toy } from '../../features/toy-list/toy';

export const TOYS = {
  GET_TOYS: 'TOYS_GET_TOYS',
  SELECT_TOY: 'TOYS_SELECT_TOY',
  UNSELECT_ALL: 'TOYS_UNSELECT_ALL'
};

export function getToysAction() {
  return (dispatch: Dispatch<ToyAction>, getState: Function) => {

    const store = getState();
    if (store.toyReducer.toyList.length) { return; }

    axios.get('/toys').then((value: AxiosResponse<Toy[]>) => {
      dispatch(loadToysAction(value.data));
    }).catch(err => window.console.log(err));
  };
}

export function loadToysAction(toyList: Toy[]) {
  return {
    type: TOYS.GET_TOYS,
    toyList
  };
}

export function selectToyAction(toy: Toy): ToyAction {
  return {
    type: TOYS.SELECT_TOY,
    toy
  };
}

export function unselectAllAction(): ToyAction {
  return {
    type: TOYS.UNSELECT_ALL
  };
}