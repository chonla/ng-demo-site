import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tags-adder',
  templateUrl: './tags-adder.component.html',
  styleUrls: ['./tags-adder.component.css']
})
export class TagsAdderComponent implements OnInit {

  public tagForm: FormGroup;
  @Input() tagsData;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) {
    this.initializeForm();
  }

  ngOnInit() {
  }

  initializeForm() {
    this.tagForm = this.fb.group({
      id: '',
      title: '',
      created_timestamp: '',
      updated_timestamp: '',
      creator: this.auth.currentUser()
    });
  }

  addTag() {
    this.tagsData.push({
      id: "cccc",
      title: this.tagForm.controls['title'].value
    });
    return false;
  }
}
