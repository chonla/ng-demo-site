import { Component, OnInit, Input } from '@angular/core';
import { FirebaseResourceDirective } from '../../directives/firebase-resource.directive';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

  @Input() postsData;

  constructor() { }

  ngOnInit() {
  }

  edit(post) {
    console.log(this.postsData);
  }

}
