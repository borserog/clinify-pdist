import {Injectable} from '@angular/core';
import {IUserService} from '../model/user-service.model';
import {from, Observable} from 'rxjs';
import {User, UserRequest} from '../model/user.model';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserFirestoreService implements IUserService {
  private readonly users$: Observable<User[]>;

  private readonly USER_COLLECTION = 'users';

  private readonly usersCollection: AngularFirestoreCollection<User | UserRequest>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.usersCollection = afs.collection<User>(this.USER_COLLECTION);
    this.users$ = this.usersCollection.valueChanges({idField: 'id'});
  }

  getAllUsers(): Observable<User[]> {
    return this.users$;
  }

  fetchUserByName(inputUsername: string): Observable<User> {
    const afsQueryFn = (ref) => {
      return ref.where('username', '==', inputUsername);
    };

    return this.afs.collection<User>(this.USER_COLLECTION, afsQueryFn).valueChanges({ idField: 'id' }).pipe(
      map((singleUserArray: User[]) => {
        if (singleUserArray.length === 0) {
          throw new Error('Nenhum usuário encontrado');
        }

        return singleUserArray.shift();
      }),
      take(1)
    );
  }

  registerUser(userRegistrationData: UserRequest): Observable<string> {
    return from(this.usersCollection.add(userRegistrationData)).pipe(
      map((newUserDocument): string => {
        return newUserDocument.id;
        }
      )
    );
  }
}
