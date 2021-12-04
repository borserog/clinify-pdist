import {Observable} from 'rxjs';
import {User, UserRequest} from './user.model';

export interface IUserService {
  fetchUserByName(username: string): Observable<User>;
  getAllUsers(): Observable<User[]>;
  registerUser(userRegistrationData: UserRequest): Observable<UserId>;
}

export type UserId = string;
