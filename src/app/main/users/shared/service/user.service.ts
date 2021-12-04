import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {PermissionsEnum} from '../model/permissions.enum';
import {User, UserRequest} from '../model/user.model';
import {IUserService} from '../model/user-service.model';

/**
 * @deprecated Using only the firebase version
 */
@Injectable({
  providedIn: 'root'
})
export class UserService implements IUserService {

  private static readonly RESOURCE_URL = environment.apiUrl + 'users';

  constructor(
    private http: HttpClient
  ) { }

  fetchUserByName(username: string): Observable<User> {
    return this.http.get<User[]>(UserService.RESOURCE_URL, { params: { username }}).pipe(
      map((queryReturn: User[]) => {
        if (queryReturn.length === 0) {
          throw Error('Usuário Inexistente');
        }

        return queryReturn[0];
      })
    );
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(
      UserService.RESOURCE_URL
    ).pipe(
      map((usersDTO: User[]): User[] => {
        return usersDTO.map((userDTO: User): User => {
          return {
            ...userDTO,
            createdOn: new Date(userDTO.createdOn)
          };
        });
      })
    );
  }

  registerUser(userRegistrationData: UserRequest): any {
    const { username, password, email } = userRegistrationData;
    const userDTO: UserRequest = {
      username,
      password,
      email,
      permission: PermissionsEnum.DEFAULT,
      active: true,
      createdOn: new Date()
    };

    return this.http.post<User>(
      UserService.RESOURCE_URL,
      userDTO,
      { headers: {'Content-Type': 'application/json; charset=utf-8'} }
    );
  }
}
