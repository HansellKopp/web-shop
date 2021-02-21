import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/products.interface';
import { ProductComponent } from '../pages/product/product.component';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

  getCategories() {
    return this.http.get<string[]>('http://localhost:3000/categories')
  }

  getProducts(pageIndex?: number) {
    return this.http.get<Product[]>('http://localhost:3000/items')
  }

  getProductById(id: string) {
    return this.http.get<Product>('http://localhost:3000/items/' + id)
  }

  getProductsQuery(searchTerm: string) {
    return this.http.get<Product[]>('http://localhost:3000/items/query/' + searchTerm)
  }

  postProduct(data: Product) {
    return this.http.post('http://localhost:3000/items', data)
  }

  putProduct(id:string, data: Product) {
    return this.http.put(`http://localhost:3000/items/${id}`, data)
  }
  deleteProduct(id: string) {
    return this.http.delete('http://localhost:3000/items/' + id)
  }
  postImages(data: FormData) {
    return this.http.post('http://localhost:3000/images/upload', data)
  }

}