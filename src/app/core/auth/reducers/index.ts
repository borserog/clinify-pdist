import {
  createFeatureSelector,
  createReducer, createSelector,
  on
} from '@ngrx/store';
import { authActions } from '../actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  username: string;
}

export const initialAuthState: AuthState = {
  username: undefined,
};

export const selectState = createFeatureSelector<AuthState>(authFeatureKey);

export const authReducer = createReducer(
  initialAuthState,
  on(authActions.loginAttempt, (state, action) => {
    return {
      username: action.username,
    };
  }),
  on(authActions.logout, (state, action) => {
    return {
      username: undefined
    };
  })
);


