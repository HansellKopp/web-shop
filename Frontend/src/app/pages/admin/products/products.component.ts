import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {ProductsService} from 'src/app/services/products.service'
import {Product} from 'src/app/models/products.interface'


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  resultsLength = 0;
  data: Product[] = [];  
  isLoadingResults = true;
  displayedColumns: string[] = ['title', 'subtitle','categories', 'price', 'actions'];
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  constructor(private products: ProductsService, 
              private router: Router) { }

  ngOnInit() {}

  ngAfterViewInit() {
      this.load()
  }

  load() {
    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        return this.products.getProducts(this.paginator?.pageIndex);
      }),
      map(data => {
        // Flip flag to show that loading has finished.
        this.isLoadingResults = false;
        this.resultsLength = data.length;
        return data;
      }),
      catchError(() => {
        this.isLoadingResults = false;
        return observableOf([]);
      })
    ).subscribe(data => this.data = data);
  }

  remove(row: any) {
    this.products.deleteProduct(row._id).subscribe(result=> this.load())
  }

  edit(row: any) {
    this.router.navigate(['admin','product',row._id])
  }

  addProduct() {
    this.router.navigate(['admin','product','new'])
  }

}