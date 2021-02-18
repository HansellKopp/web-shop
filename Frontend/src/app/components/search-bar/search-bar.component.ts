import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service'

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor(private search: SearchService) { }

  ngOnInit(): void {

  }
  searchProduct(value: string) {
    this.search.setValue(value)
  }

}
