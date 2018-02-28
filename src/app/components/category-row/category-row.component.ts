import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-category-row',
  templateUrl: './category-row.component.html',
  styleUrls: ['./category-row.component.css']
})
export class CategoryRowComponent implements OnInit {

  public menuOff = true;

  @Input() category;
  @ViewChild('confirmModal') confirmModal;

  constructor() { }

  ngOnInit() {
    this.menuOff = true;
  }

  showMenu() {
    this.menuOff = false;
  }

  hideMenu() {
    this.menuOff = true;
  }

  edit() {

  }

  trash() {

  }

}
