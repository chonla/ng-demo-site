import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-create-post-page',
  templateUrl: './create-post-page.component.html',
  styleUrls: ['./create-post-page.component.css']
})
export class CreatePostPageComponent implements OnInit {

  @ViewChild('successAlert') successAlert;
  @ViewChild('loadingModal') loadingModal;
  @ViewChild('savingModal') savingModal;
  @ViewChild('categoryForm') categoryForm;
  public postForm: FormGroup;
  public isSaving: boolean;
  public saving$: Subscription;
  public post$: Observable<{}>;
  public env = environment;
  public categoriesData;

  constructor(
    private fb: FormBuilder,
    private data: DataService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef) {
    this.initializeForm();
    this.isSaving = false;
  }

  ngOnInit() {
    setTimeout(_ => {
      const postId = this.route.snapshot.paramMap.get('id');
      if (postId !== null && postId !== '') {
        this.changeDetector.detectChanges();
        this.loadingModal.show();
        const obs = this.data.get('posts', postId);
        const post$ = obs.subscribe(
          doc => {
            post$.unsubscribe();
            this.postForm.setValue(doc);
            this.loadingModal.hide();
          }
        );
      }
    });
  }

  initializeForm() {
    this.postForm = this.fb.group({
      id: '',
      title: '',
      body: '',
      slug: '',
      created_timestamp: '',
      updated_timestamp: '',
      author: this.auth.currentUser(),
      status: '',
      categories: []
    });
  }

  publishPost() {
    this.savePost('published');
  }

  saveDraft() {
    this.savePost('draft');
  }

  savePost(status: string) {
    this.savingModal.show('กำลังบันทึก...');
    this.isSaving = true;

    this.postForm.patchValue({
      status: status,
      categories: this.categoryForm.getSelected()
    });
    const post = this.postForm.value;
    const obs = this.data.save('posts', post);

    this.saving$ = obs.subscribe(doc => {
      this.saving$.unsubscribe();
      this.postForm.setValue(post);
      this.successAlert.show();
      this.isSaving = false;
      this.savingModal.hide();
    });
  }

  autoCreateSlug() {
    const title = this.postForm.value.title;
    let slug = this.postForm.value.slug;
    if (slug === '') {
      slug = title.replace(/[\s\[\]\<\>;:!#?\/\\+\{\}\|\"'=]/ig, "_");
      slug = slug.toLowerCase();
      this.postForm.patchValue({ slug: slug });
    }
  }

  dataReceiver($event) {
    this.categoriesData = $event;
  }
}
