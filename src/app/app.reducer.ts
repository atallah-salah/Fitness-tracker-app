import * as fromUi from './reducers/ui.reducer';
import * as fromAuth from './reducers/auth.reducer';

import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';


export interface State {
  ui: fromUi.State;
  auth:fromAuth.State;
}

export const reducers:ActionReducerMap<State> = {
  ui:fromUi.uiReducer,
  auth:fromAuth.authReducer
}

export const getUiState = createFeatureSelector<fromUi.State>('ui');
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);