import { Dispatch } from 'react-redux';
import axios, { AxiosResponse } from 'axios';

import { ToyAction } from './toy.reducer';
import { Toy } from '../../features/toy-list/toy';

axios.defaults.baseURL = 'http://localhost:3000/';

export const TOYS = {
  GET_TOYS: 'TOYS_GET_TOYS',
  SELECT_TOY: 'TOYS_SELECT_TOY'
};

export function getToysAction() {
  return (dispatch: Dispatch<ToyAction>) => {
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