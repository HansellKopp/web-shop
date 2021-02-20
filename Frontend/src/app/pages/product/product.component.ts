import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService} from '../../services/products.service';
import { Product } from 'src/app/models/products.interface'


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
  ) { }

  product? : Product

  ngOnInit(): void {
    this.route.params.subscribe(path=> {
      if(!path.searchTerm) {
        this.productsService.getProductById(path.id).subscribe( val => { this.product = val })
      }
    })
  }
}
