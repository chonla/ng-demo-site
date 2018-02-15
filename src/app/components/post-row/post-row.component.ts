import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-row',
  templateUrl: './post-row.component.html',
  styleUrls: ['./post-row.component.css']
})
export class PostRowComponent implements OnInit {
  public menuOff = true;

  @Input() post;

  constructor(private router: Router) { }

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


}
