import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { DataSyncService } from '../../services/data-sync.service';
import { LoadingModalService } from '../../services/loading-modal.service';

@Component({
  selector: 'app-post-row',
  templateUrl: './post-row.component.html',
  styleUrls: ['./post-row.component.css']
})
export class PostRowComponent implements OnInit {
  public menuOff = true;

  @Input() post;
  @ViewChild('confirmModal') confirmModal;

  constructor(
    private router: Router,
    private data: DataService,
    private dataSync: DataSyncService,
    private loading: LoadingModalService
  ) { }

  ngOnInit() {
    this.menuOff = true;
  }

  showMenu() {
    this.menuOff = false;
  }

  hideMenu() {
    this.menuOff = true;
  }

  edit() {
    this.router.navigate(['/user/create-post', { id: this.post.id }]);
    return false;
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
    var postId = this.post.id;
    var loading$ = this.loading.show('กำลังย้ายไปถังขยะ').subscribe(_ => {
      var obs$ = this.data.remove('posts', postId).subscribe(_ => {
        obs$.unsubscribe();
        var syncing$ = this.dataSync.sync('categories', [], 'posts', postId).subscribe(_ => {
          loading$.unsubscribe();
          syncing$.unsubscribe();
          this.loading.hide();
        });
      });
    });
  }
}
