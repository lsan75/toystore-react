import { ToyReducerState, defaultToyReducer } from './toy/toy.reducer';

export interface Store {
  toyReducer: ToyReducerState;
}

export const defaulStore: Store = {
  toyReducer: defaultToyReducer
};
