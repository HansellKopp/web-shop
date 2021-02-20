import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/users.interface';
import { AuthService } from '@auth0/auth0-angular';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private auth: AuthService) {}
  
  getUsers() {
    return this.http.get<User[]>('http://localhost:3000/users')
  }

  postUser(data: User) {
    return this.http.post<User[]>('http://localhost:3000/users', data)
  }

  getCurrentUser(): Observable<any> {
    return this.auth.user$
  }
}
