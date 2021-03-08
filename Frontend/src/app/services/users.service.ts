import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/users.interface';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment'
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  rootPath = environment.rootPath
  constructor(private http: HttpClient, private auth: AuthService) {}
  
  getUsers() {
    return this.http.get<User[]>(`${this.rootPath}/users`)
  }

  postUser(data: User) {
    return this.http.post<User[]>(`${this.rootPath}/users`, data)
  }

  getCurrentUser(): Observable<any> {
    return this.auth.user$
  }
}
