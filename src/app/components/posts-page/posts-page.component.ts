import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.css']
})
export class PostsPageComponent implements OnInit {

  public postsData;

  constructor() { }

  ngOnInit() {
  }

  dataReceiver($event) {
    this.postsData = $event;
  }

}
