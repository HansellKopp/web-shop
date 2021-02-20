import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  links = [
    {
      'label': 'Categories',
      'path': ['categories']
    },
    {
      'label': 'Products',
      'path': ['products']
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
