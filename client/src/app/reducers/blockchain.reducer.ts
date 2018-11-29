import { Action } from '@ngrx/store';

export const ADD_COIN = 'ADD_COIN';

export function addCoinReducer(state: any[] = [], action) {
  switch (action.type) {
    case ADD_COIN:
        return action.payload;
    default:
        return state;
    }
}
