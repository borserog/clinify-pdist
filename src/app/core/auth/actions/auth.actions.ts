import { createAction, props } from '@ngrx/store';
import { UserLogin } from 'src/app/login/login.component';

export const loginAttempt = createAction(
  '[Login Page] User login attempt',
  props<UserLogin>()
);

export const loginSuccessful = createAction(
  '[Login Page] User login successful',

);

export const loginFailed = createAction(
  '[Login Page] User login failed'
);

export const authFailed = createAction(
  '[Login Page] User authentication failed'
);

export const logout = createAction(
  '[Side Nav] User logout'
);
