import { authFailed, loginAttempt, loginFailed, loginSuccessful } from '../core/auth/actions/auth.actions';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { AuthService } from '../core/auth/services/auth.service';
import { User } from '../main/users/shared/model/user.model';
import { MessageLevel } from '../shared/services/snackbar/message-level.enum';
import { MessageService } from '../shared/services/snackbar/message.service';


export interface UserLogin {
  username: string;
  password: string;
}

interface LoginControls {
  username: AbstractControl;
  password: AbstractControl;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  controls: LoginControls;

  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackbarService: MessageService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [''],
      password: [''],
    });

    this.controls = {
      username: this.loginForm.get('username'),
      password: this.loginForm.get('password'),
    };
  }

   onSubmit(): void {
    const user: UserLogin = this.loginForm.value;

    this.store.dispatch(loginAttempt(user));

    this.auth.lameAuthenticator(user).subscribe(
      async (authenticatedUser: User) => {
        if (authenticatedUser) {

          this.store.dispatch(loginSuccessful());

          // TODO mover mensagens para effects
          this.snackbarService.open('Sucesso!', MessageLevel.SUCCESS);
          await this.router.navigate(['/main/users']);
        } else {
          this.store.dispatch(authFailed());
          this.snackbarService.open('Deu Ruim!', MessageLevel.DANGER);
        }
      },
      (error) => {
        this.store.dispatch(loginFailed());
        this.snackbarService.open(error.message, MessageLevel.DANGER);
      }
    );
  }
}
