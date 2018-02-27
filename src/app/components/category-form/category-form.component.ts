import { Component, OnInit } from '@angular/core';
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

  public categoryForm: FormGroup;
  public isSaving: boolean;
  public saving$: Subscription;
  public isCollapsed: boolean;

  constructor(
    private fb: FormBuilder,
    private data: DataService,
    private auth: AuthService
  ) {
    this.initializeForm();
    this.isSaving = false;
    this.isCollapsed = true;
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
      this.isCollapsed = true;
      this.categoryForm.reset();
      this.isSaving = false;
    });
  }
}
