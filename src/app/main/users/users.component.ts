import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './shared/model/user.model';
import { UserService } from './shared/service/user.service';
import {UserFirestoreService} from './shared/service/user.firestore.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;

  columnsToDisplay: string[] = ['username', 'email', 'active', 'createdOn'];

  constructor(
    private depUserService: UserService,
    private userService: UserFirestoreService
  ) { }

  ngOnInit(): void {
    this.users$ = this.userService.getAllUsers();
  }

}
