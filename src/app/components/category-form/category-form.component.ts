import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  @ViewChild('successAlert') successAlert;
  public categoryForm: FormGroup;
  public isSaving: boolean;
  public saving$: Subscription;

  constructor(
    private fb: FormBuilder,
    private data: DataService,
    private auth: AuthService
  ) {
    this.initializeForm();
    this.isSaving = false;
  }

  ngOnInit() {
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

  saveCategory() {
    this.isSaving = true;

    const category = this.categoryForm.value;
    const obs = this.data.save('categories', category);

    this.saving$ = obs.subscribe(doc => {
      this.saving$.unsubscribe();
      this.initializeForm();
      this.isSaving = false;
      this.successAlert.show('เยี่ยมไปเลย!', 'หมวดหมู่ใหม่ของคุณถูกบันทึกไว้เรียบร้อยแล้ว');
    });

    return false;
  }
}
