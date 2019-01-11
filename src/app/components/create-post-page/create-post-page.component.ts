
import {forkJoin as observableForkJoin,  Subscription ,  Observable } from 'rxjs';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

import { LoadingModalComponent } from '../loading-modal/loading-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DataSyncService } from '../../services/data-sync.service';

@Component({
  selector: 'app-create-post-page',
  templateUrl: './create-post-page.component.html',
  styleUrls: ['./create-post-page.component.css']
})
export class CreatePostPageComponent implements OnInit {

  @ViewChild('successAlert') successAlert;
  @ViewChild('categoryForm') categoryForm;
  @ViewChild('confirmModal') confirmModal;

  public postForm: FormGroup;
  public isSaving: boolean;
  public saving$: Subscription;
  public syncing$: Subscription;
  public catSyncing: Observable<boolean>;
  public tagSyncing: Observable<boolean>;
  public post$: Observable<{}>;
  public env = environment;
  public categoriesData;
  public tagsData;
  public tagList: string[];

  constructor(
    private fb: FormBuilder,
    private data: DataService,
    private dataSync: DataSyncService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private modalService: BsModalService
  ) {
    this.initializeForm();
    this.isSaving = false;
    this.tagList = [];
  }

  ngOnInit() {
    setTimeout(_ => {
      const postId = this.route.snapshot.paramMap.get('id');
      if (postId !== null && postId !== '') {
        this.changeDetector.detectChanges();
        const loadingModalOptions = {
          initialState: {
            message: 'กำลังโหลด'
          },
          animated: true,
          backdrop: true,
          keyboard: false,
          focus: true,
          ignoreBackdropClick: true,
          class: 'modal-sm'
        };
        var loadingModalRef = this.modalService.show(LoadingModalComponent, loadingModalOptions);
        const obs = this.data.get('posts', postId);
        const post$ = obs.subscribe(
          doc => {
            post$.unsubscribe();
            this.postForm.setValue(doc);
            this.categoryForm.setSelections(this.postForm.controls.categories.value);
            this.tagList = this.postForm.controls.tags.value;
            loadingModalRef.hide();
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
      categories: [],
      tags: []
    });
  }

  publishPost() {
    this.savePost('published');
  }

  saveDraft() {
    this.savePost('draft');
  }

  savePost(status: string) {
    const loadingModalOptions = {
      initialState: {
        message: 'กำลังบันทึก'
      },
      animated: true,
      backdrop: true,
      keyboard: false,
      focus: true,
      ignoreBackdropClick: true,
      class: 'modal-sm'
    };
    var savingModalRef = this.modalService.show(LoadingModalComponent, loadingModalOptions);

    this.isSaving = true;

    const selectedCategories = this.categoryForm.getSelections();
    this.postForm.patchValue({
      status: status,
      categories: selectedCategories,
      tags: this.tagList
    });
    const selectedTags = this.postForm.controls['tags'].value;
    const post = this.postForm.value;
    const obs = this.data.save('posts', post);

    this.saving$ = obs.subscribe(doc => {
      this.saving$.unsubscribe();
      this.postForm.setValue(post);

      this.catSyncing = this.syncPostToCategories(selectedCategories, post.id);
      this.tagSyncing = this.syncPostToTags(selectedTags, post.id);
      this.syncing$ = observableForkJoin(this.catSyncing, this.tagSyncing)
        .subscribe((r) => {
          this.syncing$.unsubscribe();
          this.successAlert.show('เยี่ยมไปเลย!', 'บทความใหม่ของคุณถูกบันทึกไว้เรียบร้อยแล้ว');
          this.isSaving = false;
          savingModalRef.hide();
        });
    });
  }

  syncPostToTags(tagList, id): Observable<any> {
    console.log(tagList);
    return this.dataSync.sync('tags', tagList, 'posts', id);
  }

  syncPostToCategories(categories, id): Observable<any> {
    return this.dataSync.sync('categories', categories, 'posts', id);
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

  categoriesDataReceiver($event) {
    this.categoriesData = $event;
  }

  tagsDataReceiver($event) {
    this.tagsData = $event;
  }

  trash() {
    this.confirmModal.show().subscribe(result => {
      if (result) {
        this.moveToTrash();
      }
    });
    return false;
  }

  moveToTrash() {
    const postId = this.postForm.controls.id.value;
    var obs$ = this.data.remove('posts', postId).subscribe(_ => {
      obs$.unsubscribe();

      this.catSyncing = this.syncPostToCategories([], postId);
      var cat$ = this.catSyncing.subscribe(_ => {
        cat$.unsubscribe();
        this.router.navigate(['/user/posts']);
      });
    });
  }
}
