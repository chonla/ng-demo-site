import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs/Subscription';

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
      id: '',
      title: '',
      body: '',
      created_timestamp: '',
      updated_timestamp: '',
      author: this.auth.currentUser(),
      status: ''
    });
  }

  savePost() {
    this.postForm.patchValue({ status: 'published' });
    const post = this.postForm.value;
    const obs = this.data.save('posts', post);

    obs.subscribe(doc => {
      this.postForm.patchValue({ id: doc.id });
    });
  }

  saveDraft() {
    this.postForm.patchValue({ status: 'draft' });
    const post = this.postForm.value;
    const obs = this.data.save('posts', post);

    obs.subscribe(doc => {
      this.postForm.patchValue({ id: doc.id });
    });
  }
}
