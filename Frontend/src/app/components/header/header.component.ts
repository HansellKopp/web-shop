import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private users: UsersService, public auth: AuthService) { }

  user?: any
  ngOnInit(): void {
    this.users.getCurrentUser().subscribe(data=> this.user=data)
  }
}
