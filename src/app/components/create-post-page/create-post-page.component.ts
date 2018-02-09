import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-post-page',
  templateUrl: './create-post-page.component.html',
  styleUrls: ['./create-post-page.component.css']
})
export class CreatePostPageComponent implements OnInit {

  public postForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
    console.log(this.postForm.controls);
  }

}
