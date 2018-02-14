import { Component, OnInit, Input } from '@angular/core';
import { FirebaseResourceDirective } from '../../directives/firebase-resource.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

  @Input() postsData;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  edit(post) {
    this.router.navigate(['/user/create-post', { id: post.id }]);
    return false;
  }

}
