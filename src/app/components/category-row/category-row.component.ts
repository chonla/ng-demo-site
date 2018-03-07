import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-row',
  templateUrl: './category-row.component.html',
  styleUrls: ['./category-row.component.css']
})
export class CategoryRowComponent implements OnInit {

  public menuOff = true;

  @Input() category;
  @ViewChild('confirmModal') confirmModal;

  constructor(
    private data: DataService,
    private router: Router
  ) { }

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
    this.router.navigate(['/user/edit-category', { id: this.category.id }]);
    return false;
  }

  trash() {
    this.confirmModal.show().subscribe(result => {
      if (result) {
        this.moveToTrash();
      }
    });
    return false;
  }

  moveToTrash() {
    var obs$ = this.data.remove('categories', this.category.id).subscribe(_ => {
      obs$.unsubscribe();
    });
  }

}
