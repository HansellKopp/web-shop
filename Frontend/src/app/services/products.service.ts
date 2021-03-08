import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'
import { Product } from '../models/products.interface';
import { ProductComponent } from '../pages/product/product.component';

@Injectable({
  providedIn: `root`
})
export class ProductsService {
  
  rootPath = environment.rootPath
  constructor(
    private http: HttpClient
  ) { }

  getCategories() {
    return this.http.get<string[]>(`${this.rootPath}/categories`)
  }

  getProducts(pageIndex?: number) {
    return this.http.get<Product[]>(`${this.rootPath}/items`)
  }

  getProductById(id: string) {
    return this.http.get<Product>(`${this.rootPath}/items/` + id)
  }

  getProductsQuery(searchTerm: string) {
    return this.http.get<Product[]>(`${this.rootPath}/items/query/` + searchTerm)
  }

  postProduct(data: Product) {
    return this.http.post(`${this.rootPath}/items`, data)
  }

  putProduct(id:string, data: Product) {
    return this.http.put(`${this.rootPath}/items/${id}`, data)
  }
  deleteProduct(id: string) {
    return this.http.delete(`${this.rootPath}/items/` + id)
  }
  postImages(data: FormData) {
    return this.http.post(`${this.rootPath}/images/upload`, data)
  }

}