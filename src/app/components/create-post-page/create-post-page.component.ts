import { Component, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('successAlert') successAlert;
  @ViewChild('loadingModal') loadingModal;
  public postForm: FormGroup;
  public isSaving: boolean;
  public saving$: Subscription;

  constructor(private fb: FormBuilder, private data: DataService, private auth: AuthService) {
    this.initializeForm();
    this.isSaving = false;
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

  publishPost() {
    this.savePost('published');
  }

  saveDraft() {
    this.savePost('draft');
  }

  savePost(status) {
    this.loadingModal.show('กำลังบันทึก...');
    this.isSaving = true;
    this.postForm.patchValue({ status: status });
    const post = this.postForm.value;
    const obs = this.data.save('posts', post);

    this.saving$ = obs.subscribe(doc => {
      this.saving$.unsubscribe();
      this.postForm.patchValue({ id: doc.id });
      this.successAlert.show();
      this.isSaving = false;
      this.loadingModal.hide();
    });
  }
}
