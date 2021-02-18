import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/products.interface'
import { ProductsService } from '../../services/products.service'
import { ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/services/search.service'


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private search: SearchService
  ) { }

  products : Array<Product> = []

  ngOnInit(): void {
    this.route.params.subscribe(path=> {
      if(!path.searchTerm) {        
        this.productsService.getProducts().subscribe( val => { this.products = val })
      } else {
        this.productsService.getProductsQuery(path.searchTerm).subscribe( val => { this.products = val }) 
      }
    })
  }

  searchCategory(value: string) {
    this.search.setValue(value)
  }
}