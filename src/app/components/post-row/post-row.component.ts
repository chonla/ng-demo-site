import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-post-row',
  templateUrl: './post-row.component.html',
  styleUrls: ['./post-row.component.css']
})
export class PostRowComponent implements OnInit {
  public menuOff = true;

  @Input() post;
  @ViewChild('confirmModal') confirmModal;

  constructor(private router: Router, private data: DataService) { }

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
    this.router.navigate(['/user/create-post', { id: this.post.id }]);
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
    var obs$ = this.data.remove('posts', this.post.id).subscribe(_ => {
      obs$.unsubscribe();
    });
  }


}
