import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-profile',
  template: `
    <ul *ngIf="auth.user$ | async as user">
      <li>{{ user.name }}</li>
      <li>{{ user.email }}</li>
      <li><img [src]="user.picture" /></li>
    </ul>
    `    
})
export class UserProfileComponent implements OnInit {
  constructor(public auth: AuthService, public users: UsersService) {}

  ngOnInit(): void {}
}