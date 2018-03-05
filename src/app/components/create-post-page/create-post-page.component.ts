import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import 'rxjs/add/observable/forkJoin';

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
    private auth: AuthService,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef) {
    this.initializeForm();
    this.isSaving = false;
    this.tagList = [];
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
            this.categoryForm.setSelections(this.postForm.controls.categories.value);
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
    this.savingModal.show('กำลังบันทึก...');
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
      this.syncing$ = Observable.forkJoin(this.catSyncing, this.tagSyncing)
        .subscribe((r) => {
          this.syncing$.unsubscribe();
          this.successAlert.show();
          this.isSaving = false;
          this.savingModal.hide();
        });
    });
  }

  syncPostToTags(tagList, id): Observable<any> {
    var syncObservable = Observable.create(observer => {
      var tag$ = this.data.get('tags').subscribe(tags => {
        tag$.unsubscribe();
        if (tags !== []) {
          tags.forEach(tag => {
            if (tag.posts && (tag.posts.indexOf(id) !== -1) && (tagList.indexOf(tag.title) === -1)) {
              // remove post from tag
              console.log('remove post from tag');
            } else {
              if (((!tag.posts) || (tag.posts.indexOf(id) === -1)) && (tagList.indexOf(tag.title) !== -1)) {
                if (!tag.posts) {
                  tag.posts = [];
                }
                // add post to tag
                console.log('add post to tag');
              }
            }
          });
        } else {
          tagList.forEach(tag => {
            this.data.save('tags', {
              "title": tag,
              "posts": [id]
            });
          });
          console.log('add post to all tags');
        }
        observer.next(true);
        observer.complete();
      });
    });
    return syncObservable;
  }

  syncPostToCategories(categories, id): Observable<any> {
    var syncObservable = Observable.create(observer => {
      var cat$ = this.data.get('categories').subscribe(cats => {
        cat$.unsubscribe();
        cats.forEach(cat => {
          if (cat.posts && (cat.posts.indexOf(id) !== -1) && (categories.indexOf(cat.id) === -1)) {
            // remove post from cat
            cat.posts.splice(cat.posts.indexOf(id), 1);
          } else {
            if (((!cat.posts) || (cat.posts.indexOf(id) === -1)) && (categories.indexOf(cat.id) !== -1)) {
              if (!cat.posts) {
                cat.posts = [];
              }
              // add post to cat
              cat.posts.push(id);
            }
          }
          this.data.save('categories', cat);
        });
        observer.next(true);
        observer.complete();
      });
    });

    return syncObservable;
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
}
