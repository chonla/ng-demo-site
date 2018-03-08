import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { LoadingModalComponent } from '../loading-modal/loading-modal.component';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-edit-category-page',
  templateUrl: './edit-category-page.component.html',
  styleUrls: ['./edit-category-page.component.css']
})
export class EditCategoryPageComponent implements OnInit {
  @ViewChild('successAlert') successAlert;

  public categoryForm: FormGroup;
  public isSaving: boolean;
  public saving$: Subscription;

  constructor(
    private fb: FormBuilder,
    private data: DataService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private changeDetector: ChangeDetectorRef,
    private modalService: BsModalService
  ) {
    this.initializeForm();
    this.isSaving = false;
  }

  ngOnInit() {
    setTimeout(_ => {
      const catId = this.route.snapshot.paramMap.get('id');
      if (catId !== null && catId !== '') {
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
        const obs = this.data.get('categories', catId);
        const cat$ = obs.subscribe(
          doc => {
            cat$.unsubscribe();
            this.categoryForm.setValue(doc);
            loadingModalRef.hide();
          }
        );
      }
    });
  }

  initializeForm() {
    this.categoryForm = this.fb.group({
      id: '',
      title: '',
      created_timestamp: '',
      updated_timestamp: '',
      creator: this.auth.currentUser()
    });
  }

  save() {
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

    const cat = this.categoryForm.value;
    const obs = this.data.save('categories', cat);

    this.saving$ = obs.subscribe(doc => {
      this.saving$.unsubscribe();
      this.categoryForm.setValue(cat);

      this.successAlert.show('เยี่ยมไปเลย!', 'หมวดหมู่ของคุณถูกบันทึกไว้เรียบร้อยแล้ว');
      this.isSaving = false;
      savingModalRef.hide();
    });
  }

}
