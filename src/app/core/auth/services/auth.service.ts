import { Injectable } from '@angular/core';
import {map, take} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from 'src/app/main/users/shared/model/user.model';
import { UserService } from 'src/app/main/users/shared/service/user.service';
import {UserFirestoreService} from '../../../main/users/shared/service/user.firestore.service';
import { State, Store } from '@ngrx/store';
import { AuthState, selectState } from '../reducers';
import { AppState } from '../../../reducers';

interface LoginData {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private userService: UserService,
    private userAfs: UserFirestoreService
  ) { }

  isUserLogged(store: Store<AuthState>): Observable<boolean> {
    return store.pipe(
      take(1),
      map(state => {
        return !!selectState(state).username;
      })
    );
  }

  lameAuthenticator(userData: LoginData): Observable<User> {
    const { username } = userData;

    return this.userAfs.fetchUserByName(username).pipe(
      map((userFound) => {
        if (userFound.password === userData.password) {
          return userFound;
        }

        throw new Error('Senha Inválida');
      })
    );
  }

}
