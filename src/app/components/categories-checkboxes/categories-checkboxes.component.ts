import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-categories-checkboxes',
  templateUrl: './categories-checkboxes.component.html',
  styleUrls: ['./categories-checkboxes.component.css']
})
export class CategoriesCheckboxesComponent implements OnInit {

  @Input() categoriesData;

  constructor() { }

  ngOnInit() {
  }

  dataReceiver($event) {
    this.categoriesData = $event;
  }
}
