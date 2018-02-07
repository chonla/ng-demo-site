import { Component, OnInit, Input } from '@angular/core';
import { ResourceDirective } from '../../directives/resource.directive';

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

}
