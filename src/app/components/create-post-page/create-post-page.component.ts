import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-post-page',
  templateUrl: './create-post-page.component.html',
  styleUrls: ['./create-post-page.component.css']
})
export class CreatePostPageComponent implements OnInit {

  public postForm: FormGroup;

  constructor(private fb: FormBuilder, private data: DataService, private auth: AuthService) {
    this.initializeForm();
  }

  ngOnInit() {
  }

  initializeForm() {
    this.postForm = this.fb.group({
      title: '',
      body: ''
    });
  }

  savePost() {
    this.data.save('posts', {
      title: this.postForm.controls.title.value,
      body: this.postForm.controls.body.value,
      created_date: (new Date()).toISOString(),
      author: this.auth.currentUser(),
      status: 'published'
    });
  }

}
