import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ErrorAlertComponent } from '../error-alert/error-alert.component';

@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.css']
})
export class LoginBoxComponent implements OnInit {
  @ViewChild('errorModal') error: ErrorAlertComponent;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const formModel = this.loginForm.value;
    if (this.auth.login(formModel)) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    this.error.show('ล็อกอินไม่สำเร็จ', 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
  }

  ngOnInit() {
  }

}
