import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {

  public categoriesData;

  constructor() { }

  ngOnInit() {
  }

  dataReceiver($event) {
    this.categoriesData = $event;
  }
}
