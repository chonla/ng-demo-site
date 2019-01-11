import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-category-collapsible-form',
  templateUrl: './category-collapsible-form.component.html',
  styleUrls: ['./category-collapsible-form.component.css']
})
export class CategoryCollapsibleFormComponent implements OnInit {

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
      this.initializeForm();
      this.isSaving = false;
    });

    return false;
  }
}
