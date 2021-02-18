import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/products.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

  getProducts() {
    return this.http.get<Product[]>('http://localhost:3000/items')
  }

  getProductBySlug(slug: string) {
    return this.http.get<Product>('http://localhost:3000/items/slug/' + slug)
  }

  getProductsQuery(searchTerm: string) {
    return this.http.get<Product[]>('http://localhost:3000/items/query/' + searchTerm)
  }

}