import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public auth: AuthService, private users: UsersService) { }

  user?: any
  ngOnInit(): void { 
    this.auth.user$.subscribe(data=> this.user=data)
  }
}
