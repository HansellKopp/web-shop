import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  
  private searchTerm: BehaviorSubject<string>;

  constructor() {
    this.searchTerm = new BehaviorSubject<string>('');
  }

  getValue(): Observable<string> {
    return this.searchTerm.asObservable();
  }
  setValue(newValue: string): void {
    this.searchTerm.next(newValue);
  }
}
